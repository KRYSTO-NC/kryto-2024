import React, { useState, useEffect } from 'react'
import './productScreen.css'
import ProductCard from '../../../components/screens/products/productCard/ProductCard'
import Loader from '../../../components/shared/loader/Loader'

import { FaSearch, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useGetCategoriesQuery } from '../../../slices/categoriesSlice'
import { useGetAllProductsQuery } from '../../../slices/productsApiSlice'

function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

const ProductsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetAllProductsQuery()
  console.log(products)

  const { data: categories } = useGetCategoriesQuery()

  const filterProductsByCategory = (products, category) => {
    if (!products) {
      return [];
    }
    
    return products.filter((product) => {
      const isProductIncluded =
        (category === '' || (product.category && product.category._id.toString() === category));
      console.log('Product:', product);
      console.log('Is included:', isProductIncluded);
      return isProductIncluded;
    });
  };
  const categoryFilteredProducts = filterProductsByCategory(
    products,
    selectedCategory,
  )

  const filteredProducts =
    categoryFilteredProducts?.filter((product) =>
      removeAccents(product.name).includes(removeAccents(searchTerm)),
    ) || []

  const isAllCategoriesSelected = selectedCategory === ''

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
  }

  const noResultsParagraph = (
    <div className="no-result">
      <p
        className="message-red"
        style={{ marginTop: '3rem', textAlign: 'center', fontSize: '2rem' }}
      >
        Aucun produit ne correspond à votre critère ... <br />
        <span>
          Vous pouvez chercher "Peignes", "Jenga", "Bagues", ect.{' '}
        </span>
        <button onClick={resetFilters}>
          {' '}
          RÉINITIALISER LES FILTRES <FaTimes />
        </button>
      </p>
    </div>
  )

  if (loadingProducts) {
    return (
      <div className="container">
        <Loader />
      </div>
    )
  } else if (errorProducts) {
    return (
      <div className="container">
        <h1>Une erreur est survenue</h1>
      </div>
    )
  }

  return (
    <div className='container'>
      <div>
        <div className="searchEngine"></div>
      </div>
      <div className="page-container yellow">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Rechercher un produit"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-product">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>

          {/* Bouton de réinitialisation */}
          <button onClick={resetFilters}>
            <FaTimes />
          </button>
        </div>

        <section className="flex-container">
          {filteredProducts.length === 0
            ? noResultsParagraph
            : filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </section>
      </div>
    </div>
  )
}

export default ProductsScreen
