import React from 'react'
import { FaGlobe, FaLeaf, FaPalette } from 'react-icons/fa'; // Importez les icônes pertinentes depuis la bibliothèque React Icons


const IconsSection = () => {
  return (
    <section className='bg-light icons'>
        <div className="flex-icons">
        <div>
    <FaGlobe />
    <div className="div">
        <h3>Bon pour la planète</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, quae!</p>
    </div>
</div>

<div>
    <FaLeaf />
    <div className="div">
        <h3>Écologique</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, quae!</p>
    </div>
</div>

<div>
    <FaPalette />
    <div className="div">
        <h3>Design</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, quae!</p>
    </div>
</div>
        </div>
    </section>
  )
}

export default IconsSection