import {
  createSingleProduct,
  deleteProductById,
  readAllProducts,
  readSingleProduct,
  updateProductById
} from '../controllers/productController'
import {
  productCreateValidation,
  slugValidation
} from '../middlewares/validation'
import { uploadImageProduct, validateImageUpload } from '../middlewares/uploadImage'

import { Router } from 'express'
import { runValidation } from '../middlewares/index'

const router = Router()

// Add validation checks to ensure the data meets certain criteria before performing create operations using express-validation.
router.post(
  '/',
  uploadImageProduct.single('image'),
  validateImageUpload,
  productCreateValidation,
  runValidation,
  createSingleProduct
)
// Add validation checks to ensure the data meets certain criteria before performing create operations using express-validation.

router.get('/', readAllProducts)

// Implement a route to handle GET requests for fetching a specific product based on a unique identifier
router.get('/:slug', slugValidation, runValidation, readSingleProduct)
// Implement a route to handle GET requests for fetching a specific product based on a unique identifier

router.delete('/:id', runValidation, deleteProductById)

// Add validation checks to ensure the data meets certain criteria before performing update operations using express-validation.
router.put(
  '/:id',
  uploadImageProduct.single('image'),
  productCreateValidation,
  runValidation,
  updateProductById
)
// Add validation checks to ensure the data meets certain criteria before performing update operations using express-validation.

export default router
