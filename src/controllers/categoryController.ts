import { type NextFunction, type Request, type Response } from 'express'
import slugify from 'slugify'

import { categoryCreation, categoryPagination, categoryRemoved, categoryUpdated, singleCategory } from '../services/categoriesServices'

export const createSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body

    const newCategory = await categoryCreation(name)

    res.status(201).send({ message: 'category is created', payload: newCategory })
  } catch (error) {
    next(error)
  }
}

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const { categories, totalPages, currentPage } = await categoryPagination(page, limit)

    res.status(200).json({
      payload: {
        categories,
        totalPages,
        currentPage
      }
    })
  } catch (error) {
    next(error)
  }
}

export const readSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const category = singleCategory(id)

    res.status(200).json({ message: 'returned a single category', payload: category })
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.body.name
    if (name) {
      req.body.slug = slugify(name)
    }

    const slug = req.params.slug
    const categoryData = req.body
    categoryUpdated(slug, categoryData)

    res.status(200).json({ message: 'This category is updated' })
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    categoryRemoved(id)

    res.status(200).json({ message: 'delete a single category' })
  } catch (error) {
    next(error)
  }
}
