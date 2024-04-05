import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import categories from './data/categories.js'
import plasticTypes from './data/plasticTypes.js'
import plasticColors from './data/plasticColors.js'
import recyclableProducts from './data/recyclableProducts.js'
import User from './models/User.js'
import Product from './models/productModel.js'
import PlasticType from './models/plasticType.js'
import PlasticColor from './models/plasticColorModel.js'
import Category from './models/categoryModel.js'
import RecyclableProduct from './models/recyclableProductModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // await User.deleteMany()
    // await Category.deleteMany()
    // await Product.deleteMany()
    // await RecyclableProduct.deleteMany()
    // await PlasticColor.deleteMany()
    await PlasticType.deleteMany()

    // const createdUsers = await User.insertMany(users)
    // await Category.insertMany(categories)

    // const adminUser = createdUsers[0]._id
    await PlasticType.insertMany(plasticTypes)
    // await RecyclableProduct.insertMany(recyclableProducts)
    // await PlasticColor.insertMany(plasticColors)
    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // await User.deleteMany()
    // await Category.deleteMany()
    // await Product.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
