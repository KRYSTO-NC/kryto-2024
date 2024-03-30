import React from 'react'
import { useGetAppContactsQuery } from '../../../slices/contactsApiSlice';


const AdminContacts = () => {

    const { data: contacts, isLoading, isError } = useGetAppContactsQuery()

    console.log(contacts);
  return (
    <div className='container'>
        <h1>Contacts</h1>

    </div>
  )
}

export default AdminContacts