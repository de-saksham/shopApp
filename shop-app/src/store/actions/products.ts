import { ProductAction } from '../types/productsActionTypes';
import { Cart, Product } from '../types/types';
import * as actionTypes from './actionTypes';

export const init = (isSuccess: boolean, totalPages: number): ProductAction => ({
    type: actionTypes.INIT,
    isSuccess: isSuccess,
    totalPages: totalPages,
});

export const isLoading = () => ({
    type: actionTypes.IS_LOADING
});

export const storeCategory = (category: string) => ({
    type: actionTypes.STORE_CATEGORY,
    category: category
});

export const storeProducts = (products: Product[]) => ({
    type: actionTypes.STORE_PRODUCTS,
    products: products
});

export const addToCart = (cart: Cart) => ({
    type: actionTypes.ADD_TO_CART,
    cart: cart
});