import React, { useMemo } from 'react';
import './ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaHeart, FaAward, FaPlane, FaShippingFast, FaWarehouse } from 'react-icons/fa';
import { renderNumber, getKeyByValue } from '../../services/services';
import Rating from '../Rating/Rating';
import { toggleProductWishList } from '../../redux/action';

function ProductCard({ product }) {

    const dispatch = useDispatch();
    const usedCurrency = useSelector(state => state.usedCurrency);
    const currencySymbols = useSelector(state => state.currencySymbols);
    const rates = useSelector(state => state.exchangeRates.rates);
    const currentSymbol = useMemo(() => getKeyByValue(currencySymbols, usedCurrency.symbol), [currencySymbols, usedCurrency]);
    const rate = rates[currentSymbol];
    const wishList = useSelector(state => state.wishlist);

    return (
        <div className="product-card">
            <div className="card-img">
                {product.sale && <span className="sale-label">Sale</span>}
                <img src={require(`../../assets/images/${product.img}`).default} alt={product.name} />
                <span className={`favorite-label ${wishList.find(ele => ele === product.id) ? 'wished' : ''}`}
                    onClick={() => dispatch(toggleProductWishList(product.id))}
                >
                    <FaHeart />
                </span>
                <span className="discount-label">{100 - Math.round((product.price / product.discount_price) * 100)}%</span>
            </div>
            <div className="card-info">
                <h2 className="vendor">{product.vendor.name}</h2>
                <div className="product-name">{product.name}</div>
                <div className="vote-container">
                    <Rating rate={product.ratings.star_ratings} />
                    <span className="vote-number">({` ${product.ratings.votes} `})</span>
                </div>
                <div className="price-block">
                    <span className="price-label">{`${usedCurrency.symbol} ${renderNumber(Math.round(product.price * rate))}`}</span>
                    <span className="discount-price">{`${usedCurrency.symbol} ${renderNumber(Math.round(product.discount_price * rate))}`}</span>
                </div>
                <div className="ship-block">
                    {product.duka_approved &&
                        <span className="ship-type" title="Duka Approved">
                            <FaAward />
                        </span>
                    }{product.fulfilled_by_duka &&
                        <span className="ship-type" title='Fullfiled By Duka'>
                            <FaWarehouse />
                        </span>
                    }
                    {product.shipped_from_abroad ? (
                        <span className="ship-type" title='International Shipping'>
                            <FaPlane />
                        </span>)
                        : (<span className="ship-type" title="Local Shippping">
                            <FaShippingFast />
                        </span>)
                    }
                </div>
                <NavLink to={`product/${product.slug}`} className="product-btn">
                    View Item
                </NavLink>
            </div>
        </div>
    )
}

export default React.memo(ProductCard);
