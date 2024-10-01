import { apiSlice } from "./apiSlice";

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addOrder: builder.mutation({
      query: order => ({ url: "/api/orders", body: order, method: "POST" }),
      invalidatesTags: ["Order"],
    }),
    getUserOrders: builder.query({
      query: () => "/api/orders/profile",
      providesTags: ["Order"],
    }),
  }),
});

export const { useAddOrderMutation, useGetUserOrdersQuery } = ordersApiSlice;
