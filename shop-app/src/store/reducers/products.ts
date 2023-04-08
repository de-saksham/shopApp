import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utility";
import { State, initApp, storeCategory, storeProducts, addToCart, currentPage, orderStatus } from '../types/types';

const initialState: State = {
    isLoading: true,
    isSuccess: false,
    totalPages: 0,
    currentPage: 1,
    activeCategory: 'VEGETABLES',
    products: [],
    isCartEmpty: true,
    isModalActive: false,
    cart: [],
    orderStatus: false,   
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
        activeCategory: action.category,
        orderStatus: false,
    })
};

const updateProducts = (state: State, action: storeProducts) => {
    return updateObject(state, {
        products: action.products
    })
};

const updateCart = (state: State, action: addToCart) => {
    const { cart } = state;
    const { product, quantity, variant } = action;

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);

    if (existingProductIndex !== -1) {
     // If the product already exists, update its quantity
        const updatedCart = cart.map((item, index) => {
            if (index === existingProductIndex) {
                console.log('var', variant);
                const newQuantity = variant === 'inc' ? item.quantity + 1 : variant === 'dec' ? item.quantity - 1 : item.quantity + quantity;
                if(newQuantity === 0) {
                    // If the new quantity is 0, remove the item from the cart
                    return null;
                } else {
                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }    
                
            }
            return item;
        }).filter(Boolean); // Filter out the null items
            return {
                ...state,
                cart: updatedCart,
            };
        } else {
            // If the product does not exist, add it to the cart
            return {
            ...state,
            cart: [...cart, { ...product, quantity }],
            }
    }
};

const updateCurrentPage = (state: State, action: currentPage) => {
    return updateObject(state, {
        currentPage: action.currentPage,
    });
};

const isModalActive = (state: State) => {
    return updateObject(state, {
        isModalActive: !state.isModalActive,
        orderStatus: false,
    });
};

const statusOrder = (state: State, action: orderStatus) => {
    if(action.orderStatus) {
        return updateObject(state, {
            orderStatus: true,
            cart: []
        });
    } else {
        return updateObject(state, {
            orderStatus: false
        });
    }
}

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
        case actionTypes.UPDATE_CURRENT_PAGE:
            return updateCurrentPage(state, action);
        case actionTypes.IS_MODAL_ACTIVE:
            return isModalActive(state);
        case actionTypes.ORDER_STATUS:
            return statusOrder(state, action);                
        default: return state;
    }
};

export default reducer;
