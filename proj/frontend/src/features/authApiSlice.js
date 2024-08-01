import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
