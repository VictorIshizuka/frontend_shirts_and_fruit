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
    addProduct: builder.mutation({
      query: params => ({
        url: "/api/products",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: params => ({
        url: `/api/products/${params.id}`,
        method: "PUT",
        body: params.body,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: id => ({ url: `/api/products/${id}`, method: "DELETE" }),
    }),
    invalidatesTags: ["Product"],
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
