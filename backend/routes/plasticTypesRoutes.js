import express from 'express'
const router = express.Router()
import {
  createPlasticType,
  deletePlasticType,
  getPlasticTypes,
  getPlasticType,
  updatePlasticType,
} from '../controllers/plasticTypeController.js'

import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router.route('/').get(getPlasticTypes).post(protect, admin, createPlasticType)

router
  .route('/:id')
  .get(checkObjectId, getPlasticType)
  .put(protect, admin, checkObjectId, updatePlasticType)
  .delete(protect, admin, checkObjectId, deletePlasticType)

export default router
