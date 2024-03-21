import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='container'>
        <h1>
            Dashboard Administration 
        </h1>

        <Link to={'/admin/users'} className='btn btn-primary'>Gestion des utilisateurs</Link>
        <Link to={'/admin/products'} className='btn btn-primary'>Gestion des produits</Link>
        <Link to={'/admin/messages'} className='btn btn-primary'>Gestion des messages</Link>
    </div>
  )
}

export default Dashboard