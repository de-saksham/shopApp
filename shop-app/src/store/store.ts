import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import { productApi } from "../controllers/productController";
import { orderApi } from "../controllers/orderController";
import ProductReducer, { initialState } from './reducers/products';

const reducer = combineReducers({
    ProductReducer,
});

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        reducer
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat([productApi.middleware, orderApi.middleware])
});
