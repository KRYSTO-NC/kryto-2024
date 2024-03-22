import { DOLIBAR_URL } from '../../constants'
import { apiSlice } from '../apiSlice'
import { DOLIBARR_API_KEY } from '../../constants'

export const dolliContactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: `${DOLIBAR_URL}/contacts&limit=100`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getContactsByTiersId: builder.query({
      query: (tierId) => ({
        url: ` https://crm.krysto.nc/api/index.php/contacts?sortfield=t.rowid&sortorder=ASC&limit=100&thirdparty_ids=${tierId}`,

        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getContactDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/contacts/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetContactsQuery,
  useGetContactsByTiersIdQuery,
  useGetContactDetailsQuery,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliContactApiSlice
