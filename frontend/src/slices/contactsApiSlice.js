import { CONTACTS_URL } from '../constants' // Assurez-vous d'avoir la bonne URL pour les contacts
import { apiSlice } from './apiSlice'

export const contactsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppContacts: builder.query({
      query: () => ({
        url: CONTACTS_URL,
      }),
      providesTags: ['Contact'],
      keepUnusedDataFor: 5,
    }),

    getAppContactDetails: builder.query({
      query: (id) => ({
        url: `${CONTACTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createContact: builder.mutation({
      query: (data) => ({
        url: CONTACTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),

    updateAppContact: builder.mutation({
      query: (data) => ({
        url: `${CONTACTS_URL}/${data.contactId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),

    deleteAppContact: builder.mutation({
      query: (contactId) => ({
        url: `${CONTACTS_URL}/${contactId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAppContactsQuery,
  useGetAppContactDetailsQuery,
  useCreateContactMutation,
  useUpdateAppContactMutation,
  useDeleteAppContactMutation,
} = contactsApiSlice
