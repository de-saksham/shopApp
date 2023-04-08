import { BlobOptions } from 'buffer';
import { ProductAction } from '../types/productsActionTypes';
import { Product } from '../types/types';
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

export const addToCart = (product: Product, quantity: number, type: string) => ({
    type: actionTypes.ADD_TO_CART,
    product: product,
    quantity: quantity,
    variant: type
});

export const updateCurrentPage = (currentPage: number) => ({
    type: actionTypes.UPDATE_CURRENT_PAGE,
    currentPage: currentPage,
});

export const isModalActive = () => ({
    type: actionTypes.IS_MODAL_ACTIVE,
});

export const orderStatus = (orderStatus: boolean) => ({
    type: actionTypes.ORDER_STATUS,
    orderStatus: orderStatus,
});