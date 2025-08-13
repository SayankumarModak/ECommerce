const cloudinary = require("cloudinary").v2;
const multer = require('multer');

cloudinary.config({
   cloud_name: 'dmkz8bcaz',
   api_key: '897612525546492',
   api_secret: 'Ard7Qp2c09DCA5dun9prbCAUGLI'
})

const storage = new multer.memoryStorage()

async function imageUploadUtil(file) {
   const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto"
   });
   return result
}

const upload = multer({ storage })
module.exports = { imageUploadUtil, upload }