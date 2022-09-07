const auth = require('./_routes/auth')
const {
  register,
  login,
  getLoggedInUser,
  logout
} = require('./_routes/auth')

const books = require('./_routes/books')
const {
  createBook,
  getOneBook,
  getManyBooks,
  updateBook,
  deleteBook
} = require('./_routes/books')

const s3 = require('./_routes/s3')
const {
  uploadPhotoToS3,
  deleteImageFromS3
} = require('./_routes/s3')

module.exports = {
  auth,
  register,
  login,
  getLoggedInUser,
  logout,

  books,
  createBook,
  getOneBook,
  getManyBooks,
  updateBook,
  deleteBook,

  s3,
  uploadPhotoToS3,
  deleteImageFromS3
}
