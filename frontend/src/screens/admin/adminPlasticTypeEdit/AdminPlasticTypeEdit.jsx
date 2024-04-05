import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  useGetPlasticTypeQuery,
  useUpdatePlasticTypeMutation,
  useUploadPlasticTypeImageMutation,
} from '../../../slices/plasticTypesApiSlice'
import { FaTimes } from 'react-icons/fa'

const AdminPlasticTypeEdit = () => {
  const { id: plasticTypeId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [imageFiles, setImageFiles] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])

  const {
    data: plasticType,
    isLoading: isLoadingPlasticType,
    error: errorPlasticType,
    refetch,
  } = useGetPlasticTypeQuery(plasticTypeId)

  const [updatePlasticType] = useUpdatePlasticTypeMutation()
  const [uploadPlasticTypeImage] = useUploadPlasticTypeImageMutation()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles([...imageFiles, ...files])
    const newImages = files.map((file) => URL.createObjectURL(file))
    setUploadedImages([...uploadedImages, ...newImages])
  }
  const handleRemoveImage = (index) => {
    const newImagesArray = [...uploadedImages]
    newImagesArray.splice(index, 1)
    setUploadedImages(newImagesArray)

    const newFilesArray = [...imageFiles]
    newFilesArray.splice(index, 1)
    setImageFiles(newFilesArray)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingUpdate(true)

    try {
      const updatedData = { ...formData }
      if (imageFiles.length > 0) {
        const formData = new FormData()
        imageFiles.forEach((file) => formData.append('images', file))
        const res = await uploadPlasticTypeImage(formData).unwrap()
        if (res && res.images) {
          updatedData.images = res.images
        }
      }

      await updatePlasticType({ plasticTypeId, ...updatedData })
      setFormData({})
      toast.success('Le type de plastique a été mis à jour avec succès')
      refetch()
      navigate('/admin/plastic-types')
    } catch (error) {
      toast.error(
        error.message ||
          'Une erreur est survenue lors de la mise à jour du type de plastique',
      )
    } finally {
      setLoadingUpdate(false)
    }
  }
  const handleFlotabilityChange = (e, type) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        flotability: {
          ...formData.data.flotability,
          [type]: checked,
        },
      },
    })
  }

  useEffect(() => {
    if (plasticType) {
      setFormData(plasticType)
      setUploadedImages(plasticType.images || [])
    }
  }, [plasticType])

  if (isLoadingPlasticType) {
    return <div>Loading...</div>
  }

  if (errorPlasticType) {
    return <div>Error: {errorPlasticType.message}</div>
  }

  return (
    <div className="container">
      <h2>Edit Plastic Type</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Sigle (FR):</label>
        <input
          type="text"
          name="sigleFr"
          value={(formData.data && formData.data.sigleFr) || ''}
          onChange={handleInputChange}
        />

        <label>Sigle (EN):</label>
        <input
          type="text"
          name="sigleEn"
          value={(formData.data && formData.data.sigleEn) || ''}
          onChange={handleInputChange}
        />

        <label>Scientific Name (FR):</label>
        <input
          type="text"
          name="scientificNameFr"
          value={(formData.data && formData.data.scientificNameFr) || ''}
          onChange={handleInputChange}
        />

        <label>Scientific Name (EN):</label>
        <input
          type="text"
          name="scientificNameEn"
          value={(formData.data && formData.data.scientificNameEn) || ''}
          onChange={handleInputChange}
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={(formData.data && formData.data.description) || ''}
          onChange={handleInputChange}
        />

        <label>Flotability:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="alcohol"
              checked={
                (formData.data && formData.data.flotability.alcohol) || false
              }
              onChange={(e) => handleFlotabilityChange(e, 'alcohol')}
            />
            Alcohol
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="vegetableOil"
              checked={
                (formData.data && formData.data.flotability.vegetableOil) ||
                false
              }
              onChange={(e) => handleFlotabilityChange(e, 'vegetableOil')}
            />
            Vegetable Oil
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="water"
              checked={
                (formData.data && formData.data.flotability.water) || false
              }
              onChange={(e) => handleFlotabilityChange(e, 'water')}
            />
            Water
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="glycerine"
              checked={
                (formData.data && formData.data.flotability.glycerine) || false
              }
              onChange={(e) => handleFlotabilityChange(e, 'glycerine')}
            />
            Glycerine
          </label>
        </div>
        <label>Injection Temperature:</label>
        <input
          type="text"
          name="injectionTemperature"
          value={(formData.data && formData.data.injectionTemperature) || ''}
          onChange={handleInputChange}
        />

        <label>Density:</label>
        <input
          type="number"
          name="density"
          value={(formData.data && formData.data.density) || ''}
          onChange={handleInputChange}
        />

        <label>Melting Point:</label>
        <input
          type="number"
          name="meltingPoint"
          value={(formData.data && formData.data.meltingPoint) || ''}
          onChange={handleInputChange}
        />

        <label>Heat Resistance:</label>
        <input
          type="text"
          name="heatResistance"
          value={(formData.data && formData.data.heatResistance) || ''}
          onChange={handleInputChange}
        />

        <label>Chemical Resistance:</label>
        <input
          type="text"
          name="chemicalResistance"
          value={(formData.data && formData.data.chemicalResistance) || ''}
          onChange={handleInputChange}
        />

        <label>Rigidity:</label>
        <input
          type="text"
          name="rigidity"
          value={(formData.data && formData.data.rigidity) || ''}
          onChange={handleInputChange}
        />

        <label>Toxicity:</label>
        <input
          type="text"
          name="toxicity"
          value={(formData.data && formData.data.toxicity) || ''}
          onChange={handleInputChange}
        />

        <label>Environmental Impact:</label>
        <input
          type="text"
          name="environmentalImpact"
          value={(formData.data && formData.data.environmentalImpact) || ''}
          onChange={handleInputChange}
        />

        <div className="form-group">
          <label htmlFor="images">Images:</label>
          {uploadedImages.map((image, index) => (
            <div key={index} className="image-input">
              <img src={image} alt={`Uploaded ${index + 1}`} />
              <button
                className="btn"
                type="button"
                onClick={() => handleRemoveImage(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            disabled={loadingUpdate}
          />
          {loadingUpdate && <p>Loading...</p>}
        </div>

        <button className="btn" type="submit" disabled={loadingUpdate}>
          {loadingUpdate ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export default AdminPlasticTypeEdit
