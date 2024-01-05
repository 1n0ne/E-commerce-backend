import { type ProductInterface } from './productSchema'
import { Schema, model, type Document, type Types } from 'mongoose'

export interface IOrderProduct {
  product: ProductInterface['_id']
  quantity: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOrderPayment {}

export interface OrderInterface extends Document {
  _id: string
  products: IOrderProduct[]
  payment: IOrderPayment
  buyer: Types.ObjectId
  status: 'Not Processed' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled'
}

const orderSchema = new Schema<OrderInterface>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true, trim: true }
      }
    ],
    payment: { type: Object },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['Not Processed', 'Processing', 'Shipped', 'Delivered', 'Canceled'],
      default: 'Not Processed'
    }
  },
  { timestamps: true }
)

export const Order = model<OrderInterface>('Order', orderSchema)
export default Order
