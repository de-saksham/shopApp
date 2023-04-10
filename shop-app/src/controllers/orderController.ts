import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { order } from "../store/types/types";
import * as dotenv from 'dotenv'
dotenv.config()

// test env
const apiEndpoint = `${process.env.REACT_APP_NODE_SERVER}:3000`;
// // local env
// const apiEndpoint = 'http://localhost:3000';
const headers = {
    'Content-Type': 'application/json',
}

interface apiSchema {
    orders: order[],
    loading: boolean;
    error: string | null,
}

const initialStateApi: apiSchema = {
    orders: [],
    loading: false,
    error: null,
};

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