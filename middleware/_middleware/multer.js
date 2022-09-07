const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

exports.multerUpload = upload.single('image')
