import './adminMessage.css'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import { useGetMessageDetailsQuery, useUpdateMessageMutation } from '../../../slices/messagesApiSlice';
import Loader from '../../../components/shared/loader/Loader';

const AdminMessageEditScreen = () => {
  const { id: messageId } = useParams();
  const { data: message, isLoading, error, refetch } = useGetMessageDetailsQuery(messageId);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const navigate = useNavigate();

  const [status, setStatus] = useState('');

  const [updateMessageStatus, { isLoading: updateMutationLoading }] = useUpdateMessageMutation();

  useEffect(() => {
    setStatus(message?.status || '');
  }, [message]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoadingUpdate(true);

      await updateMessageStatus({
        messageId,
        status,
      }).unwrap();

      toast.success('Le statut du message a été mis à jour avec succès');
      refetch();
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <>
      <section className='container'>
        {loadingUpdate && <p>Loading...</p>}
        {isLoading ? (
          <div className="page-container">
            <Loader/>
          </div>
        ) : error ? (
          <div variant="danger">{error.data.message}</div>
        ) : (
          <div className='page-container'>
            <div className="heading">
              <h1>MESSAGE : {message._id}</h1>
            </div>
            <div className="message-infos">
                <p>
                    <strong>De :</strong> {message.responseMail} 
                    
                </p>
                <p>
                    <strong>Envoyé le :</strong> {new Date(message.createdAt).toLocaleString()}
                </p>
                <p>
                    <p
                        className="status"
                        style={{
                          color:"white",
                          backgroundColor:
                            message.status === 'A traiter'
                              ? 'red'
                              : message.status === 'En attente'
                              ? 'orange'
                              : 'green',
                        }}
                      >
                        {message.status}
                      </p>{' '}
                </p>
            </div>

            {message.product ? (
  <p>{message.product.name}</p>
) : (
  <p className='message-red'>Produit non spécifié</p>
)}

            <div className="message-content">
                <h4>Message :</h4>
                <p>{message.content}</p>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="status">Statut du message:</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="A traiter">A traiter</option>
                  <option value="En attente">En attente</option>
                  <option value="Terminé">Terminé</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Mettre à jour le statut
              </button>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default AdminMessageEditScreen;
