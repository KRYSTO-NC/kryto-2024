import React from 'react'

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { useDeleteUsersMutation, useGetUsersQuery } from '../../../slices/userApiSlice';


const AdminUsersList = () => {

    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  console.log(users);
    const [deleteUser] = useDeleteUsersMutation();
  
    const deleteHandler = async (id) => {
      if (window.confirm('Are you sure')) {
        try {
          await deleteUser(id);
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };

  return (
    <div className='container'>
    <div>
      <h1>Utilisateurs ({users?.length})</h1>
    </div>
  

   

    {isLoading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>Error: {error.data.message}</div>
    ) : (
      <>
        <table className='table'>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
        
              <th>Administrateur</th>
             

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
             
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
  {user.isAdmin ? (
    <FaCheck style={{ color: 'green' }} />
  ) : (
    <FaTimes style={{ color: 'red' }} />
  )}
</td>
              
                
                <td>
                  <Link to={`/admin/user-edit/${user._id}`}>
                    <FaEdit />
                  </Link>
                  <button onClick={() => deleteHandler(user._id)}>
                    <FaTrash style={{ color: 'red' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </>
    )}
  </div>
);
}

export default AdminUsersList