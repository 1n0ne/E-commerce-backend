import { type NextFunction, type Request, type Response } from 'express'

import mongoose from 'mongoose'

import { banUserById, deletUserById, findUserById, getUsers, processActivateUser, processForgetPassword, processRegisterUser, processResetPassword, processUpdateUser, unBanUserById, updateUserRole } from '../services/usersServices'

import { createHttpError } from '../errors/createError'

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, password, address, phone, email, order } = req.body

    const result = await processRegisterUser({ name, password, address, phone, email, order })

    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body
    const result = await processActivateUser(token)

    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const { users, totalPages, currentPage } = await getUsers(page, limit)
    res.status(200).json({
      payload: {
        users,
        totalPages,
        currentPage
      }
    })
  } catch (error) {
    next(error)
  }
}

export const findUserByid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUserById(req.params.id)
    if (!user) {
      throw new Error('User not found')
    }

    res.status(200).json({ message: 'user is reternd', payload: user })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'Id foramt is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUserData = req.body
    const userId = req.params.id

    const user = await processUpdateUser(userId, updatedUserData)

    res.status(200).json(user)
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'ID format is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const banUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await banUserById(req.params.id)

    res.status(200).json({ message: 'User banned successfully', payload: users })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'Id foramt is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const deleteSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await deletUserById(req.params.id)
    res.status(200).json({ message: 'User deleted successfully', payload: users })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'Id foramt is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const unBanUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await unBanUserById(req.params.id)
    res.status(200).json({ message: 'User unbanned successfully', payload: users })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'Id foramt is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body

    const result = await processForgetPassword(email)

    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const restPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body

    const result = await processResetPassword(token, password)

    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const changeUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id
    await updateUserRole(userId)
    res.status(200).json({ message: 'User role updated', payload: userId })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'ID format is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}
