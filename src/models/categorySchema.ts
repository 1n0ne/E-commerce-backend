import { Schema, model, type Document } from 'mongoose'

export interface CategoryInterface extends Document {
  _id: string
  name: string
  slug: string
  createdAt?: Date
  updatedAt?: Date
  _v: number
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlenght: [3, 'Category title length must be at least 3 charecters'],
      maxlength: [300, 'Category title length must be at most 100 charecters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'category slug is required']
    }
  },
  { timestamps: true }
)

export const Categories = model<CategoryInterface>('Category', categorySchema)
export default Categories
