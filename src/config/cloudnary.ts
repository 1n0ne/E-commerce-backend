import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_APY_KEY,
  api_secret: process.env.CLOUDNARY_APY_SECERT
})

export { cloudinary }
