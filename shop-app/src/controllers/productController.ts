import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// test env
// const apiEndpoint = 'http://13.48.3.137:3000';
// local env
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
                // Add the event name to the meta object of the query
                meta: {
                    invalidateOn: 'itemsUpdated',
                },
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