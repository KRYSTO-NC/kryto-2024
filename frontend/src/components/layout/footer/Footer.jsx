import './footer.css'
import { FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo/logo_krysto_couleur.png'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="img-footer-container">

       <img style={{ marginBottom:"5rem"}} className='logo-footer' src={Logo} alt="" />
      </div>
      <div className="footer-container">
        <div className="row">
          <div className="footer-col">
            <h4>À propos</h4>
            <ul>
              <li><Link to={'/about'}>Notre entreprise</Link></li>
              {/* <li><a href="#!">A propos</a></li>
              <li><a href="#!">Nos services</a></li>
              <li><a href="#!">Politique de confidentialité</a></li> */}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Liens</h4>
            <ul>
              <li><Link to={'/about'}>Obtenir de l'aide</Link></li>
              <li><Link to={'/faq'}>FAQ</Link></li>
              {/* <li><a href="#!">Livraisons</a></li>
              <li><a href="#!">Retours</a></li>
              <li><a href="#!">Commandes</a></li> */}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Légal</h4>
            <ul>
              <li><Link to={'/mentions-legales'}>Mentions légales</Link></li>
              <li><Link to={'/cgv'}>CGV</Link></li>
    
   

            </ul>
          </div>
          <div className="footer-col">
            <h4>Suivez-nous sur les réseaux</h4>
           <div className="social-links">
              <Link target='_blank' to={"https://www.facebook.com/profile.php?id=61556216258230"}><FaFacebook/></Link>
              {/* <a href="#!"><FaInstagram/></a>
              <a href="#!"><FaTwitter/></a>
              <a href="#!"><FaLinkedinIn/></a> */}
           </div>
          </div>
          
        </div>

      </div>
     
        <p style={{color:"black", textAlign:"center", marginTop:"7rem"}} >Site développé par <a href=" https://www.krysto.nc/" target="_blank">KRYSTO</a> - Tous droits réservés.</p>
    </footer>
  )
}

export default Footer