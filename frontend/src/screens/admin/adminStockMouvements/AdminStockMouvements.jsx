import React from 'react';
import { useGetStockMovementQuery } from '../../../slices/dolibarr/dolliSockMouvement';

const AdminStockMouvements = () => {
    const { data: stockMouvements, refetch, isLoading, error } = useGetStockMovementQuery();
    
    return (
        <div className='container'>
            <h1>Mouvements de stock ({stockMouvements?.length})</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produit</th>
                            <th>Quantité</th>
                            {/* Ajoutez d'autres colonnes si nécessaire */}
                        </tr>
                    </thead>
                    <tbody>
                        {stockMouvements.map((movement, index) => (
                            <tr key={index}>
                                <td>{movement.id}</td>
                                <td>{movement.product_id}</td>
                                <td className={parseFloat(movement.qty) < 0 ? 'negative-quantity' : 'positive-quantity'}>
                                    {movement.qty}
                                </td>
                                {/* Ajoutez d'autres colonnes si nécessaire */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminStockMouvements;
