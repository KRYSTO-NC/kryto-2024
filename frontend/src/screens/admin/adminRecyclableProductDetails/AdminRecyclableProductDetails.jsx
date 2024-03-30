import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetRecyclableProductDetailsQuery } from '../../../slices/recyclableProductsApiSlice';
import Barcode from 'react-barcode';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import './adminRecyclableProduct.css'


const AdminRecyclableProductDetails = () => {
    const { id: recyclableProductId } = useParams();
    const { data: recyclableProduct, error, isLoading  } = useGetRecyclableProductDetailsQuery(recyclableProductId);

    return (
        <div className='container'>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.data.message}</div>}
            {recyclableProduct && (
                <div container>
                    <h1 className='large'>{recyclableProduct.name}</h1>
                    <div className='imgs-recyclableProduct'>
                        {recyclableProduct.images.map((image, index) => (
                            <img key={index} src={image} alt={`Image ${index + 1}`} />
                        ))}
                    </div>
                    <Barcode value={recyclableProduct.barcode} />

                    <p><strong>Marque:</strong> {recyclableProduct.brand}</p>
                    <p><strong>Catégorie:</strong> {recyclableProduct.category}</p>
                    <p><strong>Contenu:</strong> {recyclableProduct.content}</p>
                    <p><strong>Description:</strong> {recyclableProduct.description}</p>
                    <p><strong>Nom générique:</strong> {recyclableProduct.genericName}</p>
                    <p><strong>Recyclable par Krysto:</strong> {recyclableProduct.recyclableByKrysto ? 'Oui' : 'Non'}</p>
                    <p><strong>Transport:</strong> {recyclableProduct.transportation}</p>
                    <p><strong>Date de création:</strong> {new Date(recyclableProduct.createdAt).toLocaleDateString()}</p>
                    <p><strong>Date de mise à jour:</strong> {   new Date(recyclableProduct.updatedAt).toLocaleDateString()}</p>
                    <p><strong>Types de plastique:</strong> 
                        {recyclableProduct.plasticTypes.map((type, index) => (
                            <span key={index}>{type.sigleFr}{index !== recyclableProduct.plasticTypes.length - 1 ? ', ' : ''}</span>
                        ))}
                    </p>
                    <p><strong>Couleurs de plastique:</strong> 
                        {recyclableProduct.plasticColors.map((color, index) => (
                            <span key={index}>{color.name}{index !== recyclableProduct.plasticColors.length - 1 ? ', ' : ''}</span>
                        ))}
                    </p>
                </div>
            )}
        </div>
    );
}

export default AdminRecyclableProductDetails;
