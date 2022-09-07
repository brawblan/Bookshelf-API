const { User } = require('../../models')
const { ErrorResponse } = require('../../utils')
const { asyncHandler } = require('../../middleware')

/** 
 *  @desc   Register user
 *  @route  POST /api/v1/auth/register
 *  @access PUBLIC
*/
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role
  })

  sendTokenResponse(user, 200, res)
})

/** 
 *  @desc   Logout user
 *  @route  GET /api/v1/auth/logout
 *  @access PUBLIC
*/
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    data: {}
  })
})


/** 
 *  @desc   Get logged in user
 *  @route  GET /api/v1/auth/me
 *  @access PRIVATE
*/
exports.getLoggedInUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    data: user
  })
})

/** 
 *  @desc   Update user password
 *  @route  GET /api/v1/auth/updatepassword
 *  @access PRIVATE
*/
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401))
  }

  user.password = req.body.newPassword
  await user.save()

  sendTokenResponse(user, 300, res)
})

/**
 *  @desc   Login user
 *  @route  POST /api/v1/auth/login
 *  @access PUBLIC
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email or password'))
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return next(new ErrorResponse('User not found or invalid credentials'), 401)
  }

  const isMatch = await user.matchPassword(password)
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials'), 401)
  }

  sendTokenResponse(user, 200, res)
})

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwt()

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE * 1000),
    httpOnly: true
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token })
}
