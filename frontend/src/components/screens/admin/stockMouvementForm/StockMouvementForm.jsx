import React, { useState } from 'react';
import { useGetWarehousesQuery } from '../../../../slices/dolibarr/dolliWarehousesSlice';
import { useAddStockMovementMutation } from '../../../../slices/dolibarr/dolliSockMouvement';
import { toast } from 'react-toastify';

const StockMouvementForm = ({ productId, onSuccess }) => {
  const { data: warehouses, isLoading, error } = useGetWarehousesQuery();
  const [quantity, setQuantity] = useState(0);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('');
  const [
    addStockMovement,
    { isLoading: isAddingStockMovement, error: addStockMovementError },
  ] = useAddStockMovementMutation();

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };



  const handleWarehouseChange = (event) => {
    setSelectedWarehouseId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addStockMovement({
        productId,
        warehouseId: selectedWarehouseId,
        qty: quantity,
      });
  
      toast.success('Mouvement de stock ajouté avec succès!');
      onSuccess();
  
      // Attendre deux secondes avant de recharger la page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
  
      // Réinitialiser les champs après l'ajout réussi du mouvement de stock
      setQuantity(0);
      setSelectedWarehouseId('');
    } catch (error) {
      console.error("Erreur lors de l'ajout du mouvement de stock :", error);
      toast.error("Erreur lors de l'ajout du mouvement de stock");
    }
  };
  

  return (
    <>
      {isLoading && <p>Chargement en cours...</p>}
      {error && <p>Une erreur est survenue : {error.message}</p>}
      <section>
        <div className="form">
          <h2>Entrer un mouvement de stock (ajout seulement)</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="quantity">Quantité</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="warehouse_id">Entrepôt</label>
              <select
                id="warehouse_id"
                name="warehouse_id"
                value={selectedWarehouseId}
                onChange={handleWarehouseChange}
                required
              >
                <option value="">Sélectionner un entrepôt</option>
                {warehouses?.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.description} / {warehouse.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isAddingStockMovement}
            >
              {isAddingStockMovement ? 'Enregistrement en cours...' : 'Enregistrer'}
            </button>
            {addStockMovementError && (
              <p>
                Erreur lors de l'ajout du mouvement de stock : {addStockMovementError.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default StockMouvementForm;
