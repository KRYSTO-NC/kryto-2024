import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../../../slices/productsApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/shared/loader/Loader'
import Slider from '../../../components/shared/slider/Slider'
import './productScreen.css'
import Modal from '../../../components/shared/modal/Modal'
import { useCreateMessageMutation } from '../../../slices/messagesApiSlice'
import { toast } from 'react-toastify'

const ProductScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id)

  const [name, setName] = useState('');
  const [responseMail, setResponseMail] = useState('');
  const [object, setObject] = useState('Demande de renseignements');
  const [wantCall, setWantCall] = useState(false);
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');
  
  const [createMessage, { isLoading: loadingCreate }] = useCreateMessageMutation();
  const { userInfo } = useSelector((state) => state.auth);



  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted!');
    const formData = {
      name,
      responseMail,
      object,
      wantCall,
      phone,
      content,
      product: id,
      user: userInfo?._id
    };

     // Add user ID to formData if userInfo is not null
  if (userInfo) {
    formData.user = userInfo._id; // Replace 'userId' with the actual field name in your API
  }
 console.log('formData:', formData);
    try {
     await createMessage(formData);
      
      toast.success('Message envoyé avec succès!');
    

      // Réinitialise les valeurs après la soumission réussie
      resetForm();
    } catch (error) {
  
      toast.error('Erreur lors de l\'envoi du message');
    }
  };

  const resetForm = () => {
    setName('');
    setResponseMail('');
    setObject('Demande de renseignements');
    setWantCall(false);
    setPhone('');
    setContent('');
  };
  const renderDescription = () => {
    if (!product.description) return null

    const paragraphs = product.description.split('@')

    return paragraphs.map((paragraph, index) => (
      <p className="desc-p" key={index}>
        {paragraph}
      </p>
    ))
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error?.data?.message}</div>
      ) : (
        <div className="page-container">
          <Slider product={product} />
          <div className="price"></div>
          <div className="product-details">
            <h1>{product.name}</h1>
          
            <div className="product-actions">
            <Modal modalBtn={"demander un devis ou des renseignements"}>
              <div className="modal-content">
                <h2>Demander un devis ou des renseignements</h2>
                <p>{product.name}/ Ref: {product.numMail}</p>
                <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label  htmlFor="">
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
          <label  htmlFor="">
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
            <div className="description">
            <h2>Détails sur ce produit</h2>
              
              {renderDescription()}</div>
          </div>

          <div className="container-tab">
            <h2>Caractéristiques de ce produits</h2>
            <table className="options">
              <tbody>
                {product.options.map((option, index) => (
                  <tr key={index}>
                    <td className="colored">{option.name}</td>
                    <td>{option.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductScreen
