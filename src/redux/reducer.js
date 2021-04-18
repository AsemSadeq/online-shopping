import { data } from '../data/data';
import {
    TOGGLE_NAV,
    CURRENCY,
    ADD_TO_CART,
    PRICE_RANGE,
    TOGGLE_WISHES,
    UPDATE_PRODUCT_QUANTITY,
    REMOVE_FORM_CART,
    CLEAR_CART
} from './actionTypes';
const initialState = {
    ...data,
    toggleNav: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_NAV: return {
            ...state,
            toggleNav: !state.toggleNav
        }
        case CURRENCY: return {
            ...state,
            usedCurrency: action.data,
        }
        case PRICE_RANGE: return {
            ...state,
            priceFilter: {
                ...state.priceFilter,
                pricerange: action.price
            }
        }
        case ADD_TO_CART:
            if (state.cart.filter(ele => ele.id === action.product.id).length) {
                return {
                    ...state,
                    cartTotal: state.cartTotal + action.cartTotal,
                    cart: state.cart.map(product => product.id === action.product.id ?
                        { ...product, quantity: (product.quantity + action.product.quantity) } : product)
                }
            }
            else
                return {
                    ...state,
                    cartTotal: state.cartTotal + action.cartTotal,
                    cart: state.cart.concat(action.product)
                }
        case UPDATE_PRODUCT_QUANTITY:
            const prevQuantity = state.cart.filter(ele => ele.id === action.product.id)[0].quantity;
            return {
                ...state,
                cartTotal: state.cartTotal + action.cartTotal - prevQuantity,
                cart: state.cart.map(product => product.id === action.product.id ?
                    { ...product, quantity: action.product.quantity } : product)
            }

        case REMOVE_FORM_CART:
            return {
                ...state,
                cartTotal: state.cartTotal - action.product.quantity,
                cart: state.cart.filter(product => product.id !== action.product.id)
            }
        case CLEAR_CART: {
            return {
                ...state,
                cartTotal: 0,
                cart: []
            }
        }
        case TOGGLE_WISHES: return {
            ...state,
            wishlist: state.wishlist.includes(action.productId) ?
                state.wishlist.filter(ele => ele !== action.productId) :
                [...state.wishlist, action.productId]
        }
        default: return state;
    }
}


export default reducer;