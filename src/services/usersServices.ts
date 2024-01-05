import User, { type UserInterface } from '../models/userSchema'
import { createHttpError } from '../errors/createError'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { dev } from '../config'
import { handleSendEmail } from '../helper/sendEmail'
import bcrypt from 'bcrypt'
import ApiError from '../errors/ApiError'
import slugify from 'slugify'
import { type UserType } from '../types'

export const processRegisterUser = async (userData: any) => {
  const { name, password, address, phone, email, order } = userData

  const userExist = await User.exists({ email })
  if (userExist) {
    throw ApiError.existError('User already exists with this email')
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const tokenPayload: UserType = {
    name,
    slug: slugify(name),
    email,
    password: hashPassword,
    address,
    phone,
    order
  }

  const token = jwt.sign(tokenPayload, dev.app.jwtUserActivationKey, { expiresIn: '5h' })
  const emailData = {
    email,
    subject: 'Activate your account',
    html: `<h1>Hello ${name}</h1>
                <a href="http://localhost:3000/users/activate/${token}">Click here to activate your account</a>`
  }
  await handleSendEmail(emailData)

  return { message: 'chick your email to activate your account' }
}

export const processActivateUser = async (token: string) => {
  if (!token) {
    throw ApiError.badRequest('Provide token')
  }

  const decodedData = jwt.verify(token, dev.app.jwtUserActivationKey)
  if (!decodedData) {
    throw ApiError.badRequest('Invalid token')
  }

  await User.create(decodedData)

  return { message: 'User is registered successfully' }
}

export const getUsers = async (page = 1, limit = 3, search = '') => {
  const count = await User.countDocuments()
  const totalPages = Math.ceil(count / limit)
  if (page > totalPages) {
    page = totalPages
  }
  const skip = (page - 1) * limit
  const searchRegExp = new RegExp('.*' + search + '.*', 'i')

  const filter = {
    $or: [
      { name: { $regex: searchRegExp } },
      { email: { $regex: searchRegExp } },
      { phone: { $regex: searchRegExp } }
    ]
  }

  const users = await User.find(filter, { password: 0 }).skip(skip).limit(limit).sort({ title: 1 }).populate('order')

  return {
    users,
    totalPages,
    currentPage: page
  }
}

export const findUserById = async (id: string): Promise<UserInterface> => {
  const user = await User.findById(id, { password: 0 })
  if (!user) {
    const error = createHttpError(404, 'user not found')
    throw error
  }

  return user
}

export const processUpdateUser = async (userId: string, updatedUserData: any) => {
  const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true })
  if (!user) {
    throw new Error('User not found')
  }

  return user
}

export const banUserById = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { isBan: true })
  if (!user) {
    const error = createHttpError(404, 'user not found')
    throw error
  }
  const users = await User.find()
  return users
}

export const deletUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id)
  if (!user) {
    const error = createHttpError(404, 'user not found')
    throw error
  }
  const users = await User.find()
  return users
}

export const unBanUserById = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { isBan: false })
  if (!user) {
    const error = createHttpError(404, 'user not found')
    throw error
  }
  const users = await User.find()
  return users
}

export const processForgetPassword = async (email: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User does not have an account!')
  }

  const token = jwt.sign({ email }, dev.app.jwtrestUSerPassword, { expiresIn: '5h' })

  const emailData = {
    email,
    subject: 'Reset Password',
    html: `<h1>Hello ${user?.name}</h1>
                <a href="http://localhost:3000/users/resetPassword/${token}">Click here to reset your password</a>`
  }

  await handleSendEmail(emailData)

  return { message: 'Check your email to reset your password', payload: token }
}

export const processResetPassword = async (token: string, password: string) => {
  const decoded = jwt.verify(token, dev.app.jwtrestUSerPassword) as JwtPayload
  if (!decoded) {
    throw createHttpError(400, 'Info is not decoded!')
  }

  const updatedUser = await User.findOneAndUpdate(
    { email: decoded.email },
    { $set: { password: bcrypt.hashSync(password, 10) } },
    { new: true }
  )
  if (!updatedUser) {
    throw createHttpError(400, 'Password updation failed')
  }

  return { message: 'Password is reset successfully' }
}

export const updateUserRole = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new Error('User not found')
  }
  if (user.isAdmin) {
    user.isAdmin = false
  } else {
    user.isAdmin = true
  }
  await user.save()
  return user._id
}
