const express = require('express')
const router = express.Router()
const { Route } = require('../route-constants')

const {
  uploadPhotoToS3,
  deleteImageFromS3
} = require('../../controllers')
const {
  protect,
  multerUpload,
  combineMiddleware
} = require('../../middleware')

router.post(Route.S3.uploadPhotoToS3, combineMiddleware(protect, multerUpload), uploadPhotoToS3)
router.post(Route.S3.deleteImageFromS3, protect, deleteImageFromS3)

module.exports = router
