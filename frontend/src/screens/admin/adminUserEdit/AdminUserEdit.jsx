import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../../components/shared/loader/Loader';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../../slices/userApiSlice';
import { toast } from 'react-toastify';

const AdminUserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, isError, refetch } = useGetUserDetailsQuery(id);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const [updateUserRole, { isLoading: updateMutationLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setIsAdmin(user?.isAdmin || false);
  }, [user]);

  const handleUpdateRole = async () => {
    try {
      setLoadingUpdate(true);
      await updateUserRole({
        userId: id,
        isAdmin,
      });

      toast.success("Le rôle de l'utilisateur a été mis à jour avec succès");
      refetch();
      navigate(`/admin/user-edit/${id}`);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error(error?.data?.message || error.error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className='page-container'>
      {loadingUpdate && <p>Loading...</p>}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error: {isError?.data?.message}</div>
      ) : (
        <div>
          <div className="heading">
            <h1>{user.name}</h1>
            <p>Utilisateur créé le {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <h2>Modifier le rôle de l'utilisateur</h2>
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              Admin
            </label>
            <button
            className='btn btn-primary'
              type="button"
              onClick={handleUpdateRole}
              disabled={loadingUpdate}
            >
              Mettre à jour le rôle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserEdit;
