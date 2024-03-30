import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetRecyclableProductDetailsQuery,
  useUpdateRecyclableProductMutation,
  useUploadRecyclabeProductImageMutation,
} from '../../../slices/recyclableProductsApiSlice';
import { useGetPlasticTypesQuery } from '../../../slices/plasticTypesApiSlice';
import { useGetPlasticColorsQuery } from '../../../slices/plasticColorsApiSlice';
import { FaTimes } from 'react-icons/fa';

const AdminRecyclableProductEdit = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [selectedPlasticTypes, setSelectedPlasticTypes] = useState([]);
  const [selectedPlasticColors, setSelectedPlasticColors] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const {
    data: plasticTypes,
    isLoading: isLoadingPlasticTypes,
    error: errorPlasticTypes,
  } = useGetPlasticTypesQuery();
  
  const {
    data: plasticColors,
    isLoading: isLoadingPlasticColors,
    error: errorPlasticColors,
  } = useGetPlasticColorsQuery();

  const {
    data: recyclableProduct,
    isLoading: isLoadingRecyclableProduct,
    error: errorRecyclableProduct,
    refetch,
  } = useGetRecyclableProductDetailsQuery(productId);

  const [updateRecyclableProduct] = useUpdateRecyclableProductMutation();
  const [uploadRecyclableProductImage] = useUploadRecyclabeProductImageMutation();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handlePlasticTypeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedPlasticTypes(selectedOptions);
    setFormData({
      ...formData,
      plasticTypes: selectedOptions,
    });
  };

  const handlePlasticColorChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedPlasticColors(selectedOptions);
    setFormData({
      ...formData,
      plasticColors: selectedOptions,
    });
  };

  const uploadFileHandler = async (e) => {
    if (!e.target.files[0]) {
      toast.error("Aucun fichier sélectionné.");
      return;
    }

    const formData = new FormData();
    formData.append('images', e.target.files[0]);

    try {
      setLoadingUpload(true);
      const res = await uploadRecyclableProductImage(formData).unwrap();
      if (res && res.images && res.images.length > 0) {
        setImagesArray((prevImages) => [...prevImages, ...res.images]);
        toast.success(res.message || "Images téléchargées avec succès");
      } else {
        toast.error("Le téléchargement de l'image a échoué. Veuillez réessayer.");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } finally {
      setLoadingUpload(false);
    }
  };

  const removeImage = (index) => {
    const newImagesArray = [...imagesArray];
    newImagesArray.splice(index, 1);
    setImagesArray(newImagesArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);

    try {
      if (!productId) {
        console.error('productId is undefined:', productId);
        return;
      }

      const updatedFormData = {
        ...formData,
        images: imagesArray,
      };

      await updateRecyclableProduct({ productId, ...updatedFormData });
      setFormData({});
      toast.success('Le produit recyclable a été mis à jour avec succès');
      refetch();
      navigate('/admin/recyclable-products');
    } catch (error) {
      toast.error(
        error.message ||
          'Une erreur est survenue lors de la mise à jour du produit recyclable'
      );
    } finally {
      setLoadingUpdate(false);
    }
  };

  useEffect(() => {
    if (recyclableProduct) {
      setFormData(recyclableProduct);
      setSelectedPlasticTypes(recyclableProduct.plasticTypes || []);
      setSelectedPlasticColors(recyclableProduct.plasticColors || []);
      setImagesArray(recyclableProduct.images || []);
    }
  }, [recyclableProduct]);

  if (isLoadingRecyclableProduct || isLoadingPlasticTypes || isLoadingPlasticColors) {
    return <div>Loading...</div>;
  }

  if (errorRecyclableProduct || errorPlasticTypes || errorPlasticColors) {
    return (
      <div>
        Error: {errorRecyclableProduct?.message || errorPlasticTypes?.message || errorPlasticColors?.message}
      </div>
    );
  }
  return (
    <div className='container'>
      <h2>Edit Recyclable Product</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type='text'
          name='name'
          value={formData.name || ''}
          onChange={handleInputChange}
        />

        <label>Generic Name:</label>
        <input
          type='text'
          name='genericName'
          value={formData.genericName || ''}
          onChange={handleInputChange}
        />
        <label>Catégorie:</label>
        <select
          name='category'
          value={formData.category || ''}
          onChange={handleInputChange}
        >
          <option value='Produits ménagers'>Produits ménagers</option>
          <option value='Soins du corps'>Soins du corps</option>
          <option value='Alimentaires'>Alimentaires</option>
          <option value='Divers'>Divers</option>
        </select>
        <label>Recyclable By Krysto:</label>
        <input
          type='checkbox'
          name='recyclableByKrysto'
          checked={formData.recyclableByKrysto || false}
          onChange={handleInputChange}
        />

        <label>Plastic Types:</label>
        <select
          name='plasticTypes'
          value={selectedPlasticTypes}
          onChange={handlePlasticTypeChange}
          multiple
        >
          {plasticTypes.data.map((type) => (
            <option key={type._id} value={type._id}>
              {type.sigleFr}
            </option>
          ))}
        </select>
        <label>Plastic Colors:</label>
        <select
          name='plasticColors'
          value={selectedPlasticColors}
          onChange={handlePlasticColorChange}
          multiple
        >
          {plasticColors?.map((color) => (
            <option key={color._id} value={color._id}>
              {color.name}
            </option>
          ))}
        </select>




        <label>Description:</label>
        <input
          type='text'
          name='description'
          value={formData.description || ''}
          onChange={handleInputChange}
        />


        <label>Transportation:</label>
        <select
          name='transportation'
          value={formData.transportation || ''}
          onChange={handleInputChange}
        >
          <option value='Fabriquée en Nouvelle-Calédonie'>Fabriquée en Nouvelle-Calédonie</option>
          <option value='Transformée en Nouvelle-Calédonie'>Transformée en Nouvelle-Calédonie</option>
          <option value='Inconnu'>Inconnu</option>
          <option value='Importée'>Importée</option>
        </select>

        <label>Content:</label>
        <input
            type='text'
            name='content'
            value={formData.content || ''}
            onChange={handleInputChange}
        />

        <label>Brand:</label>
        <input
          type='text'
          name='brand'
          value={formData.brand || ''}
          onChange={handleInputChange}
        />

        <label>Barcode:</label>
        <input
          type='text'
          name='barcode'
          value={formData.barcode || ''}
          onChange={handleInputChange}
        />

        <label>Remarque:</label>
        <input
          type='text'
          name='remarque'
          value={formData.remarque || ''}
          onChange={handleInputChange}
        />
 <div className="form-group">
          <label htmlFor="images">Images:</label>
          {imagesArray.map((image, index) => (
            <div key={index} className="image-input">
              <img src={image} alt={`Image ${index + 1}`} />
              <button
                type="button"
                className="btn btn-remove-image"
                onClick={() => removeImage(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
          <input
            type="file"
            accept="image/*"
            onChange={uploadFileHandler}
            disabled={loadingUpload}
          />
          {loadingUpload && <p>Loading...</p>}
        </div>

        <button className="btn" type="submit" disabled={loadingUpdate}>
          {loadingUpdate ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default AdminRecyclableProductEdit;
