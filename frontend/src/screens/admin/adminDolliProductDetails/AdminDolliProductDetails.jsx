import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetDolliProductCategoriesQuery, useGetDolliProductDetailsQuery, useGetDolliProductStockQuery } from '../../../slices/dolibarr/dolliProductApiSlice';
import Loader from '../../../components/shared/loader/Loader';
import Barcode from 'react-barcode'; // Importation de la composante Barcode
import { FaExclamation } from 'react-icons/fa';

const AdminDolliProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetDolliProductDetailsQuery(id);
  const { data: category , isLoadingCategory, errorCategory } = useGetDolliProductCategoriesQuery(id);
  const { data: stock , isLoadingStock, errorStock } = useGetDolliProductStockQuery(id);

  const calculateTotalStock = () => {
    let totalStock = 0;
    if (stock && Object.keys(stock.stock_warehouses).length > 0) {
      for (const warehouseId in stock.stock_warehouses) {
        totalStock += parseInt(stock.stock_warehouses[warehouseId].real);
      }
    }
    return totalStock;
  };

  return (
    <div className='container'>
      {isLoading || isLoadingCategory || isLoadingStock ? (
        <Loader />
      ) : error || errorCategory || errorStock ? (
        <p variant="danger">
          {error.data && error.data.message ? error.data.message : 'Une erreur est survenue'}
        </p>
      ) : (
        <>
          <p className='badge-category' style={{ backgroundColor: category[0] ? `#${category[0].color}` : 'transparent' }}>{category[0] ? category[0].label : ''}</p>
          <Barcode value={product.barcode} />
          <h1>{product.label}</h1>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          <p>Prix de vente : {parseFloat(product.price)} XPF</p>
          <p>Prix de vente en gros : {parseFloat(product.price_min)} XPF</p>
          <p>Poids : {parseFloat(product.weight)} Gr</p>
          {stock && Object.keys(stock.stock_warehouses).length > 0 ? (
            <p>Stock total : {calculateTotalStock()}</p>
          ) : (
            <p className='zero-stock medium'><FaExclamation/>  Pas de stock disponible</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDolliProductDetails;
