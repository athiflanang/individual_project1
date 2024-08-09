const { v2: cloudinary } = require('cloudinary')
const { Image } = require("../models")

class ImageUrlController {
  static async InsertImage(req, res, next) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      })

      const file = req.file
      if (!file) {
        throw ({ name: "NotFound", id })
      }

      const base64 = file.buffer.toString("base64")
      // console.log(base64, '<<<<<<< ini base64');

      const output = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64}`
      )

      const uploadImage = Image.create({ imageUrl: output.secure_url })

      res.status(200).json({
        message: "Success add image",
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ImageUrlController