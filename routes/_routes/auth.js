const express = require('express')
const router = express.Router()
const { Route } = require('../route-constants')

const { 
  register,
  login,
  getLoggedInUser,
  logout
} = require('../../controllers')
const { protect } = require('../../middleware')

router.post(Route.Auth.register, register)
router.post(Route.Auth.login, login)
router.get(Route.Auth.me, protect, getLoggedInUser)
router.get(Route.Auth.logout, logout)

module.exports = router
