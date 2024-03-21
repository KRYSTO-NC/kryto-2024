import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 50
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },

          // Ajoutez d'autres champs ici si nécessaire
        ],
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .populate('category subCategory')
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('category')
  res.json(products)
})
// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category')

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Ressource not found')
  }
})

// @desc create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    subname: 'Sample subname',
    refference: 'Sample refference',
    description: 'Sample description',
    price: 1,
    minOrder: 1,
    user: req.user._id,
    images: ['/uploads/images-sample.png'],
    category: '6100f353b2b07b0c14a28f12',
    countInStock: 0,
    numReviews: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc update a product
// @route PUT /api/products
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    subname,
    price,
    description,
    refference,
    images,
    category,
    countInStock,
    options,
  } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.subname = subname
    product.price = price
    product.description = description
    product.images = images
    product.category = category
    product.refference = refference

    product.countInStock = countInStock
    product.options = options

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Produit non trouvé')
  }
})

// @desc delete a product
// @route DELETE /api/products
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.deleteOne({ _id: product._id })
    res.status(200).json({ message: 'Produit supprimé' })
  } else {
    res.status(404)
    throw new Error('Produit non trouvé')
  }
})
// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Vous avez déjà donné votre avis sur ce produit')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Avis ajouté !' })
  } else {
    res.status(404)
    throw new Error('Produit non trouvé')
  }
})
// @desc get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({}).sort({ rating: -1 }).limit(5)

  res.status(200).json(product)
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getAllProducts,
}
