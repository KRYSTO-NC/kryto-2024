import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../../slices/productsApiSlice'
import { useGetCategoriesQuery } from '../../../slices/categoriesSlice'


const AdminProductEditScreen = () => {
  const { id: productId } = useParams()
  const { data: categories } = useGetCategoriesQuery()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState(false)

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId)


  const [
    updateProduct,
    { isLoading: updateMutationLoading },
  ] = useUpdateProductMutation()

  const [
    uploadProductImage,
    { isLoading: uploadMutationLoading },
  ] = useUploadProductImageMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [subname, setSubname] = useState('')
  const [refference, setRefference] = useState('')
  const [dolliId, setDolliId] = useState('')
  const [price, setPrice] = useState(0)
  const [imagesArray, setImagesArray] = useState([])

  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')


 
  const [options, setOptions] = useState([{ name: '', value: '' }])

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options]
    newOptions[index][field] = value
    setOptions(newOptions)
  }




  const addOption = () => {
    setOptions([...options, { name: '', value: '' }])
  }

  const removeOption = (index) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoadingUpdate(true)

      await updateProduct({
        productId,
        name,
        refference,
      subname,
        price,
        dolliId,
        images: imagesArray,

        category: selectedCategory,
 
        countInStock,
        description,
        options,

      }).unwrap()

      console.log(updateProduct);

      toast.success('Le produit a été mis à jour avec succès')
      refetch()
      navigate('/admin/products')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    } finally {
      setLoadingUpdate(false)
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('images', e.target.files[0])

    try {
      setLoadingUpload(true)
      const res = await uploadProductImage(formData).unwrap()
      setImagesArray((prevImages) => [...prevImages, ...res.images])
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    } finally {
      setLoadingUpload(false)
    }
  }

  const removeImage = (index) => {
    const newImagesArray = [...imagesArray]
    newImagesArray.splice(index, 1)
    setImagesArray(newImagesArray)
  }

  useEffect(() => {
    setName(product?.name || '')
    setSubname(product?.subname || '')
    setRefference(product?.refference || '')
    setPrice(product?.price || 0)
    setImagesArray(product?.images || [])
    setDolliId(product?.dolliId || '')
  
    setSelectedCategory(product?.category || '')
    setCountInStock(product?.countInStock || 0)
    setDescription(product?.description || '')

    setOptions(product?.options || [])

  }, [product])

  return (
    <>
      <section className='container'>
        {loadingUpdate && <p>Loading...</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div variant="danger">{error.data.message}</div>
        ) : (
          <>
            <div className="heading">
              <h1>Modifier le produit</h1>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="name">Nom:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subname">subname:</label>
                <input
                  type="text"
                  id="subname"
                  placeholder="Enter subname"
                  value={subname}
                  onChange={(e) => setSubname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subname">ID dolibarr:</label>
                <input
                  type="text"
                  id="dolliId"
                  placeholder="Enter dolibarr id"
                  value={dolliId}
                  onChange={(e) => setDolliId(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="refference">refference</label>
                <input
                  type="text"
                  id="refference"
                  placeholder="Entrer la  refference"
                  value={refference}
                  onChange={(e) => setRefference(e.target.value)}
                />
              </div>
             
              <div className="form-group">
                <label htmlFor="price">Prix:</label>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
             
              
            

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
                />
                {loadingUpload && product && <p>Loading...</p>}
              </div>
  

          

           
              <div className="form-group">
                <label htmlFor="countInStock">
                  Nombre d'articles en Stock:
                </label>
                <input
                  type="number"
                  id="countInStock"
                  placeholder="Entrer le nombre d'articles en stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
            
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <h3>Options:</h3>
                {options.map((option, index) => (
                  <div key={index} className="option-input">
                    <label htmlFor={`optionName${index}`}>Titre</label>
                    <input
                      type="text"
                      id={`optionName${index}`}
                      placeholder={`Option ${index + 1} Name`}
                      value={option.name}
                      onChange={(e) =>
                        handleOptionChange(index, 'name', e.target.value)
                      }
                    />
                    <label htmlFor={`optionValue${index}`}>Valeur</label>
                    <input
                      type="text"
                      id={`optionValue${index}`}
                      placeholder={`Option ${index + 1} Value`}
                      value={option.value}
                      onChange={(e) =>
                        handleOptionChange(index, 'value', e.target.value)
                      }
                    />

                    <button
                      type="button"
                      style={{ background: 'red' }}
                      className="btn btn-remove-option btn-sm"
                      onClick={() => removeOption(index)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-add-option"
                  onClick={addOption}
                >
                  Ajouter une option
                </button>
              </div>
            
            

              <button type="submit" className="btn btn-primary btn-block">
                Mettre à jour
              </button>
            </form>
          </>
        )}
      </section>
    </>
  )
}

export default AdminProductEditScreen
