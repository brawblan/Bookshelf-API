require('dotenv').config({ path: '../../config/config.env' })

const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand
} = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

class S3Service {
  constructor() {
    this.S3Client = S3Client
    this.PutObjectCommand = PutObjectCommand
    this.DeleteObjectCommand = DeleteObjectCommand
    this.GetObjectCommand = GetObjectCommand

    this.bucketName = process.env.AWS_BUCKET_NAME
    this.region = process.env.AWS_BUCKET_REGION
    this.accessKeyId = process.env.AWS_ACCESS_KEY
    this.secretAccessKey = process.env.AWS_SECRET_KEY

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      }
    })
  }

  /**
   * 
   * @param {*} fileBuffer 
   * @param {imageID: string} fileName 
   * @param {*} mimetype 
   * @returns {void}, uploads photo to the s3 bucket
   */
  async uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
      Bucket: this.bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype
    }

    return await this.s3Client.send(new PutObjectCommand(uploadParams))
  }

  /**
   * 
   * @param {imageID: string} key 
   * @returns {url: string}
   */
  async getObjectSignedUrl(key) {
    const params = {
      Bucket: this.bucketName,
      Key: key
    }

    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(this.s3Client, command)

    return url
  }

  /**
   * 
   * @param {*} dataArray 
   * @returns (BookData{...data, Array<BookImageUrl>})
   */
  async addBookImageUrlToBookQueryData(dataArray) {
    const newDataArray = []

    for (let bookData of dataArray) {
      const { imageID } = bookData.toObject()
      newDataArray.push({
        ...bookData.toObject(),
        bookImageUrl: await this.getObjectSignedUrl(imageID)
      })
    }

    return newDataArray
  }

  /**
   * 
   * @param {imageID: string} fileName 
   * @returns {S3 response object}
   */
  async deleteImageFromS3(fileName) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: fileName,
    }

    const command = new DeleteObjectCommand(deleteParams)
    const response = await this.s3Client.send(command)
    return response
  }
}

const singleton = new S3Service() // new instance of S3Service

exports.S3Service = singleton
