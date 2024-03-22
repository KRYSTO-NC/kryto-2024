import React from 'react';
import { useGetWarehousesQuery } from '../../../slices/dolibarr/dolliWarehousesSlice';

const AdminWarehouses = () => {
    const { data: warehouses, refetch, isLoading, error } = useGetWarehousesQuery();
    console.log(warehouses);
    
    return (
        <div className='container'>
            <h1>Entrepôts</h1>
            {isLoading ? (
                <p>Chargement en cours...</p>
            ) : error ? (
                <p>Une erreur est survenue</p>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Adresse</th>
                            <th>Ville</th>
                            <th>reffrerence</th>
                            {/* Ajoutez d'autres colonnes si nécessaire */}
                        </tr>
                    </thead>
                    <tbody>
                        {warehouses.map(warehouse => (
                            <tr key={warehouse.id}>
                                <td>{warehouse.description}</td>
                                <td>{warehouse.address}</td>
                                <td>{warehouse.town}</td>
                                <td>{warehouse.ref}</td>
                                {/* Ajoutez d'autres cellules de données si nécessaire */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminWarehouses;
