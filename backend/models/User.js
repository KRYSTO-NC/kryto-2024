import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import gravatar from 'gravatar'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    enum: ['user', 'revendeur', 'partenaire'],
    default: 'user',
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Au moins 8 caractères
        // Au moins une lettre minuscule
        // Au moins une lettre majuscule
        // Au moins un chiffre
        // Au moins un caractère spécial (parmi !@#$%^&*)
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
        return regex.test(value)
      },
      message: (props) =>
        `Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial (!@#$%^&*).`,
    },
  },
  avatar: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

  // Set the Gravatar URL for the user's email
  this.avatar = gravatar.url(this.email, {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm', // Default image (a default "mystery man" avatar)
  })

  next()
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Match user entered password to hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

  return resetToken
}

export default mongoose.model('User', UserSchema)
