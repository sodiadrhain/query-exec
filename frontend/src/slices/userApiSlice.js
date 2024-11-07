import { apiSlice } from "./apiSlice"
const USER_URL = "/api/user"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
})

export const { useFetchUserMutation, useUpdateUserMutation } = userApiSlice
