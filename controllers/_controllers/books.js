const { Book } = require('../../models')
const { ErrorResponse } = require('../../utils')
const { asyncHandler } = require('../../middleware')
const { S3Service } = require('../../services')

/** 
 *  @desc   Create a Book
 *  @route  POST /api/v1/books/create
 *  @access PUBLIC
*/
exports.createBook = asyncHandler(async (req, res, next) => {
  const { bookTitle, bookDescription, bookCategory, imageID, userID } = req.body

  const book = await Book.create({
    bookTitle,
    bookDescription,
    bookCategory,
    imageID,
    userID
  })
  
  if (!book) {
    return next(new ErrorResponse('Book not found or invalid credentials'), 401)
  }

  res.status(200).json({ success: true, data: book })
})

/** 
 *  @desc   Get Book by ID
 *  @route  GET /api/v1/books/:id
 *  @access PRIVATE
*/
exports.getOneBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id)

  if (!book) {
    return next(new ErrorResponse('Book not found', 404))
  }

  res.status(200).json({
    success: true,
    data: book
  })
})


/** 
 *  @desc   Get Books based on url query
 *  @route  GET /api/v1/books
 *  @access PRIVATE
*/
exports.getManyBooks = asyncHandler(async (req, res, next) => {
  const { data } = res.filteredResults

  res.status(200).json({
    ...res.filteredResults,
    data: await S3Service.addBookImageUrlToBookQueryData(data)
  })
})

/** 
 *  @desc   Update Book by ID
 *  @route  PUT /api/v1/books/:id
 *  @access PRIVATE
*/
exports.updateBook = asyncHandler(async (req, res, next) => {
  const updateBody = {
    ...req.body,
    updatedAt: Date.now()
  }
  
  const book = await Book.findByIdAndUpdate(req.params.id, updateBody, {
    new: true,
    runValidators: true
  })

  if (!book) {
    return next(new ErrorResponse('Book not found or invalid credentials'), 401)
  }

  res.status(200).json({
    success: true,
    data: book
  })
})

/** 
 *  @desc   Delete Book by ID
 *  @route  DELETE /api/v1/books/:id
 *  @access PRIVATE
*/
exports.deleteBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id)

  if (!book) {
    return next(new ErrorResponse('Book not found or invalid credentials'), 401)
  }

  res.status(200).json({
    success: true,
    data: {}
  })
})
