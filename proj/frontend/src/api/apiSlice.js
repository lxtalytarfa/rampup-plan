import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logout } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// add refresh token logic here

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
