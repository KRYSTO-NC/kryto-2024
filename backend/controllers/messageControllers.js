import asyncHandler from '../middleware/asyncHandler.js'
import Message from '../models/messageSchema.js'

// @desc    Get all messages
// @route   GET /api/messages
// @access  Public
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().populate('product user')
  res.json(messages)
})

// @desc    Get single message by ID
// @route   GET /api/messages/:id
// @access  Public
const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id).populate('product user')
  if (message) {
    res.json(message)
  } else {
    res.status(404)
    throw new Error("Le message n'a pas été trouvé")
  }
})

// @desc    Create a new message
// @route   POST /api/messages
// @access  Private
const createMessage = asyncHandler(async (req, res) => {
  const {
    product,
    user,
    responseMail,
    content,
    wantCall,
    phone,
    object,
    status,
  } = req.body

  const message = new Message({
    product,
    user,
    responseMail,
    wantCall,
    phone,
    object,
    content,
    status: status || 'A traiter', // Utilisation de la valeur par défaut si non fournie dans la requête
  })

  const createdMessage = await message.save()
  res.status(201).json(createdMessage)
})

// @desc    Update a message
// @route   PUT /api/messages/:id
// @access  Private/Admin
const updateMessage = asyncHandler(async (req, res) => {
  const { content, status } = req.body

  const message = await Message.findById(req.params.id)
  if (message) {
    message.content = content || message.content
    message.status = status || message.status

    const updatedMessage = await message.save()
    res.json(updatedMessage)
  } else {
    res.status(404)
    throw new Error("Le message n'a pas été trouvé")
  }
})

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)
  if (message) {
    await Message.deleteOne({ _id: req.params.id })
    res.json({ message: 'Message Suprimée' })
  } else {
    res.status(404)
    throw new Error("Le message n'a pas été trouvé")
  }
})

export {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
}
