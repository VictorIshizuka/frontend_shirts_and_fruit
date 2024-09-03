import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: params => ({
        url: "/api/users/login",
        method: "POST",
        body: params,
        providesTags: ["User"],
      }),
    }),
    register: builder.mutation({
      query: params => ({
        url: "/api/users/register",
        method: "POST",
        body: params,
        providesTags: ["User"],
      }),
    }),
    logout: builder.mutation({
      query: () => ({ url: "/api/users/logout", method: "POST" }),
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  usersApiSlice;
