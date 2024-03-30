import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='container'>
        <h1>
            Dashboard Administration 
        </h1>

        <Link to={'/admin/users'} className='btn btn-primary'>Gestion des utilisateurs</Link>
        <Link to={'/admin/plastic-types'} className='btn btn-primary'>Les types de plastiques</Link>
        <Link to={'/admin/plastic-colors'} className='btn btn-primary'>Les couleurs de plastique</Link>
        <Link to={'/admin/recyclable-products'} className='btn btn-primary'>Les produits recyclable</Link>
        <Link to={'/admin/products'} className='btn btn-primary'>Gestion des produits</Link>
        <Link to={'/admin/messages'} className='btn btn-primary'>Gestion des messages</Link>
        <Link to={'/admin/contacts'} className='btn btn-primary'>Gestion des contacts</Link>
        <Link to={'/admin/products-dollibar'} className='btn btn-dark'>Gestion des Produits dollibar</Link>
        <Link to={'/admin/tiers'} className='btn btn-dark'>Liste des tiers</Link>
        <Link to={'/admin/entrepots'} className='btn btn-dark'>Liste des entrepots</Link>
        <Link to={'/admin/mouvements-stock'} className='btn btn-dark'>Mouvements de stock</Link>
     
        <Link to={'/admin/table-des-ventes'} className='btn btn-success'>Caisse</Link>

  
    </div>
  )
}

export default Dashboard