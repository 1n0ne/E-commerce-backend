/* eslint-disable @typescript-eslint/await-thenable */
import { type NextFunction, type Request, type Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'

import User from '../models/userSchema'
import { createHttpError } from '../errors/createError'
import { dev } from '../config'

interface CustomRequest extends Request {
  userId?: string
}

export const isLoggedin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.access_token
    if (!accessToken) {
      throw createHttpError(401, 'You are not logged in.')
    }
    const decoded = await jwt.verify(accessToken, dev.app.jwtUserlogin) as JwtPayload
    if (!decoded) {
      throw createHttpError(401, 'Invalid access token')
    }
    req.userId = decoded._id
    next()
  } catch (error) {
    next(error)
  }
}

export const isLoggedOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.access_token
    if (accessToken) {
      throw createHttpError(401, 'You are logged in.')
    }

    next()
  } catch (error) {
    next(error)
  }
}

export const isAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId)
    if (!user?.isAdmin) {
      throw createHttpError(401, 'You are not an admin.')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}
