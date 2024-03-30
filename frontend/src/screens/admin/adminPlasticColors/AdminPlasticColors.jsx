import React, { useState } from 'react';
import { useGetPlasticColorsQuery, useCreatePlasticColorMutation } from '../../../slices/plasticColorsApiSlice';
import Modal from '../../../components/shared/modal/Modal';

const AdminPlasticColors = () => {
  const { data: plasticColors, error, isLoading , refetch} = useGetPlasticColorsQuery();
  const [newColor, setNewColor] = useState({ name: '', description: '', indice: '' });
  const [createPlasticColor, { isLoading: isCreatingColor }] = useCreatePlasticColorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewColor({ ...newColor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlasticColor(newColor).unwrap();
      // Réinitialiser les champs du formulaire après la création
      setNewColor({ name: '', description: '', indice: '' });
      refetch();
    } catch (error) {
      console.error('Failed to create plastic color:', error);
    }
  };

  return (
    <div className="container">
      <h2>Liste des couleurs de plastique</h2>

      <Modal modalBtn={"Ajouter une couleur"}>
        <h2>Ajouter une nouvelle couleur</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input type="text" name="name" id="name" value={newColor.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" value={newColor.description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="indice">Indice</label>
            <input type="number" name="indice" id="indice" value={newColor.indice} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isCreatingColor}>Ajouter</button>
        </form>
      </Modal>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.data.message}</div>}
      {plasticColors && (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Indice</th>
            </tr>
          </thead>
          <tbody>
            {plasticColors.map((color) => (
              <tr key={color._id}>
                <td>{color.name}</td>
                <td>{color.description}</td>
                <td>{color.indice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPlasticColors;
