const sharp = require('sharp')
const { asyncHandler } = require('../../middleware')
const { generateFileName } = require('../../utils')
const { S3Service } = require('../../services')

/** 
 *  @desc   Upload Book Image to S3 Bucket
 *  @route  POST /api/v1/s3/upload
 *  @access PUBLIC
*/
exports.uploadPhotoToS3 = asyncHandler(async (req, res, next) => {
  const file = Object.values(req.files)[0]
  const imageID = generateFileName()

  const fileBuffer = await sharp(file.data)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer()

  const response = await S3Service.uploadFile(fileBuffer, imageID, file.mimetype)
  const httpStatusCode = response.$metadata.httpStatusCode

  res.status(httpStatusCode).send(
    {
      success: true,
      data: {
        imageID
      }
    })
})

/**
  *  @desc   Delete Book Image to S3 Bucket
  *  @route  POST /api/v1/s3/delete/:id
  *  @access PRIVATE
 */
exports.deleteImageFromS3 = asyncHandler(async (req, res, next) => {
  const imageID = req.params.id
  const response = await S3Service.deleteImageFromS3(imageID)

  res.status(200).json({
    success: true,
    data: response
  })
})
