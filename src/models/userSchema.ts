import { Schema, model, type Document } from 'mongoose'
import { type OrderInterface } from './orderSchema'

// Create user model.
export interface UserInterface extends Document {
  _id: string
  name: string
  slug: string
  email: string
  password: string
  address: string
  phone: string
  isAdmin: boolean
  isBan: boolean
  order: OrderInterface['_id']

}

const userSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'The length of username can be minimum 3 characters'],
    maxlength: [30, 'The length of username can be maximum 30 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (email: string) {
        return /^\w+([.-]?\w+)*@\w([.-]?\w+)*(\.\w{2,3})+$/.test(email)
      },
      message: 'Please enter a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minlength: [8, 'The length of password can be minimum 8 characters']
  },
  address: {
    type: String,
    required: [true, 'Please give the address'],
    trim: true,
    minlength: [3, 'Address must be at least 3 characters long']
  },
  phone: {
    type: String,
    required: [true, 'Please give the phone number'],
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isBan: {
    type: Boolean,
    default: false
  },
  order: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
}, { timestamps: true })

const User = model<UserInterface>('User', userSchema)
export default User
