import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTransactionResponse } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/", // Use a rota correta aqui
      providesTags: ["Kpis"],
     
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/", // Use a rota correta aqui
      providesTags: ["Products"]
    }),
    getTransactions: build.query<Array<GetTransactionResponse>, void>({
      query: () => "transaction/transactions/", // Use a rota correta aqui
      providesTags: ["Transactions"]
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;
