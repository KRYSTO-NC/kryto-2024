import { Link, useNavigate } from 'react-router-dom'
import './productCard.css'
import { FaEye, FaHeart, FaQuestion, FaShoppingCart } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { useCreateMessageMutation } from '../../../../slices/messagesApiSlice'
import Modal from '../../../shared/modal/Modal'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const { userInfo } = useSelector((state) => state.auth)

  console.log(userInfo)


  console.log(product)



  const formattedPrice = product.price.toLocaleString('fr-FR')

  const [name, setName] = useState('')
  const [responseMail, setResponseMail] = useState('')
  const [object, setObject] = useState('Demande de renseignements')
  const [wantCall, setWantCall] = useState(false)
  const [phone, setPhone] = useState('')
  const [content, setContent] = useState('')

  const [
    createMessage,
    { isLoading: loadingCreate },
  ] = useCreateMessageMutation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Form submitted!')
    const formData = {
      name,
      responseMail,
      object,
      wantCall,
      phone,
      content,
      product: product._id,
      user: userInfo?._id,
    }

    // Add user ID to formData if userInfo is not null
    if (userInfo) {
      formData.user = userInfo._id // Replace 'userId' with the actual field name in your API
    }
    console.log('formData:', formData)
    try {
      await createMessage(formData)

      toast.success('Message envoyé avec succès!')

      // Réinitialise les valeurs après la soumission réussie
      resetForm()
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message")
    }
  }

  const resetForm = () => {
    setName('')
    setResponseMail('')
    setObject('Demande de renseignements')
    setWantCall(false)
    setPhone('')
    setContent('')
  }

  return (
    <div className="product-card">
      <div className="badge">{product.category.name}</div>

      {product.countInStock === 0 && (
        <div className="out-of-stock">En rupture de stock</div>
      )}
      <div className="product-thumb">
        <Link to={`/produit/${product._id}`}>
          {product.images && product.images.length > 0 && (
            <img src={product.images[0]} alt={product.name} />
          )}
        </Link>
      </div>
      <div className="product-details">
       
        <h4>
          <Link to={`/produit/${product._id}`}>{product.name}</Link>
        </h4>
        <p className="card-p">{product.description}</p>
      </div>
      <div className="product-bottom-details">
        {/* <div className="product-price">
          {formattedPrice}
          <small>XPF</small>
        </div> */}
        <div className="product-links">
          <Link to={`/produit/${product._id}`}>
            <FaEye />
          </Link>

          
          <Modal modalBtn={<FaQuestion/>}>
            <div className="modal-content">
              <h2>Demander un devis ou des renseignements pour  <br />{product.name} / REF : {product.numMail}</h2>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="">
                    Votre nom et prénom
                  </label>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">
                    Votre email
                  </label>
                  <input
                    type="email"
                    placeholder="entrez votre email"
                    value={responseMail}
                    onChange={(e) => setResponseMail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label  htmlFor="">
                    Objet de votre demande
                  </label>
                  <select
                    value={object}
                    onChange={(e) => setObject(e.target.value)}
                  >
                    <option value="Demande de renseignements">
                      Demande de renseignements
                    </option>
                    <option value="Demande de devis">Demande de devis</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div className="form-group checkbox">
                  <label  htmlFor="">
                    Vous souhaitez être rappelé ?
                  </label>

                  <input
                    type="checkbox"
                    name="wantCall"
                    id="yes"
                    checked={wantCall}
                    onChange={() => setWantCall(!wantCall)}
                  />
                  <label htmlFor="yes">Oui</label>
                </div>
                <div className="form-group">
                  <label  htmlFor="">
                    Votre numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    placeholder="Numéro de téléphone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">
                    Votre message
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    cols="30"
                    rows="10"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <button className="btn btn-block">Envoyer ma demande</button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
