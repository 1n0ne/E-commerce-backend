import express, { type Application } from 'express'

import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import { dev } from './config'
import usersRouter from './routers/userRoutes'
import productsRouter from './routers/productRoute'
import ordersRouter from './routers/orderRoute'
import categoriesRouter from './routers/categoriesRoute'
import authRoute from './routers/authRoute'
import myLogger from './middlewares/logger'
import { apiErrorHandler } from './middlewares/errorHandler'
import { connectDB } from './config/db'
import { createHttpError } from './errors/createError'

const app: Application = express()
app.use(cookieParser())
const PORT: number = dev.app.port
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(myLogger)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Create routes to handle CRUD requests.
app.use('/users', usersRouter)
app.use('/auth', authRoute)
app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use('/orders', ordersRouter)
// Create routes to handle CRUD requests.

app.use(apiErrorHandler)
mongoose.set('strictQuery', false)

app.listen(PORT, () => {
  console.log('Server running http://localhost:' + PORT)
  connectDB()
})

app.use((req, res, next) => {
  const error = createHttpError(404, 'Route not found')
  next(error)
})
