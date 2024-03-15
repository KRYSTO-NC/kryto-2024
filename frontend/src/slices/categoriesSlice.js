import { CATEGORIES_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Category'],
    }),
    getCategoryDetails: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createCategory: builder.mutation({
      query: () => ({
        url: `${CATEGORIES_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/${data.categoryId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    // uploadProductImage: builder.mutation({
    //   query: (data) => ({
    //     url: `/api/upload`,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    deleteCatyegory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: 'DELETE',
      }),
      providesTags: ['Category'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryDetailsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  // useUploadProductImageMutation,
} = categoriesApiSlice
