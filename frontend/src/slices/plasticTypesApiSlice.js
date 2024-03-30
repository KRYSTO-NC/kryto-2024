import { PLASTICTYPES_URL, UPLOAD_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const plasticTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlasticTypes: builder.query({
      query: () => ({
        url: PLASTICTYPES_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['PlasticType'],
    }),
    getPlasticType: builder.query({
      query: (plasticTypeId) => ({
        url: `${PLASTICTYPES_URL}/${plasticTypeId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPlasticType: builder.mutation({
      query: () => ({
        url: `${PLASTICTYPES_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['PlasticType'],
    }),
    updatePlasticType: builder.mutation({
      query: (data) => ({
        url: `${PLASTICTYPES_URL}/${data.plasticTypeId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PlasticType'],
    }),
    uploadPlasticTypeImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    // uploadProductImage: builder.mutation({
    //   query: (data) => ({
    //     url: `/api/upload`,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    deletePlasticType: builder.mutation({
      query: (plasticTypeId) => ({
        url: `${PLASTICTYPES_URL}/${plasticTypeId}`,
        method: 'DELETE',
      }),
      providesTags: ['PlasticType'],
    }),
  }),
})

export const {
  useGetPlasticTypesQuery,
  useGetPlasticTypeQuery,
  useCreatePlasticTypeMutation,
  useUploadPlasticTypeImageMutation,
  useUpdatePlasticTypeMutation,
  useDeletePlasticTypeMutation,
  // useUploadProductImageMutation,
} = plasticTypesApiSlice
