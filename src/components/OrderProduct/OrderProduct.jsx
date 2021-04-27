import React, { useState, useMemo } from 'react';
import './OrderProduct.scss';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getKeyByValue, renderNumber, checkQuantity } from '../../services/services';
import { FaAward, FaPlane, FaShippingFast, FaWarehouse } from 'react-icons/fa';
import Rating from '../Rating/Rating';
import ProdutSale from '../ProductSale/ProductSale';
import { addProductToCart } from '../../redux/action';


function OrderProduct() {

    const dispatch = useDispatch();
    const { productId } = useParams();
    const product = useSelector(state => state.products).filter(product => product.slug === productId)[0];
    const cartItems = useSelector(state => state.cart);
    const usedCurrency = useSelector(state => state.usedCurrency);
    const currencySymbols = useSelector(state => state.currencySymbols);
    const rates = useSelector(state => state.exchangeRates.rates);
    const currentSymbol = useMemo(() => getKeyByValue(currencySymbols, usedCurrency.symbol), [currencySymbols, usedCurrency]);
    const rate = rates[currentSymbol];
    const quantityInCart = useMemo(() => checkQuantity(cartItems, product.id), [cartItems, product]);
    const [quantity, setQuantity] = useState(quantityInCart === product.quantity ? 0 : 1);

    const handleQuantity = (e) => {
        e.target.name === 'increment' ? setQuantity(quantity + 1) : setQuantity(quantity - 1)
    }

    const handleAddToCart = () => {
        setQuantity((quantityInCart + quantity) === product.quantity ? 0 : 1);
        dispatch(addProductToCart({ ...product, avaQuantity: product.quantity, quantity }, quantity));
    }

    return (
        <div className="container">
            <div className="product-order">
                <div className="product-img">
                    <img src={require(`../../assets/images/${product.img}`).default} alt={`${product.name}`} />
                </div>
                <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="order-block"><span className="text-muted">Sold By :</span> <span className="product-vendor">{product.vendor.name}</span></div>
                    <div className="order-block"><Rating rate={product.ratings.star_ratings} /><span className="vote-number">({product.ratings.votes})</span></div>
                    <div className="order-block price-block">
                        <span className="current-price">{`${usedCurrency.symbol}  ${renderNumber(Math.round(product.price * rate))}`}</span>
                        <span className="text-muted prev-price">{`${usedCurrency.symbol} ${renderNumber(Math.round(product.discount_price * rate))}`}</span>
                        <span className="discount-percent">{100 - Math.round((product.price / product.discount_price) * 100)}%</span>
                    </div>
                    <div className="order-block">
                        <span className="text-muted feature-text">Features:</span>
                        <span className="ship-list">
                            {product.duka_approved &&
                                <span className="ship-type">
                                    <FaAward />
                                    <span className="text-muted ship-feature">Duka Aproved</span>
                                </span>
                            }{product.fulfilled_by_duka &&
                                <span className="ship-type" title='Fullfiled By Duka'>
                                    <FaWarehouse />
                                    <span className="text-muted ship-feature">Fullfiled By Duka</span>
                                </span>
                            }
                            {product.shipped_from_abroad ? (
                                <span className="ship-type" title='International Shipping'><FaPlane />
                                    <span className="text-muted ship-feature">Shipped From Abroad</span>
                                </span>)
                                : (<span className="ship-type" title="Local Shippping">
                                    <FaShippingFast />
                                    <span className="text-muted ship-feature">Local Shippping</span>
                                </span>)
                            }
                        </span>
                    </div>
                    <div className="order-block">
                        <span className="text-muted feature-text">Colors:</span>
                        <span className="feature-color" style={{ backgroundColor: product.color }}>{product.color}</span>
                    </div>
                    <div className="order-block">
                        <span className="text-muted feature-text">Quantity:</span>
                        <span className="quantity">
                            <button
                                name="decrement"
                                disabled={quantity === 0}
                                onClick={(e) => handleQuantity(e)}
                            >-</button>
                            <input type="text" name="quantity" value={quantity} />
                            <button
                                onClick={(e) => handleQuantity(e)}
                                name="increment"
                                disabled={quantity === (product.quantity - quantityInCart)}
                            >+</button>
                        </span>
                    </div>
                    <div className="add-to-cart">
                        <button
                            onClick={() => handleAddToCart()}
                            disabled={quantity === 0}
                        >Add To Cart</button>
                    </div>
                </div>
            </div>
            <ProdutSale currentProduct={productId} />
        </div>
    )
}

export default OrderProduct
