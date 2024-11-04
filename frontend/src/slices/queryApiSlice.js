import { apiSlice } from './apiSlice';
const QUERY_URL = '/api/query'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQueries: builder.mutation({
      query: () => ({
        url: `${QUERY_URL}/query`,
        method: 'GET',
      }),
    }),
    createQuery: builder.mutation({
      query: (data) => ({
        url: `${QUERY_URL}/query`,
        method: 'POST',
        body: data,
      }),
    }),
    approveQuery: builder.mutation({
      query: (data) => ({
        url: `${QUERY_URL}/query/${data.id}/approve`,
        method: 'PUT',
      }),
    }),
    updateQuery: builder.mutation({
        query: (data) => ({
          url: `${QUERY_URL}/query/${data.id}/update`,
          method: 'PUT',
          body: data
        }),
      }),
  }),
});

export const {
  useGetQueriesMutation,
  useCreateQueryMutation,
  useApproveQueryMutation,
  useUpdateQueryMutation,
} = authApiSlice;
