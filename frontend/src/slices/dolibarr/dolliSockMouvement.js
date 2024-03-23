import { DOLIBAR_URL, DOLIBARR_API_KEY } from '../../constants'
import { apiSlice } from '../apiSlice'

export const dolliStockMovementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStockMovement: builder.query({
      query: () => {
        return {
          url: `${DOLIBAR_URL}/stockmovements?sortfield=t.rowid&sortorder=ASC&limit=200`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),
    addStockMovement: builder.mutation({
      query: ({ productId, warehouseId, qty, type, price }) => ({
        url: `${DOLIBAR_URL}/stockmovements`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
        body: {
          product_id: productId,
          warehouse_id: warehouseId,
          qty: qty,
          type: type, // Inclure le type dans le corps de la requête
          price: price, // Inclure le prix dans le corps de la requête
        },
      }),
    }),
  }),
})

export const {
  useGetStockMovementQuery,
  useAddStockMovementMutation,
} = dolliStockMovementApiSlice
