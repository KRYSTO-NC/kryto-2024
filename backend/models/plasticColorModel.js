import mongoose from 'mongoose'

const plasticColorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    indice: {
      type: String,
      default: '1',
      enum: ['1', '2', '3', '4', '5'], // Ajoutez les statuts nécessaires
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

const PlasticColor = mongoose.model('PlasticColor', plasticColorSchema)

export default PlasticColor
