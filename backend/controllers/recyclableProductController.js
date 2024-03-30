import asyncHandler from '../middleware/asyncHandler.js'
import RecyclableProduct from '../models/recyclableProductModel.js'

const getAllRecyclableProducts = asyncHandler(async (req, res) => {
  const recyclableProducts = await RecyclableProduct.find({})
    .populate({
      path: 'plasticTypes',
      select: 'sigleFr',
    })
    .populate({
      path: 'plasticColors',
      select: 'name',
    })

  res.json(recyclableProducts)
})
// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getRecyclableProductById = asyncHandler(async (req, res) => {
  const product = await RecyclableProduct.findById(req.params.id)
    .populate({
      path: 'plasticTypes',
      select: 'sigleFr',
    })
    .populate({
      path: 'plasticColors',
      select: 'name',
    })

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Ressource not found')
  }
})

// // @desc create a product
// // @route POST /api/products
// // @access Private/Admin
const createRecyclableProduct = asyncHandler(async (req, res) => {
  const recyclableProduct = new RecyclableProduct({
    name: 'Sample name',
    genericName: 'Sample subname',
    category: 'Alimentaires',
    recyclableByKrysto: true,
    plasticTypes: ['737a3694e5fc335f796a4943'],
    plasticColors: ['6607cab72beebf7cd152fd1e'],
    images: ['/uploads/images-sample.png'],
    description: 'Sample description',
    transportation: 'Importée',
    barcode: '0000000000',
    content: '450 ml',
    brand: 'CADUM',
  })

  const createdRecyclableProduct = await recyclableProduct.save()
  res.status(201).json(createdRecyclableProduct)
})

// // @desc update a product
// // @route PUT /api/products
// // @access Private/Admin
const updateRecyclableProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    genericName,
    recyclableByKrysto,
    plasticTypes,
    plasticColors,
    images,
    description,
    transportation,
    barcode,
    content,
    brand,
  } = req.body

  const recyclableProduct = await RecyclableProduct.findById(req.params.id)
  if (recyclableProduct) {
    recyclableProduct.name = name
    recyclableProduct.genericName = genericName
    recyclableProduct.recyclableByKrysto = recyclableByKrysto
    recyclableProduct.plasticTypes = plasticTypes
    recyclableProduct.plasticColors = plasticColors
    recyclableProduct.images = images
    recyclableProduct.description = description
    recyclableProduct.transportation = transportation
    recyclableProduct.barcode = barcode
    recyclableProduct.content = content
    recyclableProduct.brand = brand
    recyclableProduct.category = category

    const updatedRecyclableProduct = await recyclableProduct.save()
    res.status(201).json(updatedRecyclableProduct)
  } else {
    res.status(404)
    throw new Error('Produit recyclable non trouvé')
  }
})

// // @desc delete a product
// // @route DELETE /api/products
// // @access Private/Admin
const deleteRecyclableProduct = asyncHandler(async (req, res) => {
  const recyclableProduct = await RecyclableProduct.findById(req.params.id)
  if (recyclableProduct) {
    await recyclableProduct.deleteOne({ _id: recyclableProduct._id })
    res.status(200).json({ message: 'Produit supprimé' })
  } else {
    res.status(404)
    throw new Error('Produit non trouvé')
  }
})

export {
  getRecyclableProductById,
  getAllRecyclableProducts,
  createRecyclableProduct,
  updateRecyclableProduct,
  deleteRecyclableProduct,
}
