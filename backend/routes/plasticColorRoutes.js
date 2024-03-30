import express from 'express'
const router = express.Router()
import {
  createPlasticColor,
  getPlasticColors,
  getPlasticColor,
  updatePlasticColor,
  deletePlasticColor,
} from '../controllers/plasticColorController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router.route('/').get(getPlasticColors).post(createPlasticColor)

router
  .route('/:id')
  .get(checkObjectId, getPlasticColor)
  .put(protect, admin, checkObjectId, updatePlasticColor)
  .delete(protect, admin, checkObjectId, deletePlasticColor)

export default router
