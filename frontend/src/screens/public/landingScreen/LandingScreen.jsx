import React from 'react'
import { Link } from 'react-router-dom'
import './landingScreen.css'
import IconsSection from '../../../components/screens/landing/IconsSection'
import SolutionSection from '../../../components/screens/landing/SolutionSection'
import SensibilisationSection from '../../../components/screens/landing/SensibilisationSection'
import Collecte from '../../../components/screens/landing/Collecte'

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
    <SolutionSection/>
    <SensibilisationSection/>
    <Collecte/>
 
 
  </>
  )
}

export default LandingScreen