import asyncHandler from '../middleware/asyncHandler.js'
import PlasticType from '../models/plasticType.js'
import ErrorResponse from '../utils/errorResponse.js'

//@description:     Get all plastic types
//@route:            GET /krysto/api/v1/plastic-types
//@access:           Public
const getPlasticTypes = asyncHandler(async (req, res, next) => {
  const plasticTypes = await PlasticType.find()

  res.status(200).json({
    success: true,
    data: plasticTypes,
  })
})

//@description:     Get a single plastic type
//@route:            GET /krysto/api/v1/plastic-types/:id
//@access:           Public
const getPlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await PlasticType.findById(req.params.id)

  if (!plasticType) {
    return next(
      new ErrorResponse(
        `Plastic type not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: plasticType,
  })
})

//@description:     Create a plastic type
//@route:            POST /krysto/api/v1/plastic-types
//@access:           Private
const createPlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await PlasticType.create(req.body)

  res.status(201).json({
    success: true,
    data: plasticType,
  })
})

//@description:     Update a plastic type
//@route:            PUT /krysto/api/v1/plastic-types/:id
//@access:           Private
const updatePlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await PlasticType.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!plasticType) {
    return next(
      new ErrorResponse(
        `Plastic type not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: plasticType,
  })
})

//@description:     Delete a plastic type
//@route:            DELETE /krysto/api/v1/plastic-types/:id
//@access:           Private
const deletePlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await PlasticType.findByIdAndDelete(req.params.id)

  if (!plasticType) {
    return next(
      new ErrorResponse(
        `Plastic type not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})

export {
  getPlasticTypes,
  getPlasticType,
  createPlasticType,
  updatePlasticType,
  deletePlasticType,
}
