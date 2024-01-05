import { check } from 'express-validator'

export const slugValidation = [check('slug').notEmpty().withMessage('slug is incorrect')]

export const productCreateValidation = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('product name is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('product name should be within 3-200 characters long'),
  check('price')
    .trim()
    .notEmpty()
    .withMessage('product price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  check('description').trim().notEmpty().withMessage('product description is required')
]

export const UserInfoValidation = [
  check('email').isEmail().withMessage('Please provide a valid email address'),
  check('name')
    .isLength({ min: 3, max: 30 })
    .withMessage('Name must be between 3 and 30 characters'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('address').isLength({ min: 3 }).withMessage('Address must be at least 3 characters long'),
  check('phone').notEmpty().withMessage('Phone number is required')
]

export const productUpdateValidation = [
  check('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('product name is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('product name should be within 3-200 characters long'),
  check('price')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('product price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  check('description').optional().trim().notEmpty().withMessage('product description is required')
]

export const categoryUpdateValidation = [
  check('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('category name is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('category name should be within 3-200 characters long')
]

export const validateCreateCategory = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Category Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Category Name should be 3-100 characters long')
]

export const validateCreateOrder = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('order Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('order Name should be 3-100 characters long')
]

export const validateUpdateOrder = [
  check('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('order Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('order Name should be 3-100 characters long')
]
