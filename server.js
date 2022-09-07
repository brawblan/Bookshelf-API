const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/_middleware/error')
const { Route } = require('./routes/route-constants')

// Security Packages
const mongoSanitize = require('express-mongo-sanitize') // removes $ and . from objects and keep malicous users from sending these to the backend
const helmet = require('helmet') // helps secure express app by setting various HTTP headers
const xss = require('xss-clean') // searches for and does not allow scripts to be added as values
const rateLimit = require('express-rate-limit') // sets custom amount of request without custom time period
const hpp = require('hpp') // protects again HTTP Parameter Pollution attacks
const cors = require('cors') // provides an Express middleware that can be use ot enable CORS with various options

dotenv.config({ path: './config/config.env' })
connectDB()

// Route files
const {
  auth,
  books,
  s3
} = require('./routes')

const app = express()

// Parse JSON
app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(fileupload())

// Mounting security
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(cors())

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // max number of requests
})
app.use(limiter)

app.use(express.static(path.join(__dirname, 'public')))

// Mount Routers
app.use(Route.Auth.main, auth)
app.use(Route.Books.main, books)
app.use(Route.S3.main, s3)

app.use(errorHandler)

// PORT/SERVER
const PORT = process.env.PORT || 4200

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err}`)
  server.close(() => process.exit(1))
})
