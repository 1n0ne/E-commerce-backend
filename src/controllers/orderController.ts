import { type NextFunction, type Request, type Response } from 'express'

import { getAdminOrder, getUserOrder, processPayment } from '../services/orderServices'

interface CustomRequest extends Request {
  userId?: string
}

export const getAllOrdersForAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getAdminOrder()
    res.status(200).json({ message: 'Orders are returned for the admin', payload: orders })
  } catch (error) {
    next(error)
  }
}

export const handleProcessPayment = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cartItems } = req.body
    const buyerId = req.userId
    const newOrder = await processPayment(cartItems, buyerId)

    res.status(200).json({ message: 'payment was successful and order is created', payload: newOrder })
  } catch (error) {
    next(error)
  }
}

export const getOrderForUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id
    const orders = await getUserOrder(userId)

    res.status(200).json({ message: 'Orders are returned for the user', payload: orders })
  } catch (error) {
    next(error)
  }
}

// export const updateOrderStatus = async (req: CustomRequest, res: Response, next: NextFunction) => {
//   try {
//     const orderId = req.params.id
//     const { status } = req.body
//     const updateStatus = await Order.findOneAndUpdate(
//       { _id: orderId },
//       { $set: { status } },
//       { new: true }
//     )

//     if (!updateStatus) {
//       throw createHttpError(400, `Updated status was unsuccessfully with the status ${status}`)
//     }
//     res.status(200).json({
//       message: 'The status was updated successfully',
//       payload: updateStatus
//     })
//   } catch (error) {
//     next(error)
//   }
// }
