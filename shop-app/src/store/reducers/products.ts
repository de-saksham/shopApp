import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utility";
import { State, initApp, storeCategory, storeProducts, addToCart } from '../types/types';

const initialState: State = {
    isLoading: true,
    isSuccess: false,
    totalPages: 0,
    currentPage: 1,
    activeCategory: 'VEGETABLES',
    products: [],
    isCartEmpty: true,
    isModalActive: false,
    cart: {
        cartId: '',
        products: [],
    }
};

const init = (state: State, action: initApp) => {
    return updateObject(state, {
        isLoading: !action.isSuccess,
        totalPages: action.totalPages,
        isSuccess: action.isSuccess,
    })
};

const isLoading = (state: State) => {
    return updateObject(state, {
        isLoading: true,
    })
};

const updateCategory = (state: State, action: storeCategory) => {
    return updateObject(state, {
        category: action.category
    })
};

const updateProducts = (state: State, action: storeProducts) => {
    return updateObject(state, {
        products: action.products
    })
};

const updateCart = (state: State, action: addToCart) => {
    return updateObject(state, {
        cart: updateObject(state.cart, action.cart)
    })
};

const reducer = (state: State = initialState, action: any) => {
    switch(action.type) {
        case actionTypes.INIT:
            return init(state, action);
        case actionTypes.IS_LOADING:
            return isLoading(state);    
        case actionTypes.STORE_CATEGORY:
            return updateCategory(state, action);
        case actionTypes.STORE_PRODUCTS:
            return updateProducts(state, action);
        case actionTypes.ADD_TO_CART:
            return updateCart(state, action); 
        default: return state;
    }
};

export default reducer;