import { categoryUpdateValidation, validateCreateCategory } from '../middlewares/validation'
import { createSingleCategory, deleteCategory, getAllCategories, readSingleCategory, updateCategory } from '../controllers/categoryController'

import { Router } from 'express'
import { runValidation } from '../middlewares'

const router = Router()

router.post('/', validateCreateCategory, runValidation, createSingleCategory)
router.get('/', getAllCategories)
router.get('/:id', runValidation, readSingleCategory)
router.put('/:id', categoryUpdateValidation, runValidation, updateCategory)
router.delete('/:id', runValidation, deleteCategory)

export default router
