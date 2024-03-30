import { RECYCLABLEPRODUCTS_URL, UPLOAD_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const recyclableProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecyclableProducts: builder.query({
      query: () => ({
        url: `${RECYCLABLEPRODUCTS_URL}`,
      }),
      providesTags: ['RecyclableProduct'],
      keepUnusedDataFor: 5,
    }),

    getRecyclableProductDetails: builder.query({
      query: (id) => ({
        url: `${RECYCLABLEPRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createRecyclableProduct: builder.mutation({
      query: (data) => ({
        url: RECYCLABLEPRODUCTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['RecyclableProduct'],
    }),

    updateRecyclableProduct: builder.mutation({
      query: (data) => ({
        url: `${RECYCLABLEPRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RecyclableProduct'],
    }),
    uploadRecyclabeProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteRecyclableProduct: builder.mutation({
      query: (productId) => ({
        url: `${RECYCLABLEPRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['RecyclableProduct'],
    }),
  }),
})

export const {
  useGetRecyclableProductsQuery,
  useGetRecyclableProductDetailsQuery,
  useCreateRecyclableProductMutation,
  useUpdateRecyclableProductMutation,
  useDeleteRecyclableProductMutation,
  useUploadRecyclabeProductImageMutation,
} = recyclableProductsApiSlice
