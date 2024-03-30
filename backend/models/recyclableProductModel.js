import mongoose from 'mongoose'

const optionSchema = mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
})

const recyclableProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genericName: { type: String },

    recyclableByKrysto: { type: Boolean },
    plasticTypes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'PlasticType' },
    ],
    plasticColors: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'PlasticColor' },
    ],

    images: [
      {
        type: String,
      },
    ],

    content: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    transportation: {
      type: String,
      enum: [
        'Fabriquée en Nouvelle-Calédonie',
        'Transformée en Nouvelle-Calédonie',
        'Inconnu',
        'Importée',
      ],
      default: 'Importée',
      required: true,
    },
    category: {
      type: String,
      enum: ['Produits ménagers', 'Soins du corps', 'Alimentaires', 'Divers'],
      default: 'Alimentaires',
      required: true,
    },
    brand: { type: String },

    barcode: { type: String },

    // Other
    remarque: { type: String },
  },

  {
    timestamps: true,
  },
)

const RecyclableProduct = mongoose.model(
  'RecyclableProduct',
  recyclableProductSchema,
)

export default RecyclableProduct
