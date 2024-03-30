import express from 'express'
const router = express.Router()
import {
  createContact,
  deleteContact,
  getContacts,
  getContactById,
  updateContact,
} from '../controllers/contactController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router.route('/').get(getContacts).post(createContact)

router
  .route('/:id')
  .get(checkObjectId, getContactById)
  .put(protect, admin, checkObjectId, updateContact)
  .delete(protect, admin, checkObjectId, deleteContact)

export default router
