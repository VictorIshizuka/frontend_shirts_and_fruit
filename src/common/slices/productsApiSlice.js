import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: category => `/api/products/categories/${category}`,
      providesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: id => `/api/products/${id}`,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApiSlice;
