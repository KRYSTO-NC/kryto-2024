import plasticTypes from '../data/plasticTypes.js'
import asyncHandler from '../middleware/asyncHandler.js'
import PlasticColor from '../models/plasticColorModel.js'

// @desc    Get all messages
// @route   GET /api/messages
// @access  Public
const getPlasticColors = asyncHandler(async (req, res) => {
  const plasticColors = await PlasticColor.find()
  res.json(plasticColors)
})

// @desc    Get single message by ID
// @route   GET /api/messages/:id
// @access  Public
const getPlasticColor = asyncHandler(async (req, res) => {
  const plasticColor = await PlasticColor.findById(req.params.id)
  if (plasticColor) {
    res.json(plasticColor)
  } else {
    res.status(404)
    throw new Error("Le message n'a pas été trouvé")
  }
})

// @desc    Create a new message
// @route   POST /api/messages
// @access  Private
const createPlasticColor = asyncHandler(async (req, res) => {
  const { name, description, indice } = req.body

  const plasticColor = new PlasticColor({
    name,
    description,
    indice,
  })

  const createdPlasticColor = await plasticColor.save()
  res.status(201).json(createdPlasticColor)
})

// @desc    Update a message
// @route   PUT /api/messages/:id
// @access  Private/Admin
const updatePlasticColor = asyncHandler(async (req, res) => {
  const { name, description, indice } = req.body

  const plasticColor = await PlasticColor.findById(req.params.id)
  if (plasticColor) {
    plasticColor.name = name
    plasticColor.description = description
    plasticColor.indice = indice

    const updatedPlasticColor = await plasticColor.save()
    res.json(updatePlasticColor)
  } else {
    res.status(404)
    throw new Error("La couleur plastique n'a pas été trouvé")
  }
})

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deletePlasticColor = asyncHandler(async (req, res) => {
  const plasticColor = await PlasticColor.findById(req.params.id)
  if (plasticColor) {
    await PlasticColor.deleteOne({ _id: req.params.id })
    res.json({ message: 'Couleur de plastique supprimée' })
  } else {
    res.status(404)
    throw new Error("La couleur n'a pas été trouvé")
  }
})

export {
  getPlasticColors,
  getPlasticColor,
  createPlasticColor,
  updatePlasticColor,
  deletePlasticColor,
}
