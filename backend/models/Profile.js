const mongoose = require('mongoose')
const Schema = mongoose.Schema
const geocoder = require('../utils/geocoder')
const Product = require('./Product')
const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
)

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: String,
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS',
    ],
  },

  status: {
    type: String,
    required: true,
  },

  categoryProduct: {
    type: [String],
  },

  bio: {
    type: String,
  },

  phone: {
    type: String,
    maxlength: [6, 'Phone number can not be longer than 6 characters'],
  },

  address: {
    type: String,
  },

  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },

  // experience: [
  //   {
  //     title: {
  //       type: String,
  //       required: true,
  //     },
  //     company: {
  //       type: String,
  //       required: true,
  //     },
  //     location: {
  //       type: String,
  //     },
  //     from: {
  //       type: Date,
  //       required: true,
  //     },
  //     to: {
  //       type: Date,
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false,
  //     },
  //     description: {
  //       type: String,
  //     },
  //   },
  // ],
  // product: [
  //   {
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     description: {
  //       type: String,
  //       required: true,
  //       maxlength: [500, 'Description can not be more than 500 characters'],
  //     },
  //     category: {
  //       type: String,
  //     },
  //     price: {
  //       type: Number,
  //     },
  //     url: {
  //       type: String,
  //     },
  //   },
  // ],

  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },

  reviews: [reviewSchema],
  reports: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      reason: {
        type: String,
        required: true,
      },
      details: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
})

// Geocode & create location field
ProfileSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  }

  // Do not save address in DB
  this.address = undefined
  next()
})

// Cascade delete courses when a bootcamp is deleted
ProfileSchema.pre('remove', async function (next) {
  console.log(`Product being removed from profile ${this._id}`)
  await this.model('Product').deleteMany({ profile: this._id })
  next()
})

// Reverse populate with virtuals
ProfileSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'profile',
  justOne: false,
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
