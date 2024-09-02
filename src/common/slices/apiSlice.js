import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ url: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Page", "Category"],
  endpoints: () => ({}),
});
