import React from 'react'
import {
  useCreateRecyclableProductMutation,
  useGetRecyclableProductsQuery,
} from '../../../slices/recyclableProductsApiSlice'
import { Link } from 'react-router-dom'
import { FaCheck, FaEdit, FaPlus, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

const AdminRecyclableProducts = () => {
  const {
    data: recyclableProducts,
    error,
    isLoading,
    refetch,
  } = useGetRecyclableProductsQuery()

  const [
    createRecyclableProduct,
    { isLoading: loadingCreate },
  ] = useCreateRecyclableProductMutation()

  const createRecyclableProductHandler = async () => {
    if (
      window.confirm('Etes vous sur de vouloir ajouter un nouveau produit ?')
    ) {
      try {
        await createRecyclableProduct()
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className="container">
      <h2>Liste des produits recyclable</h2>

      <button className="btn" onClick={createRecyclableProductHandler}>
        <FaPlus /> Nouveau produit
      </button>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.data.message}</div>}
      {recyclableProducts && (
        <table className="table">
          <thead>
            <tr>
              <th>nom</th>
              <th>Categorie</th>
              <th>Marque</th>
              <th>Contenu</th>
              <th>recyclable</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {recyclableProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <Link to={`/admin/recyclable-product/${product._id}`}>
                    {product.name}
                  </Link>
                </td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.content}</td>
                {product.recyclableByKrysto ? (
                  <td style={{ color: 'green' }}>
                    <FaCheck />
                  </td>
                ) : (
                  <td style={{ color: 'red' }}>
                    <FaTimes />
                  </td>
                )}

                <td>
                  <Link to={`/admin/recyclable-product/${product._id}/edit`}>
                    <button><FaEdit style={{color:"orange"}}/></button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminRecyclableProducts
