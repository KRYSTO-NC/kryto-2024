import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    object: {
      type: String,
      default: 'Demande de renseignements',
      enum: ['Demande de renseignements', 'Demande de devis', 'Autre'], // Ajoutez les statuts nécessaires
    },
    responseMail: {
      type: String,
      required: [true, 'Merci de renseigner votre email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Vous devez renseigner une adresse email valide',
      ],
    },
    wantCall: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'A traiter',
      enum: ['A traiter', 'En attente', 'Terminé'], // Ajoutez les statuts nécessaires
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

const Message = mongoose.model('Message', messageSchema)

export default Message
