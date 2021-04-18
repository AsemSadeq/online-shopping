import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { toggleProductWishList, changeProductQuantity, removeFormCart, clearCart } from '../../redux/action';
import { renderNumber, getKeyByValue } from '../../services/services';
import './Cart.scss';

function Cart() {
    const cart = useSelector(state => state.cart);
    const wishList = useSelector(state => state.wishlist);
    const dispatch = useDispatch();
    const usedCurrency = useSelector(state => state.usedCurrency);
    const rates = useSelector(state => state.exchangeRates.rates);
    const currencySymbols = useSelector(state => state.currencySymbols);
    const currentSymbol = getKeyByValue(currencySymbols, usedCurrency.symbol);
    const rate = rates[currentSymbol];
    const Total = cart.length === 1 ? (cart[0].price * cart[0].quantity) : cart.reduce((total, product) => total + (Math.round(product.price) * product.quantity), 0);
    const renderQuantityOption = (quantity) => {
        let options = [];
        for (let index = 1; index <= quantity; index++) {
            options.push(<option key={index}>{index}</option>)
        }
        return options;
    }

    return (
        <div className="container">
            <div className="cart-container">
                {!cart.length ?
                    <h5 className="empty-cart">
                        {`Your cart is empty. `}<NavLink to="/all" className="fill-link">Please fill it up.</NavLink>
                    </h5> :
                    <div className="products-cart-container">
                        {cart.map(product => (
                            <div className="product-cart-list" key={product.id}>
                                <div className="product-cart-img">
                                    <img src={require(`../../assets/images/${product.img}`).default} alt="" />
                                </div>
                                <div className="product-cart-info">
                                    <h6 className="product-cart-category">{`Sold by: ${product.vendor.name}`}</h6>
                                    <h5 className="product-cart-name">{product.name}</h5>
                                    <span
                                        onClick={() => dispatch(toggleProductWishList(product.id))}
                                        className={`favorite-label ${wishList.find(ele => ele === product.id) ? 'wished' : ''}`}><FaHeart />
                                    </span>
                                </div>
                                <div className="product-cart-info-price">
                                    <h6 className="product-cart-price">{`${usedCurrency.symbol} ${renderNumber(Math.round(product.price * rate))}`}</h6>
                                    <select
                                        onChange={(e) => dispatch(changeProductQuantity({ ...product, quantity: parseInt(e.target.value) }, parseInt(e.target.value)))}
                                        value={product.quantity}>
                                        {renderQuantityOption(product.avaQuantity)}
                                    </select>
                                    <h6 className="product-cart-price">{`Total ${usedCurrency.symbol} ${renderNumber(Math.round(product.price * rate) * product.quantity)}`}</h6>
                                    <button className="remove-btn" onClick={(e) => dispatch(removeFormCart(product))}>Remove</button>
                                </div>
                            </div>
                        ))}
                        <div className="total-price">
                            <div>{`Total`}</div> <div>{`${usedCurrency.symbol} ${renderNumber(Math.round(Total * rate))}`}</div>
                        </div>
                        <div className="cart-actions">
                            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
                            <NavLink to="/all" className="continue-link">Continue shopping</NavLink>
                            <NavLink to="/checkout" className="checkout-link">Checkout</NavLink>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Cart
