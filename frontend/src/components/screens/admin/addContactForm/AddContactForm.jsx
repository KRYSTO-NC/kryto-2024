import React, { useState } from 'react';
import Modal from '../../../shared/modal/Modal';
import { useCreateContactMutation } from '../../../../slices/contactsApiSlice';

const AddContactForm = () => {
  const [formData, setFormData] = useState({
    client: false,
    email: '',
    phone: '',
    nom: '',
    prenom: '',
    entreprise: '',
    poste: '',
    adresse: '',
    codePostal: '',
    ville: '',
    remarque: '',
    accepteMail: false,
    status: 'A entrer dans dolibarr',
  });

  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(formData);
    // Réinitialiser le formulaire après la soumission si nécessaire
    setFormData({
      client: false,
      email: '',
      phone: '',
      nom: '',
      prenom: '',
      entreprise: '',
      poste: '',
      adresse: '',
      codePostal: '',
      ville: '',
      remarque: '',
      accepteMail: false,
      status: 'A entrer dans dolibarr',
    });
  };

  return (
    <>
      <Modal modalBtn={"Ajouter le contact"}>
        <h2>Ajouter un contact</h2>
        <form onSubmit={handleSubmit} className='form'>
<div className="form-group">

        <label htmlFor="client">client:</label>
          <input type="checkbox" id="client" name="client" checked={formData.client} onChange={handleChange} />
</div>
          <label htmlFor="nom">Nom:</label>
          <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />

          <label htmlFor="prenom">Prénom:</label>
          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

          <label htmlFor="phone">Téléphone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />

          <label htmlFor="entreprise">Entreprise:</label>
          <input type="text" id="entreprise" name="entreprise" value={formData.entreprise} onChange={handleChange} />

          <label htmlFor="poste">Poste:</label>
          <input type="text" id="poste" name="poste" value={formData.poste} onChange={handleChange} />

          <label htmlFor="adresse">Adresse:</label>
          <input type="text" id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} />

          <label htmlFor="codePostal">Code Postal:</label>
          <input type="text" id="codePostal" name="codePostal" value={formData.codePostal} onChange={handleChange} />

          <label htmlFor="ville">Ville:</label>
          <input type="text" id="ville" name="ville" value={formData.ville} onChange={handleChange} />

          <label htmlFor="remarque">Remarque:</label>
          <textarea id="remarque" name="remarque" value={formData.remarque} onChange={handleChange} />

          <label htmlFor="accepteMail">Accepte les emails:</label>
          <input type="checkbox" id="accepteMail" name="accepteMail" checked={formData.accepteMail} onChange={handleChange} />

          <button className='btn btn-primary' type="submit" disabled={isLoading}>Ajouter</button>
        </form>
      </Modal>
    </>
  );
};

export default AddContactForm;
