import asyncHandler from '../middleware/asyncHandler.js'
import Contact from '../models/contactModel.js'

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
  res.json(contacts)
})

// @desc    Get single contact by ID
// @route   GET /api/contacts/:id
// @access  Public
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (contact) {
    res.json(contact)
  } else {
    res.status(404)
    throw new Error("Le contact n'a pas été trouvé")
  }
})

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
  const {
    client,
    email,
    phone,
    nom,
    prenom,
    entreprise,
    poste,
    adresse,
    codePostal,
    ville,
    remarque,
    accepteMail,
    status,
  } = req.body

  const contact = new Contact({
    client,
    email,
    phone,
    nom,
    prenom,
    entreprise,
    poste,
    adresse,
    codePostal,
    ville,
    remarque,
    accepteMail,
    status: status || 'A entrer dans dolibarr',
  })

  const createdContact = await contact.save()
  res.status(201).json(createdContact)
})

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Public
const updateContact = asyncHandler(async (req, res) => {
  const {
    client,
    email,
    phone,
    nom,
    prenom,
    entreprise,
    poste,
    adresse,
    codePostal,
    ville,
    remarque,
    accepteMail,
    status,
  } = req.body

  const contact = await Contact.findById(req.params.id)
  if (contact) {
    contact.client = client || contact.client
    contact.email = email || contact.email
    contact.phone = phone || contact.phone
    contact.nom = nom || contact.nom
    contact.prenom = prenom || contact.prenom
    contact.entreprise = entreprise || contact.entreprise
    contact.poste = poste || contact.poste
    contact.adresse = adresse || contact.adresse
    contact.codePostal = codePostal || contact.codePostal
    contact.ville = ville || contact.ville
    contact.remarque = remarque || contact.remarque
    contact.accepteMail = accepteMail || contact.accepteMail
    contact.status = status || contact.status

    const updatedContact = await contact.save()
    res.json(updatedContact)
  } else {
    res.status(404)
    throw new Error("Le contact n'a pas été trouvé")
  }
})

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (contact) {
    await contact.remove()
    res.json({ message: 'Contact supprimé' })
  } else {
    res.status(404)
    throw new Error("Le contact n'a pas été trouvé")
  }
})

export {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
}
