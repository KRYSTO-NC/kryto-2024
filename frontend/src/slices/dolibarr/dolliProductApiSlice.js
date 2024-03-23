import { DOLIBAR_URL } from '../../constants'
import { DOLIBARR_API_KEY } from '../../constants'
import { apiSlice } from '../apiSlice'

export const dolliProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDolliProducts: builder.query({
      query: (category) => {
        let params = ''
        if (category) {
          params = `category=${category}`
        }
        // Ajoutez le paramètre "sqlfilters" pour filtrer les articles à vendre
        params += params ? '&' : ''
        params += 'sqlfilters=(t.tosell:=:1)'

        return {
          url: `${DOLIBAR_URL}/products?${params}&limit=100&mode=1`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),

    getDolliProductCategories: builder.query({
      query: (id) => ({
        // Ajoutez "variant_filter" comme paramètre ici.
        url: `${DOLIBAR_URL}/products/${id}/categories`,
        headers: {
          'Content-Type': 'application/json',
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getDolliProductDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/products/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getDolliProductDocuments: builder.query({
      query: (id) => ({
        url: ` https://crm.krysto.nc/api/index.php/documents?modulepart=product&id=${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),

    getDolliProductStock: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/products/${id}/stock`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetDolliProductsQuery,
  useGetDolliProductCategoriesQuery,
  useGetDolliProductDetailsQuery,
  useGetDolliProductStockQuery,
  useGetDolliProductDocumentsQuery,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliProductApiSlice
