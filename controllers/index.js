const {
  register,
  login,
  getLoggedInUser,
  updateDetails,
  logout,
} = require('./_controllers/auth')

const {
  createBook,
  getOneBook,
  getManyBooks,
  updateBook,
  deleteBook
} = require('./_controllers/books')

const { 
  uploadPhotoToS3,
  deleteImageFromS3
} = require('./_controllers/s3')

module.exports = {
  register,
  login,
  getLoggedInUser,
  updateDetails,
  logout,

  createBook,
  getOneBook,
  getManyBooks,
  updateBook,
  deleteBook,

  uploadPhotoToS3,
  deleteImageFromS3
}
