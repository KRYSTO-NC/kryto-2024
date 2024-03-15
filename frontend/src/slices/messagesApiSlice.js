import { MESSAGES_URL } from '../constants' // Assurez-vous d'avoir la bonne URL pour les messages
import { apiSlice } from './apiSlice'

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: MESSAGES_URL,
      }),
      providesTags: ['Message'],
      keepUnusedDataFor: 5,
    }),

    getMessageDetails: builder.query({
      query: (id) => ({
        url: `${MESSAGES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createMessage: builder.mutation({
      query: (data) => ({
        url: MESSAGES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Message'],
    }),

    updateMessage: builder.mutation({
      query: (data) => ({
        url: `${MESSAGES_URL}/${data.messageId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Message'],
    }),

    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `${MESSAGES_URL}/${messageId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useGetMessageDetailsQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApiSlice
