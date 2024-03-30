import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'
import { DOLIBAR_URL } from '../constants'
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })
const doliBaseQuery = fetchBaseQuery({ baseUrl: DOLIBAR_URL })

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    'Product',
    'User',
    'FavoriteProduct',
    'Message',
    'SubCategory',
    'Category',
    'Contact',
    'PlasticType',
    'RecyclableProduct',
    'PlasticColor',
  ],
  endpoints: (builder) => ({}),
})

export const dolibarrApiSlice = createApi({
  doliBaseQuery,
  tagTypes: ['DolliProduct'],
  endpoints: (builder) => ({}),
})
