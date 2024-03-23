import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '../../../assets/logo/logo_krysto_couleur.png';
import { useGetDolliProductsQuery } from '../../../slices/dolibarr/dolliProductApiSlice';

const AdminSellBord = () => {
    const navigate = useNavigate();
    const { data: products, refetch, isLoading, error } = useGetDolliProductsQuery();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const handleNewSale = () => {
        navigate('/new-sale');
    };

    const handleProductSelection = (product, quantity) => {
        // Vérifie si le produit est déjà dans la liste des produits sélectionnés
        const existingProductIndex = selectedProducts.findIndex(item => item.id === product.id);
        
        if (existingProductIndex !== -1) {
            // Si le produit existe déjà, mettez à jour sa quantité
            const updatedProducts = [...selectedProducts];
            updatedProducts[existingProductIndex].quantity += quantity;
            setSelectedProducts(updatedProducts);
        } else {
            // Sinon, ajoutez le produit à la liste avec la quantité spécifiée
            setSelectedProducts([...selectedProducts, { ...product, quantity }]);
        }
    
        // Recalcul du prix total
        const newTotalPrice = selectedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(newTotalPrice);
    };

    const handleQuantityChange = (event, index) => {
        const quantity = event.target.value;
        // Vérifiez si la valeur entrée est un nombre
        if (!isNaN(quantity)) {
            // Mettre à jour la quantité du produit à l'index spécifié
            const updatedQuantities = { ...quantities, [index]: quantity };
            setQuantities(updatedQuantities);
            // Recalcul du prix total
            const newTotalPrice = selectedProducts.reduce((acc, item, idx) => {
                const qty = updatedQuantities[idx] || item.quantity || 1;
                return acc + item.price * qty;
            }, 0);
            setTotalPrice(newTotalPrice);
        }
    };
    const generatePDF = () => {
        const doc = new jsPDF(); // Créez un nouveau document PDF
    
        // Ajoutez le logo en haut de la page avec une taille spécifique
        doc.addImage(logo, 'PNG', 10, 20, 70, 30); // Position (10, 20), largeur 190mm, hauteur 60mm
    
        // Ajoutez la date et l'heure du jour à droite, en dessous du logo
        const currentDate = new Date().toLocaleString();
        const dateX = doc.internal.pageSize.getWidth() - doc.getStringUnitWidth(currentDate) * doc.internal.getFontSize() - 10;
        doc.setFontSize(7); // Taille de police plus petite pour la date et l'heure
        doc.text(currentDate, dateX, 55); // Augmenter la hauteur pour laisser de l'espace avec le logo
    
        // Ajoutez votre site internet, adresse e-mail et numéro de téléphone
        const siteInfo = 'www.krysto.nc';
        const emailInfo = 'contact@krysto.nc';
        const phoneInfo = '93.92.53';
        const ridetInfo = 'Numéro de RIDET: 1.515.642';
        doc.setFontSize(10); // Taille de police normale pour les informations de contact
        doc.text(`Site Web: ${siteInfo}`, 10, 80);
        doc.text(`E-mail: ${emailInfo}`, 10, 85);
        doc.text(`Tél: ${phoneInfo}`, 10, 90);
        doc.text(ridetInfo, 10, 95);
    
        // Ajouter le titre "Ticket de caisse"
        doc.setFontSize(12); // Taille de police normale pour le titre
        const titleWidth = doc.getStringUnitWidth('Votre facture') * doc.internal.getFontSize(); // Largeur du titre
        const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2; // Centrage du titre horizontalement
        doc.text('Votre facture', titleX, 110); // Augmentez la position Y pour éviter de chevaucher le logo
    
    
    
        let y = 135; // Position Y initiale pour les détails des produits
        selectedProducts.forEach((product, index) => {
            // Ajouter les détails des produits avec une légère marge à gauche (par exemple, 5mm)
            doc.text(`${index + 1}. ${product.label}`, 15, y); // Nom du produit
            doc.text(`Quantité : ${product.quantity}`, 15, y + 5); // Quantité
            doc.text(`Sous-total : ${product.price * product.quantity} XPF`, 15, y + 10); // Prix total
            
            y += 25; // Ajuster la position Y pour le prochain produit
        });
    
        // Affichage du prix total
        doc.text(`Total : ${totalPrice} XPF`, 10, y + 10); // Utilisez "Sous-total" au lieu de "Prix total"
    
        // Ajouter un message de remerciement
        doc.text('Merci d\'avoir choisi Krysto', 10, y + 20);
    
       // Téléchargement du PDF
       doc.save('ticket_de_caisse.pdf');
    };
    
    
    return (
        <div className='container'>
            <h1>Tableau de bord des ventes</h1>
            <button className='btn btn-primary' onClick={handleNewSale}>Nouvelle vente</button>
            <button className='btn btn-success' onClick={generatePDF}>Générer ticket de caisse</button>
            {isLoading ? (
                <p>Chargement en cours...</p>
            ) : error ? (
                <p>Une erreur est survenue : {error.message}</p>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Prix unitaire</th>
                            <th>Quantité</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{product.label}</td>
                                <td>{product.price} XPF</td>
                                <td>
                                    <input 
                                        type="number" 
                                        min="0" 
                                        value={quantities[index] || ''} 
                                        onChange={(e) => handleQuantityChange(e, index)} 
                                    />
                                </td>
                                <td>
                                    <button className='btn btn-success' onClick={() => handleProductSelection(product, product.quantity || 1)}>Ajouter à la vente</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <h2>Détails de la vente</h2>
            <p>Prix total : {totalPrice} XPF</p>
            <ul>
                {selectedProducts.map(product => (
                    <li key={product.id}>{product.label} - Quantité : {product.quantity} - Prix total : {product.price * product.quantity} XPF</li>
                ))}
            </ul>
        </div>
    );
}

export default AdminSellBord;