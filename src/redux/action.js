import {
    TOGGLE_NAV,
    CURRENCY,
    ADD_TO_CART,
    PRICE_RANGE, TOGGLE_WISHES,
    UPDATE_PRODUCT_QUANTITY,
    REMOVE_FORM_CART,
    CLEAR_CART
} from './actionTypes';

export const toggleNav = () => {
    return {
        type: TOGGLE_NAV
    }
}

export const changeCurrency = (data) => {
    return {
        type: CURRENCY,
        data
    }
}

export const changePriceRange = (price) => {
    return {
        type: PRICE_RANGE,
        price
    }
}

export const addProductToCart = (product, cartTotal) => {
    return {
        type: ADD_TO_CART,
        product,
        cartTotal
    }
}

export const changeProductQuantity = (product, cartTotal) => {
    return {
        type: UPDATE_PRODUCT_QUANTITY,
        product,
        cartTotal
    }
}

export const removeFormCart = (product) => {
    return {
        type: REMOVE_FORM_CART,
        product
    }
}

export const toggleProductWishList = (productId) => {
    return {
        type: TOGGLE_WISHES,
        productId
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}