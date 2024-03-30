import React from 'react';
import { useGetPlasticTypesQuery } from '../../../slices/plasticTypesApiSlice';
import { Link } from 'react-router-dom';
import { FaEdit, FaPhotoVideo } from 'react-icons/fa';

const AdminPlasticTypes = () => {
  const { data: plasticTypes, error, isLoading } = useGetPlasticTypesQuery();

  return (
    <div className='container'>
      <h1>Liste des types de plastique</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.data.message}</div>}
      {plasticTypes && (
        <table className='table'>
          <thead>
            <tr>
              <th>nom scientifique</th>
              <th>sigle fr</th>
              <th>sigle en</th>
              <th>temperature injection</th>
              <th>Editer</th>
            </tr>
          </thead>
          <tbody>
            {plasticTypes.data.map((type) => (
              <tr key={type._id}>
                <td>
                    <Link to={`/admin/plastic-type/${type._id}`}> 

                    {type.scientificNameFr}
                    </Link>
                    </td>
                <td>{type.sigleFr}</td>
                <td>{type.sigleEn}</td>
                <td>{type.injectionTemperature}</td>
                <td>
                    
                    <Link to={`/admin/plastic-type/${type._id}/edit`}>
                        
                        <FaEdit/>
                         </Link>
                </td>
                               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPlasticTypes;
