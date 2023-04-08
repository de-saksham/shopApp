import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { order } from "../store/types/types";

const apiEndpoint = 'http://localhost:3000';
const headers = {
    'Content-Type': 'application/json',
}

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiEndpoint, headers }),
    endpoints: (builder) => ({
        placeOrder: builder.query({
            query: (order: order) => ({
                url: '/v1/addOrder',
                method: 'POST',
                body: JSON.stringify(order),
            }),
        }),
    }),
});

export const {
    usePlaceOrderQuery,
    useLazyPlaceOrderQuery
} = orderApi;