import React from 'react';
import { useGetPlasticTypeQuery } from '../../../slices/plasticTypesApiSlice';
import { useParams } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AdminPlasticTypeDetails = () => {
  const { id: plasticTypeId } = useParams();
  const { data: plasticType, error, isLoading } = useGetPlasticTypeQuery(
    plasticTypeId,
  );

  console.log(plasticType);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.data.message}</div>}
      {plasticType && (
        <div className="container">
          <h1>{plasticType.data.scientificNameFr}</h1>
          <p>{plasticType.data.description}</p>

          <table className="table">
            <tbody>
              <tr>
                <th>Nom scientifique</th>
                <td>{plasticType.data.scientificNameFr}</td>
              </tr>
              <tr>
                <th>Sigle (FR)</th>
                <td>{plasticType.data.sigleFr}</td>
              </tr>
              <tr>
                <th>Sigle (EN)</th>
                <td>{plasticType.data.sigleEn}</td>
              </tr>
              <tr>
                <th>Température d'injection</th>
                <td>{plasticType.data.injectionTemperature}</td>
              </tr>
              <tr>
                <th>Densité</th>
                <td>{plasticType.data.density}</td>
              </tr>
              <tr>
                <th>Point de fusion</th>
                <td>{plasticType.data.meltingPoint}</td>
              </tr>
              <tr>
                <th>Résistance à la chaleur</th>
                <td>{plasticType.data.heatResistance}</td>
              </tr>
              <tr>
                <th>Résistance chimique</th>
                <td>{plasticType.data.chemicalResistance}</td>
              </tr>
              <tr>
                <th>Rigidité</th>
                <td>{plasticType.data.rigidity}</td>
              </tr>
              <tr>
                <th>Toxicité</th>
                <td>{plasticType.data.toxicity}</td>
              </tr>
              <tr>
                <th>Impact environnemental</th>
                <td>{plasticType.data.environmentalImpact}</td>
              </tr>
            </tbody>
          </table>

          <div className="div">
            <h2>Caractéristiques de flottabilité</h2>

            <table className="table">
              <thead>
                <tr>
                  <th>Alcool</th>
                  <th>Glycérine</th>
                  <th>Huile végétale</th>
                  <th>Eau</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {plasticType.data.flotability.alcohol ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {plasticType.data.flotability.glycerine ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {plasticType.data.flotability.vegetableOil ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {plasticType.data.flotability.water ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlasticTypeDetails;
