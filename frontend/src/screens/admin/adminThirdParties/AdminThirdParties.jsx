import React, { useState } from 'react'
import { useGetThirdPartiesQuery } from '../../../slices/dolibarr/dolliThirdPartyApiSlice'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AdminThirdParties = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOption, setFilterOption] = useState('1')
  const { data: thirdParties, isLoading, error } = useGetThirdPartiesQuery(
    filterOption,
  )

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  const filteredThirdParties = thirdParties
    ? thirdParties.filter((thirdParty) =>
        thirdParty.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  return (
    <div className="container">
      <h1>Tiers ({thirdParties?.length})</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterOption} onChange={handleFilterChange}>
          <option value="1">Clients</option>
          <option value="2">Prospects</option>
          <option value="3">Ni clients ni prospects</option>
          <option value="4">Fournisseurs</option>
        </select>
      </div>
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p>Une erreur est survenue</p>
      ) : filteredThirdParties.length === 0 ? (
        <>
          <div className="not-found-message">
            <p>Aucun tiers trouvé.</p>
            <button className="btn btn-danger" onClick={handleClearSearch}>
              <FaTimes />
            </button>
          </div>
        </>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Code postal</th>
              <th>Ville</th>
              <th>Pays</th>
            </tr>
          </thead>
          <tbody>
            {filteredThirdParties.map((thirdParty) => (
              <tr key={thirdParty.id}>
                <td>
                  {' '}
                  <Link to={`/admin/tier-details/${thirdParty.id}`}>{thirdParty.name} </Link>{' '}
                </td>
                <td>{thirdParty.email}</td>
                <td>{thirdParty.phone}</td>
                <td>{thirdParty.zip}</td>
                <td>{thirdParty.town}</td>
                <td>{thirdParty.country_code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminThirdParties
