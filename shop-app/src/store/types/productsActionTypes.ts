import * as actionTypes from '../actions/actionTypes';
import { Cart, Product } from './types';

export interface Init {
    type: typeof actionTypes.INIT;
    isSuccess: boolean;
    totalPages: number;
};

export interface IsLoading {
    type: typeof actionTypes.IS_LOADING;
}

export interface StoreCategory {
    type: typeof actionTypes.STORE_CATEGORY;
    category: string;
};

export interface StoreProducts {
    type: typeof actionTypes.STORE_PRODUCTS;
    products: Product[];
};

export interface AddToCart {
    type: typeof actionTypes.ADD_TO_CART;
    cart: Cart;
};

export type ProductsActionTypes = 
    | Init
    | IsLoading
    | StoreCategory
    | StoreProducts
    | AddToCart;

export type ProductAction = ProductsActionTypes;
