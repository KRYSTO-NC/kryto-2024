// Importez les styles nécessaires
import './navbar.css'
import {
  FaBars,
  FaTimes,
  FaUser,
  FaArrowAltCircleRight,
  FaStop,
  FaProductHunt,
  FaEnvelope,
} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../slices/authSlice'

import React, { useState } from 'react'
import { useLogoutMutation } from '../../../slices/userApiSlice'
import Logo from '../../../assets/logo/logo_krysto_couleur.png'
import { useGetMessagesQuery } from '../../../slices/messagesApiSlice'
// Composant NavLink
const NavLink = ({ to, label, icon }) => (
  <li>
    <Link to={to}>
      {' '}
      {icon} {label}
    </Link>
  </li>
)

// Composant Navbar
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data: messages, isLoading, isError } = useGetMessagesQuery()
   console.log(messages);
  const filteredMessages = messages
    ? messages.filter((message) => message.status === 'A traiter')
    : []
  console.log(filteredMessages.length)
  const { userInfo } = useSelector((state) => state.auth)
  const [logoutApiCall] = useLogoutMutation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link className="logo" to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>

        {/* ============================== desktop responsive Menu */}

        {userInfo ? (
          // ======================= Menu si connecté
          <>
            <ul className={`links ${isMenuOpen ? 'open' : ''}`}>
              <li>
                <NavLink to="/nos-produits" label="Nos produits" />
              </li>
          

              {userInfo.isAdmin && (
                <>
                  <li>
                    <NavLink
                      to="/admin/dashboard"
                      label="Administration"
                      className="mini-link"
                    />
                  </li>
                  <li>
                    <Link to={'/admin/messages'}>
                      <FaEnvelope
                        style={{
                          color: filteredMessages.length > 0 ? 'red' : 'green',
                        }}
                      />
                      <p>{filteredMessages.length}</p>
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="action-container">
              <Link to={'/private/mon-profil'} className="action_btn btn">
                <FaArrowAltCircleRight /> {userInfo.name}
              </Link>
              <Link
                to={'/'}
                onClick={logoutHandler}
                className="action_btn btn logout"
              >
                <FaStop /> Deconnection
              </Link>
            </div>
          </>
        ) : (
          // ======================= Menu si pas connecté
          <>
            <ul className={`links ${isMenuOpen ? 'open' : ''}`}>
              <li>
                <NavLink to="/nos-produits" label="Nos produits" />
              </li>
            </ul>
            <div className="action-container">
              <Link to={'/inscription'} className="action_btn btn">
                <FaUser /> S'enregistrer
              </Link>
              <Link to={'/connexion'} className="action_btn btn">
                <FaArrowAltCircleRight /> Connection
              </Link>
            </div>
          </>
        )}

        <div className="toggle_btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
      {/* =============================== dropdown responsive Menu tablet and phone */}
      <div className={`dropdown_menu ${isMenuOpen ? 'open' : ''}`}>
        {/* ======================= Menu si connecté */}
        <ul>
          {userInfo ? (
            <>
              <li>
                <NavLink to="/nos-produits" label="Nos produits" />
              </li>
              
              {userInfo.isAdmin && (
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    label="Administration"
                    className="mini-link"
                  />
                  <span style={{
                          backgroundColor: filteredMessages.length > 0 ? 'red' : 'green',
                        }}>{filteredMessages.length}</span>
                </li>
              )}
              <li>
                <Link to={'/private/mon-profil'} className="action_btn btn">
                  <FaArrowAltCircleRight /> {userInfo.name}
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  onClick={logoutHandler}
                  className="action_btn btn"
                >
                  <FaUser /> Deconnection
                </Link>
              </li>
            </>
          ) : (
            // ======================= Menu si pas connecté
            <>
              <li>
                <NavLink
                  className="mini-link"
                  to="/nos-produits"
                  label="Nos produits"
                  icon={<FaProductHunt />}
                />
              </li>

              <div className="action-container">
                <li>
                  <Link
                    to="/connexion"
                    label="Connexion"
                    className="btn action-btn"
                  >
                    {' '}
                    <FaUser /> Connexion{' '}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inscription"
                    label="S'inscrire"
                    className="btn action-btn"
                  >
                    {' '}
                    Inscription{' '}
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Navbar
