import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetPlasticTypeQuery, useUpdatePlasticTypeMutation, useUploadPlasticTypeImageMutation } from '../../../slices/plasticTypesApiSlice';
import { FaTimes } from 'react-icons/fa';

const AdminPlasticTypeEdit = () => {
  const { id: plasticTypeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);

  const { data: plasticType, isLoading, error, refetch } = useGetPlasticTypeQuery(plasticTypeId);
  const [updatePlasticType] = useUpdatePlasticTypeMutation();
  const [uploadPlasticTypeImage] = useUploadPlasticTypeImageMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
      const res = await uploadPlasticTypeImage(formData).unwrap();
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
      await updatePlasticType({ ...formData, images: imagesArray });
      toast.success('Le type de plastique a été mis à jour avec succès');
      refetch();
      navigate('/admin/plastic-types');
    } catch (error) {
      toast.error(
        error.message ||
          'Une erreur est survenue lors de la mise à jour du type de plastique'
      );
    } finally {
      setLoadingUpdate(false);
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (plasticType) {
      setFormData(plasticType);
      setImagesArray(plasticType.images || []);
    }
  }, [plasticType]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='container'>
      <h2>Edit Plastic Type</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label>SigleFr:</label>
        <input
          type='text'
          name='sigleFr'
          value={formData.sigleFr || ''}
          onChange={handleInputChange}
        />

        <label>SigleEn:</label>
        <input
          type='text'
          name='sigleEn'
          value={formData.sigleEn || ''}
          onChange={handleInputChange}
        />

        <label>Scientific Name Fr:</label>
        <input
          type='text'
          name='scientificNameFr'
          value={formData.scientificNameFr || ''}
          onChange={handleInputChange}
        />

        <label>Scientific Name En:</label>
        <input
          type='text'
          name='scientificNameEn'
          value={formData.scientificNameEn || ''}
          onChange={handleInputChange}
        />

        <label>Description:</label>
        <input
          type='text'
          name='description'
          value={formData.description || ''}
          onChange={handleInputChange}
        />

        <label>Injection Temperature:</label>
        <input
          type='text'
          name='injectionTemperature'
          value={formData.injectionTemperature || ''}
          onChange={handleInputChange}
        />

        <label>Density:</label>
        <input
          type='number'
          name='density'
          value={formData.density || ''}
          onChange={handleInputChange}
        />

        <label>Melting Point:</label>
        <input
          type='number'
          name='meltingPoint'
          value={formData.meltingPoint || ''}
          onChange={handleInputChange}
        />

        <label>Heat Resistance:</label>
        <input
          type='text'
          name='heatResistance'
          value={formData.heatResistance || ''}
          onChange={handleInputChange}
        />

        <label>Chemical Resistance:</label>
        <input
          type='text'
          name='chemicalResistance'
          value={formData.chemicalResistance || ''}
          onChange={handleInputChange}
        />

        <label>Rigidity:</label>
        <input
          type='text'
          name='rigidity'
          value={formData.rigidity || ''}
          onChange={handleInputChange}
        />

        <label>Toxicity:</label>
        <input
          type='text'
          name='toxicity'
          value={formData.toxicity || ''}
          onChange={handleInputChange}
        />

        <label>Environmental Impact:</label>
        <input
          type='text'
          name='environmentalImpact'
          value={formData.environmentalImpact || ''}
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

export default AdminPlasticTypeEdit;
