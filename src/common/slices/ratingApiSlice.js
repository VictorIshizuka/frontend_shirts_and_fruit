import { apiSlice } from "./apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createRating: builder.mutation({
      query: rating => ({
        url: "/api/ratings",
        method: "POST",
        body: rating,
      }),
      invalidatesTags: ["Rating"],
    }),
    getRatingByUserAndProduct: builder.query({
      query: productId => `/api/ratings/user/${productId}`,
      providesTags: ["Rating"],
    }),
  }),
});

export const { useCreateRatingMutation, useGetRatingByUserAndProductQuery } =
  categoryApiSlice;
