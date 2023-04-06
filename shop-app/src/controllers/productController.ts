import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const apiEndpoint = 'http://localhost:3000';
const headers = {
    'Content-Type': 'application/json',
}

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiEndpoint, headers }),
    endpoints: (builder) => ({
        getProductById: builder.query({
            query: (id) => ({
                url: '/v1/itemById',
                method: 'POST',
                body: JSON.stringify(id),
            }),
        }),
        getProductsByCategory: builder.query({
            query: (category) => ({
                url: '/v1/productsByCategory',
                method: 'POST',
                body: JSON.stringify(category),
            }),
        }),
    }),
});

export const {
    useGetProductByIdQuery,
    useGetProductsByCategoryQuery
} = productApi;