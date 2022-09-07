const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: [true, 'A book title is required.']
  },
  bookDescription: {
    type: String,
    required: [true, 'A description is required. Between 30-100 words'],
    minlength: 10,
    maxlength: 100
  },
  bookCategory: {
    type: String,
    required: [true, 'A category is required.'],
    enum: [
      'romance',
      'crimeAndThriller',
      'religiousAndSelfHelp',
      'childrensBooksHumor',
      'fantasyAndSciFiYoungAdult',
    ]
  },
  imageID: {
    type: String,
    required: true,
    unique: true
  },
  userID: {
    type: String,
    required: [true, 'Must include the user id.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: ''
  },
})

module.exports = mongoose.model('Book', BookSchema)
