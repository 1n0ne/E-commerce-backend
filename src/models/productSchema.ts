import { Schema, model, type Document } from 'mongoose'
import { type CategoryInterface } from './categorySchema'

export interface ProductInterface extends Document {
  _id: string
  name: string
  slug: string
  description: string
  quantity: number
  variants: string[]
  sizes: string[]
  sold: number
  price: number
  image: string
  category: CategoryInterface['_id']
  createdAt?: Date
  updatedAt?: Date
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters long'],
      maxlength: [300, 'Product name must be at most 300 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Product description must be at least 3 characters long']
    },
    quantity: {
      type: Number,
      default: 1,
      trim: true
    },
    sold: {
      type: Number,
      default: 1,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    variants: {
      type: [String],
      default: []
    },
    sizes: {
      type: [String],
      default: []
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
      trim: true
    },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }]
  },
  { timestamps: true }
)

export const Products = model<ProductInterface>('Product', productSchema)
