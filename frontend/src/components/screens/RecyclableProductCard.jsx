import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

const RecyclableProductCard = ({ product }) => {
  console.log(product)
  return (
    <div className="recyclable-product-card">
      <p className="badge">{product.category}</p>
      <div className="product-card-thumb">
        <img src={product.images[0]} alt={product.name} />
      </div>
      <h2>{product.name}</h2>

      <div className="infos">
        <p>Marque : {product.brand}</p>
      </div>

        types de plastiques:
      <div className="plastics">
        {product.plasticTypes.map((plasticType) => (
          <div className="card-icone" key={plasticType._id}>
            <img src={plasticType.images[0]} alt="" />
          </div>
        ))}
      </div>
      {product.recyclableByKrysto ? (
        <p className="recyclable">
          <span><FaCheck style={{color:"green"}}/></span>
        </p>
      ) : (
        <p className="not-recyclable">
          <span><FaTimes style={{color:"red"}}/></span>
        </p>
      )}
    </div>
  )
}

export default RecyclableProductCard
