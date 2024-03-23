import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetDolliProductCategoriesQuery,
  useGetDolliProductDetailsQuery,
  useGetDolliProductDocumentsQuery,
  useGetDolliProductStockQuery,
} from '../../../slices/dolibarr/dolliProductApiSlice';
import Loader from '../../../components/shared/loader/Loader';
import Barcode from 'react-barcode';
import { FaExclamation } from 'react-icons/fa';
import StockMouvementForm from '../../../components/screens/admin/stockMouvementForm/StockMouvementForm';

const AdminDolliProductDetails = () => {
  const { id } = useParams();
  const { data: product, refetch: refetchProduct, isLoading: isLoadingProduct, error: errorProduct } = useGetDolliProductDetailsQuery(id);
  const { data: category, isLoading: isLoadingCategory, error: errorCategory } = useGetDolliProductCategoriesQuery(id);
  const { data: stock, isLoading: isLoadingStock, error: errorStock } = useGetDolliProductStockQuery(id);
  const { data: documents, isLoading: isLoadingDocuments, error: errorDocuments } = useGetDolliProductDocumentsQuery(id);

  const calculateTotalStock = () => {
    let totalStock = 0;
    if (stock && Object.keys(stock.stock_warehouses).length > 0) {
      for (const warehouseId in stock.stock_warehouses) {
        totalStock += parseInt(stock.stock_warehouses[warehouseId].real);
      }
    }
    return totalStock;
  };

  useEffect(() => {
    // Effectue un refetch des données du produit après une action réussie
    if (id && !isLoadingProduct && !errorProduct) {
      refetchProduct();
    }
  }, [id, isLoadingProduct, errorProduct, refetchProduct]);

  return (
    <div className="container">
      {isLoadingProduct || isLoadingCategory || isLoadingStock || isLoadingDocuments ? (
        <Loader />
      ) : errorProduct || errorCategory || errorDocuments ? (
        <p variant="danger">
          {errorProduct?.data?.message || 'Une erreur est survenue'}
        </p>
      ) : (
        <>
          {documents && (
            <div className="imgs-container">
              {Object.keys(documents).map((key) => {
                if (key === 'ecmfiles_infos') {
                  return null;
                }
                if (!isNaN(parseInt(key))) {
                  return (
                    <div key={key}>
                      <img
                        src={`https://crm.krysto.nc/documents/produit/${documents[key].level1name}/${encodeURIComponent(documents[key].name)}`}
                        alt={documents[key].name}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
          <p
            className="badge-category"
            style={{ backgroundColor: category[0] ? `#${category[0].color}` : 'transparent' }}
          >
            {category[0] ? category[0].label : ''}
          </p>
          <Barcode value={product.barcode} />
          <h1>{product.label}</h1>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          <p>Prix de vente : {parseFloat(product.price)} XPF</p>
          <p>Prix de vente en gros : {parseFloat(product.price_min)} XPF</p>
          <p>Poids : {parseFloat(product.weight)} Gr</p>
          {stock ? (
            Object.keys(stock.stock_warehouses).length > 0 ? (
              <p>Stock total : {calculateTotalStock()}</p>
            ) : (
              <p className="zero-stock medium">
                <FaExclamation /> Pas de stock disponible
              </p>
            )
          ) : (
            <p className="zero-stock medium">
              <FaExclamation /> Pas de stock disponible
            </p>
          )}
          <StockMouvementForm productId={id} onSuccess={refetchProduct} />
        </>
      )}
    </div>
  );
  
};

export default AdminDolliProductDetails;
