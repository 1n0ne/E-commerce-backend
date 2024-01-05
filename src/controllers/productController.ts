import { type NextFunction, type Request, type Response } from 'express'

import { productCreation, productPagination, productRemoved, productUpdated, singleProduct } from '../services/productsServices'
import { uploadToCloudinary } from '../helper/cloudinary'

export const createSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body
    const image = req.file?.path

    if (!image) {
      throw new Error('Product image is missing')
    }
    const imgURL = await uploadToCloudinary(image, 'productsImages')
    const newProduct = await productCreation(productData, imgURL)
    res.status(201).json({
      payload: newProduct,
      message: 'create product successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const readAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const search = req.query.search as string

    // service for pagination
    const { products, totalPages, currentPage } = await productPagination(page, limit, search)
    // service for pagination

    res.status(200).json({
      payload: {
        products,
        totalPages,
        currentPage
      }
    })
  } catch (error) {
    next(error)
  }
}

export const readSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slugProduct = req.params.slug

    // service for create read single product
    const product = singleProduct(slugProduct)
    // service for create read single product

    res.send({ message: 'returned a single product', payload: product })
  } catch (error) {
    next(error)
  }
}

export const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    await productRemoved(id)
    res.send({ message: 'Deleted a single product' })
  } catch (error) {
    next(error)
  }
}

export const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const productData = req.body
    const image = req.file?.path
    if (image) {
      const imgURL = await uploadToCloudinary(image, 'productsImages')
      productData.image = imgURL
    }
    const product = await productUpdated(id, productData)

    res.status(200).json({ message: 'Update a single product', payload: product })
  } catch (error) {
    next(error)
  }
}
