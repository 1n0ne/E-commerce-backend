import { check } from 'express-validator'
import multer, { type FileFilterCallback } from 'multer'
import { type Request } from 'express'

import ApiError from '../errors/ApiError'

const userImage = multer.diskStorage({
  // destination: function (req: Request, image: Express.Multer.File, cb) {
  //   cb(null, 'src/images/users')
  // },
  filename: function (req: Request, image: Express.Multer.File, cb) {
    cb(null, Date.now() + '-' + image.originalname)
  }
})
export const uploadImage = multer({ storage: userImage })

const productImage = multer.diskStorage({
  destination: function (req, image, cb) {
    cb(null, 'src/images/products')
  },
  filename: function (req: Request, image: Express.Multer.File, cb) {
    cb(null, Date.now() + '-' + image.originalname)
  }
})

const fileFilter = (req: Request, image: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!image.mimetype.startsWith('image/')) {
    cb(new Error('only image allowed'))
  }

  if (!allowedTypes.includes(image.mimetype)) {
    cb(new Error('Invalid file type'))
  }
  cb(null, true)
}

export const uploadImageProduct = multer({ storage: productImage, limits: { fileSize: 1024 * 1024 * 1 }, fileFilter })
export const uploadImageUser = multer({ storage: productImage, limits: { fileSize: 1024 * 1024 * 1 }, fileFilter })
export const validateImageUpload = [
  check('image').custom((value, { req }) => {
    if (!req.file) {
      throw ApiError.badRequest('Image is required')
    }
    return true
  })
]
