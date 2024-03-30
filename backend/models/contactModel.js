import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    client: {
      type: Boolean,
      default: 'false',
    },

    email: {
      type: String,
      required: [true, 'Merci de renseigner votre email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Vous devez renseigner une adresse email valide',
      ],
    },
    phone: {
      type: String,
    },
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    entreprise: {
      type: String,
    },
    poste: {
      type: String,
    },
    adresse: {
      type: String,
    },
    codePostal: {
      type: String,
    },
    ville: {
      type: String,
    },
    remarque: {
      type: String,
      required: true,
    },
    accepteMail: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'A entrer dans dolibarr',
      enum: ['A entrer dans dolibarr', 'dolibarr Ok'],
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

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
