import express from 'express'
const router = express.Router()
import {
  createRecyclableProduct,
  deleteRecyclableProduct,
  getAllRecyclableProducts,
  getRecyclableProductById,
  updateRecyclableProduct,
} from '../controllers/recyclableProductController.js'

import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router
  .route('/')
  .get(getAllRecyclableProducts)
  .post(protect, admin, createRecyclableProduct)

router
  .route('/:id')
  .get(checkObjectId, getRecyclableProductById)
  .put(protect, admin, checkObjectId, updateRecyclableProduct)
  .delete(protect, admin, checkObjectId, deleteRecyclableProduct)

export default router
