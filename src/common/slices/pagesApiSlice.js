import { apiSlice } from "./apiSlice";

const pagesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPages: builder.query({
      query: () => "/api/pages",
      providesTags: ["Page"],
    }),
    getPage: builder.query({
      query: slug => `/api/pages/${slug}`,
      providesTags: ["Page"],
    }),
    reorderPages: builder.mutation({
      query: pages => ({
        url: "/api/pages/reorder",
        method: "POST",
        body: pages,
      }),
      invalidatesTags: ["Page"],
    }),
  }),
});

export const { useGetPagesQuery, useGetPageQuery, useReorderPagesMutation } =
  pagesApiSlice;
