import User, { type UserInterface } from '../models/userSchema'

import bcrypt from 'bcrypt'
import { createHttpError } from '../errors/createError'
import { dev } from '../config'
import jwt from 'jsonwebtoken'

export const loginUser = async (userData: any) => {
  const { email, password } = userData
  const user = await findUserByEmail(email)
  await isPasswordMatch(user, password)
  isUserBanned(user)

  const accessToken = jwt.sign({ _id: user._id }, dev.app.jwtUserlogin, { expiresIn: '1d' })

  return { user, accessToken }
}

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email }).populate('order', 'products IOrderPayment').populate({
    path: 'order',
    populate: {
      path: 'products.product',
      select: 'name price image quantity'
    }
  })
  if (!user) {
    throw createHttpError(404, `User not found with the email ${email}`)
  }
  return user
}

export const isPasswordMatch = async (user: UserInterface, password: string) => {
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw createHttpError(401, `Password doesn't match with this email ${user.email}`)
  }
}

export const isUserBanned = (user: UserInterface) => {
  if (user.isBan) {
    throw createHttpError(
      403,
      `User is banned with this email ${user.email}. Please contact the admin`
    )
  }
}
