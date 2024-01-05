import { type Request, type Response, type NextFunction } from 'express'

import { type Error } from '../types'

export const apiErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(error.status || 500).send({
    message: error.message
  })
}
