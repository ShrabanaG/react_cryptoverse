import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  "X-RapidAPI-Key": "c961491420mshe60dfb3911b139ap182021jsn513342c0f9e7",
  "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
};

const baseUrl = "https://coingecko.p.rapidapi.com/coins";

const createRequest = (url) => ({ url, headers: headers });

export const cryptoHistoryApi = createApi({
  reducerPath: "cryptoHistoryApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(
          `/${coinId}/market_chart?vs_currency=usd&days=${timeperiod}`
        ),
    }),
  }),
});

export const { useGetCryptoHistoryQuery } = cryptoHistoryApi;
