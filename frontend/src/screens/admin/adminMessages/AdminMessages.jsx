import React, { useState } from 'react'
import { useGetMessagesQuery } from '../../../slices/messagesApiSlice'
import Loader from '../../../components/shared/loader/Loader'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AdminMessages = () => {
  const { data: messages, isLoading, isError } = useGetMessagesQuery()
  const [selectedStatus, setSelectedStatus] = useState('all')
  console.log('messages:', messages)
  const filteredMessages =
    selectedStatus === 'all'
      ? messages
      : messages.filter((message) => message.status === selectedStatus)

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Une erreur est survenue</p>
      ) : (
        <div>
          <h1>Messages ({filteredMessages?.length})</h1>

          <div className='form'>
            <div className="form-group">

            <label htmlFor="statusFilter">Filtrer par statut: </label>
            <select
              id="statusFilter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              >
              <option value="all">Tous les messages</option>
              <option value="A traiter">A traiter</option>
              <option value="En attente">En attente</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>
              </div>

          {filteredMessages.length === 0 ? (
            <p className="red-info text-danger">Aucun messages</p>
          ) : (
            <table className='table'>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Objet</th>
                  <th>Produit</th>
                  <th>Utilisateur</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr key={message._id}>
                    <td>
                      {' '}
                      <p
                        className="status"
                        style={{
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
                    </td>
                    <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                    <td>{message.object}</td>

                    {message.product ? (
                      <td>
                        {' '}
                        <Link
                          target="_blank"
                          to={`/produit/${message.product._id}`}
                        >
                          {message.product.numMail}{' '}
                        </Link>{' '}
                      </td>
                    ) : (
                      <td>Produit non spécifié</td>
                    )}
                    {message.user ? (
                      <>
                        <td>{message.user.name}</td>
                      </>
                    ) : (
                      <>
                        <td>
                          <FaTimes />
                        </td>
                      </>
                    )}

                    <td>{message.responseMail}</td>
                    <td>{message.phone}</td>
                    <td>
                      <Link to={`/admin/message/${message._id}`}>
                        <button variant="light" className="btn-sm">
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminMessages
