import { TypeOfExpression } from 'typescript';
import * as actionTypes from '../actions/actionTypes';
import { CartProducts, Product } from './types';

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
    product: Product;
    quantity: number;
    variant: string;
};

export interface UpdateCurrentPage {
    type: typeof actionTypes.UPDATE_CURRENT_PAGE;
    currentPage: number;
}

export interface IsModalActive {
    type: typeof actionTypes.IS_MODAL_ACTIVE;
}

export interface OrderStatus {
    type: typeof actionTypes.ORDER_STATUS;
    orderStatus: boolean;
}

export type ProductsActionTypes = 
    | Init
    | IsLoading
    | StoreCategory
    | StoreProducts
    | AddToCart
    | UpdateCurrentPage
    | IsModalActive
    | OrderStatus;

export type ProductAction = ProductsActionTypes;
