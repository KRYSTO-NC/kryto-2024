import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetThirdPartyDetailsQuery } from '../../../slices/dolibarr/dolliThirdPartyApiSlice';
import { useGetContactsByTiersIdQuery } from '../../../slices/dolibarr/dolliContactApiSlice';

const AdminThirdPartyDetails = () => {
    const { id } = useParams();
    const { data: thirdParty, isLoading, error } = useGetThirdPartyDetailsQuery(id);
    const { data: thirdPartyContacts, isLoadingContact, errorContact } = useGetContactsByTiersIdQuery(id);

    console.log(thirdParty);
 

    return (
        <>
            {isLoading || isLoadingContact ? (
                <p>Chargement en cours...</p>
            ) : error || errorContact ? (
                <p>Une erreur est survenue</p>
            ) : (
                <div className='container'>
                    <h1>{thirdParty.name}</h1>
                    <p>Code client : {thirdParty.code_client}</p>
                    <p>{thirdParty.address} , {thirdParty.zip}, {thirdParty.town}</p>
                    {thirdPartyContacts !== undefined ? (
                        <>
                            <h2 className='large'>Contacts pour ce tier</h2>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                        <th>Téléphone Pro</th>
                                        <th>Téléphone Perso</th>
                                        <th>Téléphone Mobile</th>
                                        {/* Ajoutez d'autres colonnes si nécessaire */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {thirdPartyContacts.map(contact => (
                                        <tr key={contact.id}>
                                            <td>{contact.lastname}</td>
                                            <td>{contact.firstname}</td>
                                            <td style={{ color: contact.phone_pro ? 'initial' : 'red' }}>{contact.phone_pro || 'Non défini'}</td>
                                            <td style={{ color: contact.phone_perso ? 'initial' : 'red' }}>{contact.phone_perso || 'Non défini'}</td>
                                            <td style={{ color: contact.phone_mobile ? 'initial' : 'red' }}>{contact.phone_mobile || 'Non défini'}</td>
                                          
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p>Aucun contact pour ce tiers.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default AdminThirdPartyDetails;
