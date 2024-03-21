import React from 'react'
import { Link } from 'react-router-dom'
import './landingScreen.css'
import IconsSection from '../../../components/screens/landing/IconsSection'

const LandingScreen = () => {
  return (
    <>
    <div className="home-hero">
      <div className="content">

        <h1>Le changement commence localement</h1>

        <p>Clean, Create, Recycle, Repeat </p>

        <div className="actions-container">

 
        <Link to="/nos-produits" className="btn btn-primary">
          Nos produits
        </Link>
        <Link to="/nos-produits" className="btn btn-primary">
          S'inscrire
        </Link>
        </div>
      </div>
    </div>

    <IconsSection/>

 
 
  </>
  )
}

export default LandingScreen