import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({ url: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product"],
  endpoints: () => ({}),
});
