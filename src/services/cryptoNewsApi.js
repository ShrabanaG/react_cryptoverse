import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeader = {
    'X-RapidAPI-Key': 'c961491420mshe60dfb3911b139ap182021jsn513342c0f9e7',
    'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
}

const baseUrl = "https://crypto-news16.p.rapidapi.com/news";

const createRequest = (url) => ({ url, headers: cryptoNewsHeader });

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({  baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({  count }) => createRequest(`/top/${count}`),
        }),
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
