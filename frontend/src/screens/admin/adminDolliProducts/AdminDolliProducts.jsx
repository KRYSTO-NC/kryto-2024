import React, { useState } from 'react';
import Loader from '../../../components/shared/loader/Loader';
import { useGetDolliProductsQuery } from '../../../slices/dolibarr/dolliProductApiSlice';
import { Link } from 'react-router-dom';

const AdminDolliProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('0'); // État pour stocker la catégorie sélectionnée

  const { data, isLoading, error, refetch } = useGetDolliProductsQuery(selectedCategory); // Passer la catégorie sélectionnée à l'appel API

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Mettre à jour la catégorie sélectionnée lors du changement dans le menu déroulant
  };

  // Fonction pour calculer la valeur du stock pour un produit
  const calculateStockValue = (product) => {
    // Convertir les valeurs de prix et de stock réel en nombres
    const price = parseFloat(product.price);
    const stockReel = parseFloat(product.stock_reel);
  
    // Vérifier si le stock réel est un nombre positif
    if (!isNaN(price) && !isNaN(stockReel) && stockReel > 0) {
      // Calculer la valeur du stock en multipliant le prix par le stock réel
      return Math.round(price * stockReel); // Arrondir à l'entier le plus proche
    } else {
      return 0;
    }
  };

  // Calculer la valeur totale du stock pour tous les produits
  const totalStockValue = data && data.length > 0 ? data.reduce((acc, product) => acc + calculateStockValue(product), 0) : 0;

  return (
    <div className='container'>
      <h1>Produits Krysto</h1>
      <div className="total-stock-value medium">Valeur totale du stock: {totalStockValue} XPF</div>
      {/* Menu déroulant pour filtrer les catégories */}
      <div className="form">
        <div className="form-group">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="0">Tous les produits</option>
            <option value="34">Productions - Mode</option>
            <option value="37">Productions - Bazar</option>
            <option value="35">Productions - Jeux & Education</option>
            <option value="36">Productions - Décoration intérieur</option>
            <option value="38">Matière premières - Paillettes</option>
            {/* Ajouter d'autres options selon vos besoins */}
          </select>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p variant="danger">
          {typeof error.data.message === 'string' ? error.data.message : 'Une erreur est survenue'}
        </p>
      ) : (
        <>
          <div className="total-stock-value">Valeur totale du stock: {totalStockValue} XPF</div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Refference</th>
                <th>Nom</th>
                <th>Prix Public</th>
                <th>Prix PRO</th>
                <th>En stock</th>
                <th>VAL stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => {
                // Ajouter une classe spéciale lorsque la valeur du stock est zéro
                const stockClass = product.stock_reel === '0' ? 'zero-stock' : 'in-stock';

                return (
                  <tr key={product.id}>
                    <td><Link to={`/admin/product-dollibar/${product.id}`}>{product.id}</Link></td>
                    <td>{product.ref}</td>
                    <td>{product.label}</td>
                    <td>{parseFloat(product.price)} XPF</td>
                    <td>{parseFloat(product.price_min)} XPF</td>
                    <td className={stockClass}>
                      {product.stock_reel != null
                        ? typeof product.stock_reel === 'number'
                          ? product.stock_reel.toFixed(0) // Supprimer les chiffres après la virgule
                          : typeof product.stock_reel === 'string'
                          ? parseFloat(product.stock_reel).toFixed(0) // Supprimer les chiffres après la virgule
                          : product.stock_reel
                        : '0'}
                    </td>
                    <td className={stockClass}>{calculateStockValue(product)} XPF</td> {/* Appel de la fonction pour calculer la valeur du stock */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminDolliProducts;
