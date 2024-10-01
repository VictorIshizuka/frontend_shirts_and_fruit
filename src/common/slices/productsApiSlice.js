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
      query: product => ({
        url: `/api/products/${product.get("id")}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: id => ({ url: `/api/products/${id}`, method: "POST" }),
      invalidatesTags: ["Product"],
    }),
    uploadMultipleImages: builder.mutation({
      query: formaData => {
        return {
          url: `/api/products/multiupload/${formaData.get("id")}`,
          method: "POST",
          body: formaData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    getProductImages: builder.query({
      query: id => `/api/products/images/${id}`,
      providesTags: ["Product"],
    }),
    deleteProductImage: builder.mutation({
      query: data => ({
        url: `/api/products/deleteimage`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useUpdateProductMutation,
  useUploadMultipleImagesMutation,
  useGetProductImagesQuery,
  useDeleteProductImageMutation,
} = productsApiSlice;
