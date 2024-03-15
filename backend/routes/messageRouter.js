import express from 'express'
const router = express.Router()
import {
  createMessage,
  deleteMessage,
  getMessages,
  getMessageById,
  updateMessage,
} from '../controllers/messageControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router.route('/').get(getMessages).post(createMessage)

router
  .route('/:id')
  .get(checkObjectId, getMessageById)
  .put(protect, admin, checkObjectId, updateMessage)
  .delete(protect, admin, checkObjectId, deleteMessage)

export default router
