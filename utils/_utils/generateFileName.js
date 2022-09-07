const crypto = require('crypto')
function generateFileName(bytes = 16) {
  return crypto.randomBytes(bytes).toString('hex')
}

exports.generateFileName = generateFileName
