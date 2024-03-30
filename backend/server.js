import path from 'path'
import cors from 'cors'
import express from 'express'

import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import notFound from './middleware/error.js'
import errorHandler from './middleware/error.js'
import userRoutes from './routes/userRoutes.js'
import messageRoutes from './routes/messageRouter.js'
import uploadRoutes from './routes/uploadRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import plasticTypeRoutes from './routes/plasticTypesRoutes.js'
import plasticColorRoutes from './routes/plasticColorRoutes.js'
import recyclableProductRoutes from './routes/recyclableProductRoutes.js'

const port = process.env.PORT || 5000

connectDB()
const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// Cookie parser middleware
app.use(cookieParser())

// Define routes
app.use('/krysto/api/v1/users', userRoutes)
app.use('/krysto/api/v1/upload', uploadRoutes)
app.use('/krysto/api/v1/categories', categoryRoutes)
app.use('/krysto/api/v1/products', productRoutes)
app.use('/krysto/api/v1/messages', messageRoutes)
app.use('/krysto/api/v1/contacts', contactRoutes)
app.use('/krysto/api/v1/plastic-types', plasticTypeRoutes)
app.use('/krysto/api/v1/recyclable-products', recyclableProductRoutes)
app.use('/krysto/api/v1/plastic-colors', plasticColorRoutes)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(notFound)

app.use(errorHandler)

// Utilisez server.listen pour gérer à la fois l'API express et les connexions Socket.IO
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
