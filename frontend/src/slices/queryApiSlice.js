import { apiSlice } from "./apiSlice"
const QUERY_URL = "/api/query"

export const queryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQueries: builder.mutation({
      query: (data) => ({
        url: `${QUERY_URL}`,
        method: "GET",
        params: { ...data, limit: 100 },
      }),
    }),
    createQuery: builder.mutation({
      query: (data) => ({
        url: `${QUERY_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    approveQuery: builder.mutation({
      query: (data) => ({
        url: `${QUERY_URL}/${data._id}/approve`,
        method: "PUT",
      }),
    }),
    updateQuery: builder.mutation({
      query: (data) => ({
        url: `${QUERY_URL}/${data._id}/update`,
        method: "PUT",
        body: data,
      }),
    }),
    runQuery: builder.mutation({
      query: (data) => ({
        url: `${QUERY_URL}/${data._id}/run`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useGetQueriesMutation,
  useCreateQueryMutation,
  useApproveQueryMutation,
  useUpdateQueryMutation,
  useRunQueryMutation,
} = queryApiSlice
