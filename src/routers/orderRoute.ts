import {
  getAllOrdersForAdmin,
  getOrderForUser,
  handleProcessPayment
} from '../controllers/orderController'
import { isAdmin, isLoggedin } from '../middlewares/auth'

import express from 'express'

const router = express.Router()

router.get('/all-orders', isLoggedin, isAdmin, getAllOrdersForAdmin)
router.post('/process-payment', isLoggedin, handleProcessPayment)
router.get('/:id([0-9a-fA-F]{24})', isLoggedin, getOrderForUser)
// router.put('/:id([0-9a-fA-F]{24})', isLoggedin, isAdmin, updateOrderStatus)

export default router
