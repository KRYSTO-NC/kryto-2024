import { PLASTICCOLORS_URL } from '../constants' // Assurez-vous d'avoir la bonne URL pour les messages
import { apiSlice } from './apiSlice'

export const plasticColorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlasticColors: builder.query({
      query: () => ({
        url: PLASTICCOLORS_URL,
      }),
      providesTags: ['PlasticColor'],
      keepUnusedDataFor: 5,
    }),

    getPlasticColor: builder.query({
      query: (id) => ({
        url: `${PLASTICCOLORS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createPlasticColor: builder.mutation({
      query: (data) => ({
        url: PLASTICCOLORS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PlasticColor'],
    }),

    updatePlasticColor: builder.mutation({
      query: (data) => ({
        url: `${PLASTICCOLORS_URL}/${data.messageId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PlasticColor'],
    }),

    deletePlasticColor: builder.mutation({
      query: (plasticColorId) => ({
        url: `${PLASTICCOLORS_URL}/${plasticColorId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetPlasticColorsQuery,
  useGetPlasticColorQuery,
  useCreatePlasticColorMutation,
  useUpdatePlasticColorMutation,
  useDeletePlasticColorMutation,
} = plasticColorsApiSlice
