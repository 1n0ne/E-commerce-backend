import * as authService from '../services/authService'

import { type NextFunction, type Request, type Response } from 'express'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const loginUser = await authService.loginUser({ email, password })

    const accessToken = loginUser.accessToken
    res.cookie('access_token', accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true

    })

    res.status(200).json({ message: 'user is logged in', payload: loginUser.user })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token')
    res.status(200).json({ message: 'user is logged out' })
  } catch (error) {
    next(error)
  }
}
