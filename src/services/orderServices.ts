import { createHttpError } from '../errors/createError'
import { type IOrderProduct, Order, type OrderInterface } from '../models/orderSchema'
import User from '../models/userSchema'

export const getAdminOrder = async () => {
  const order = await Order.find()
    .populate({
      path: 'products',
      populate: { path: 'product', select: 'name price category image quantity' }
    })
    .populate('buyer', 'name email phone')

  return order
}

export const processPayment = async (cartItems: any, buyerId: string | undefined) => {
  const newOrder: OrderInterface = new Order({
    products:
      cartItems.length > 0 &&
      cartItems.map((item: IOrderProduct) => ({
        product: item.product,
        quantity: item.quantity
      })),
    payment: cartItems.payment,
    buyer: buyerId
  })
  await newOrder.save()
  await User.findByIdAndUpdate(buyerId, { $push: { order: newOrder } })

  return newOrder
}

export const getUserOrder = async (userId: string | undefined) => {
  // const userId = req.params.id
  const orders = await Order.find({ buyer: userId })
    .populate({
      path: 'products',
      populate: { path: 'product', select: 'name price category image quantity ' }
    })
    .populate('buyer', 'name email phone')

  return orders
}

// export const updateOrder = async (slug: string, req: Request) => {
//   if (req.body?.name) {
//     req.body.slug = slugify(req.body.name)
//   }

//   const updateData = req.body

//   const order = await Order.findOneAndUpdate({ slug }, updateData, { new: true })
//   if (!order) {
//     const error = createHttpError(404, `order is not found with this slug: ${slug}`)
//     throw error
//   }
//   return order
// }

export const deleteOrder = async (slug: string) => {
  const order = await Order.findOneAndDelete({ slug })
  if (!order) {
    const error = createHttpError(404, `order is not found with this slug: ${slug}`)
    throw error
  }

  return order
}
