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
    addPage: builder.mutation({
      query: params => ({
        url: "/api/pages",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["Page"],
    }),
    updatePage: builder.mutation({
      query: data => ({
        url: `/api/pages/${data.id}`,
        method: "PUT",
        body: { ...data.body },
      }),
      invalidatesTags: ["Page"],
    }),
    deletePage: builder.mutation({
      query: id => ({
        url: `/api/pages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Page"],
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

export const {
  useGetPagesQuery,
  useGetPageQuery,
  useReorderPagesMutation,
  useAddPageMutation,
  useDeletePageMutation,
  useUpdatePageMutation,
} = pagesApiSlice;
