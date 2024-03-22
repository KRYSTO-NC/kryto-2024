import { DOLIBAR_URL } from '../../constants'
import { apiSlice } from '../apiSlice'
import { DOLIBARR_API_KEY } from '../../constants'

export const dolliWarehousesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWarehouses: builder.query({
      query: () => ({
        url: `${DOLIBAR_URL}/warehouses?sortfield=t.rowid&sortorder=ASC&limit=100`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),

    getWarehouseDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/warehouses/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetWarehousesQuery,
  useGetWarehouseDetailsQuery,
} = dolliWarehousesApiSlice
