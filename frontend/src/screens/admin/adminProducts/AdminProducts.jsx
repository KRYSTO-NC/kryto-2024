import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { useDeleteProductMutation, useCreateProductMutation, useGetAllProductsQuery } from '../../../slices/productsApiSlice';
import { toast } from 'react-toastify';

import './adminProduct.css';
import Paginate from '../../../components/utils/Paginate';
import Loader from '../../../components/shared/loader/Loader';

const AdminProducts = () => {
 
  const { data, isLoading, error, refetch } = useGetAllProductsQuery()
    console.log(data);
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Etes vous sur de vouloir ajouter un nouveau produit ?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className='container'>
      <div >
        <div>
          <h1>Produits ({data?.length})</h1>
        </div>
        <div>
          <button className='btn' onClick={createProductHandler}>
            <FaPlus /> Nouveau produit
          </button>
        </div>

        {loadingCreate && <div>Loading...</div>}
        {loadingDelete && <div>Loading...</div>}
        {isLoading ? (
          <Loader/>
        ) : error ? (
          <div>Error: {error.data.message}</div>
        ) : (
          <>
            <table className='table'>
              <thead>
                <tr>
                  <th>refference</th>
                  <th>Nom</th>
                  <th>PRIX</th>
                  <th>CATEGORIE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((product) => (
                  <tr key={product._id}>
                    <td className='td-mail' >
                      <Link to={`/produit/${product._id}`} target="_blank" > {product.refference} </Link>
                    </td>
                    <td>{product.name}</td>
                    <td>XPF{product.price}</td>
                    <td>{product.category?.name}</td>
                  
                
                    <td>
                      <Link style={{ color: 'orange' }} to={`/admin/product-edit/${product._id}`}>
                        <FaEdit />
                      </Link>
                      <button onClick={() => deleteHandler(product._id)}>
                        <FaTrash style={{ color: 'red' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
