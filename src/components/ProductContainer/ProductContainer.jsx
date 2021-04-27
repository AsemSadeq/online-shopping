import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrency, changePriceRange } from '../../redux/action'
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ProductList from '../ProductList/ProductList';
import './ProductContainer.scss';
import { renderNumber, getKeyByValue } from '../../services/services';

function Product() {
    const dispatch = useDispatch();
    const promoCode = useSelector(state => state.promoCode);
    const currencySymbols = useSelector(state => state.currencySymbols);
    const priceFilter = useSelector(state => state.priceFilter);
    const rates = useSelector(state => state.exchangeRates.rates);
    const usedCurrency = useSelector(state => state.usedCurrency);
    const currentSymbol = useMemo(() => getKeyByValue(currencySymbols, usedCurrency.symbol), [usedCurrency, currencySymbols]);
    const rate = rates[currentSymbol];

    const convertCurrency = (e) => {
        const value = e.target.value;
        const symbol = currencySymbols[value];
        const rate = rates[value];
        dispatch(changeCurrency({ [value]: rate, symbol }));
    }

    return (
        <div>
            <Breadcrumb />
            <div className="container">
                <div className="product-container">
                    <div className="discount-conatiner">
                        <div className="discount-block">
                            <h5>Greate Discount!</h5>
                            <p className="discount-description">
                                Use the following promo codes to get amazing discounts
                            </p>
                            <div>
                                {promoCode.map((promo, index) => {
                                    return (
                                        <div key={index} className="promo-block">
                                            <div className="code">{promo.code}</div>
                                            <div className="percent">{promo.percentage}%</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="converter-block">
                                <h5>Convert Currency</h5>
                                <select className="convert-select"
                                    onChange={(e) => convertCurrency(e)} value={currentSymbol}>
                                    {Object.keys(currencySymbols).map(symbol => {
                                        return (
                                            <option value={symbol} key={symbol}>{symbol}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="filter-block">
                            <h5>Filter by Price</h5>
                            <div className="max-price">Max-Price : {`${usedCurrency.symbol} `}{renderNumber(Math.round(priceFilter.pricerange * rate))}</div>
                            <input
                                id="volume"
                                name="volume"
                                step="1"
                                type="range"
                                min={priceFilter.min}
                                max={priceFilter.max}
                                value={priceFilter.pricerange}
                                onChange={(e) => dispatch(changePriceRange(e.target.value))} />
                            <div className="price-range">
                                <div>{`${usedCurrency.symbol} ${renderNumber(Math.round(priceFilter.min * rate))}`}</div>
                                <div>{`${usedCurrency.symbol} ${renderNumber(Math.round(priceFilter.max * rate))}`}</div>
                            </div>
                        </div>
                    </div>
                    <ProductList />
                </div>
            </div>
        </div>
    )
}

export default Product
