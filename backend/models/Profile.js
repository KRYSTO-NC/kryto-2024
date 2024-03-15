const mongoose = require('mongoose')
const Schema = mongoose.Schema
const geocoder = require('../utils/geocoder')
const Product = require('./Product')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: String,
  },
  logo: {
    type: string,
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS',
    ],
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

module.exports = Profile = mongoose.model('profile', ProfileSchema)
