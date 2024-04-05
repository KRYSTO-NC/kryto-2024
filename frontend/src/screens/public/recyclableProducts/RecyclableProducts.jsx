import React from 'react'
import { useGetRecyclableProductsQuery } from '../../../slices/recyclableProductsApiSlice'
import RecyclableProductCard from '../../../components/screens/RecyclableProductCard'

const RecyclableProducts = () => {
  const {
    data: recyclableProducts,
    error,
    isLoading,
  } = useGetRecyclableProductsQuery()
  console.log(recyclableProducts)
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.data.message}</div>}
      {recyclableProducts && (
        <div className="container">
          <h1>Savoir si nous pouvons recycler un déchet</h1>

          <div className="recyclable-products-container">

          {recyclableProducts.map((product) => (
              <RecyclableProductCard key={product._id} product={product} />
              ))}
              </div>
        </div>
      )}
    </div>
  )
}

export default RecyclableProducts
