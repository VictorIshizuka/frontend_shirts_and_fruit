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
  }),
});

export const { useGetPagesQuery, useGetPageQuery } = pagesApiSlice;
