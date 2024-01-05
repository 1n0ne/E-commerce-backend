import { dev } from '.'
import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.url)
    console.log('DB is connected')
  } catch (err) {
    console.log('MongoDB connection error, ', err)
  }
}
