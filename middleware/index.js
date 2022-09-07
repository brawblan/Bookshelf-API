const { protect, authorize } = require('./_middleware/auth')
const { multerUpload } = require('./_middleware/multer')
const { combineMiddleware } = require('./_middleware/useMultiple')
const { asyncHandler } = require('./_middleware/async')
const { errorHandler } = require('./_middleware/error')
const filteredResults = require('./_middleware/filteredResults')

module.exports = {
  protect,
  authorize,
  multerUpload,
  combineMiddleware,
  asyncHandler,
  errorHandler,
  filteredResults
}
