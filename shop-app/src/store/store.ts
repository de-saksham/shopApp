import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import { productApi } from "../controllers/productController";
import ProductReducer from './reducers/products';

const reducer = combineReducers({
    ProductReducer,
});

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        reducer
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(productApi.middleware)
});
