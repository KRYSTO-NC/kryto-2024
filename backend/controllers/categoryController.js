import asyncHandler from '../middleware/asyncHandler.js'
import Category from '../models/categoryModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})
  res.json(categories)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error('Ressource non trouvé')
  }
})

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: 'Sample name',
    description: 'Sample description',
  })

  const createdCategory = await category.save() // Utilisez category.save() au lieu de Category.save()
  res.status(201).json(createdCategory)
})
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  const category = await Category.findById(req.params.id)

  if (category) {
    category.name = name
    category.description = description

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } else {
    res.status(404)
    throw new Error('Categorie non trouvée')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await Category.deleteOne({ _id: category._id })
    res.json({ message: 'Categorie suprimée' })
  } else {
    res.status(404)
    throw new Error('Categorie non trouvée')
  }
})

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
