const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename(req, file, callback) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
callback(null, `${date}-${file.originalname}`)
    }
})
const fileFilter = (req, file, callback) => {
if(file.mimetype === 'img/png' || file.mimetype === 'image/jpeg') {
callback(null, true)
} else {
    callback(null, false)
}
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({ //configuration object
storage: storage,
fileFilter: fileFilter,
limits: limits
})