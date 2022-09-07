const express = require('express')
const router = express.Router()
const { Route } = require('../route-constants')
const { Book } = require('../../models')

const { 
  createBook,
  getOneBook,
  getManyBooks,
  updateBook,
  deleteBook
} = require('../../controllers') 
const { protect, combineMiddleware, filteredResults } = require('../../middleware')

router.post(Route.Books.create, protect, createBook)
router.get(Route.Books.getOneBook, protect, getOneBook)
router.get(Route.Books.getManyBooks, combineMiddleware(protect, filteredResults(Book)), getManyBooks)
router.put(Route.Books.update, protect, updateBook)
router.delete(Route.Books.delete, protect, deleteBook)

module.exports = router
