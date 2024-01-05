import slugify from 'slugify'

import { type ProductInterface, Products } from '../models/productSchema'
import { createHttpError } from '../errors/createError'
import { deleteFromCloudinary } from '../helper/cloudinary'
import { extractPublicId } from 'cloudinary-build-url'

export const productCreation = async (productData: ProductInterface, image: string | undefined) => {
  const { name, price, description, quantity, sold, category } = productData

  const newProduct = await Products.create({
    name,
    slug: slugify(name),
    price,
    image,
    description,
    quantity,
    sold,
    category
  })
  //  await newProduct.populate('category')
  return newProduct
}

// Include pagination functionality to retrieve products in batches limit the number of items returned in a single request.
export const productPagination = async (page = 1, limit = 3, search = '') => {
  const count = await Products.countDocuments()

  const totalPages = Math.ceil(count / limit)
  if (page > totalPages) {
    page = totalPages
  }
  const skip = (page - 1) * limit

  const searchRegExp = new RegExp('.*' + search + '.*', 'i')

  const filter = {
    $or: [{ name: { $regex: searchRegExp } }]
  }

  // Implement a route to handle GET requests with query parameters for filtering products based on title or price, sorted by title
  const products = await Products.find(filter)
    // .populate('category')
    .skip(skip)
    .limit(limit)
    .sort({ title: 1 })
  // Implement a route to handle GET requests with query parameters for filtering products based on title or price, sorted by title

  return {
    products,
    totalPages,
    currentPage: page
  }
}

export const singleProduct = async (slug: string) => {
  const product = await Products.find({ slug })
  if (product.length === 0) {
    throw createHttpError(409, 'Product not found with this slug')
  }

  return product
}

export const productRemoved = async (id: string) => {
  const deleteProduct = await Products.findById(id)
  if (deleteProduct) {
    const publicId = extractPublicId(deleteProduct.image)
    await deleteFromCloudinary(publicId)
    await Products.findByIdAndDelete(id)
  } else {
    throw createHttpError(409, 'Product not found with this slug!')
  }
}
export const productUpdated = async (id: string, productData: ProductInterface) => {
  const products = await Products.findByIdAndUpdate(id, productData, {
    new: true
  })
  if (!products) {
    throw new Error('Product not found with this id!')
  }

  return products
}
