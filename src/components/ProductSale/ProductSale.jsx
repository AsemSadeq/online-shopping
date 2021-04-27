import React, { useEffect, useMemo } from 'react';
import './ProductSale.scss';
import { NavLink as Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { renderNumber, getKeyByValue } from '../../services/services';

function ProdutSale({ currentProduct }) {
    const saleProducts = useSelector(state => state.products).filter(product => product.sale && product.slug !== currentProduct).slice(0, 4);
    const usedCurrency = useSelector(state => state.usedCurrency);
    const currencySymbols = useSelector(state => state.currencySymbols);
    const rates = useSelector(state => state.exchangeRates.rates);
    const symbol = useMemo(() => getKeyByValue(currencySymbols, usedCurrency.symbol), [usedCurrency, currencySymbols]);
    const rate = rates[symbol];

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentProduct]);

    return (
        <div className="sale-section">
            <div className="sale-header">
                <h4>On Sale</h4>
                <Link to="/sale">See All</Link>
            </div>
            <div className="sale-products">
                {saleProducts.map(product => {
                    return (
                        <div key={product.id} className="sale-card">
                            <img src={require(`../../assets/images/${product.img}`).default} alt="" />
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-price"><span>{usedCurrency.symbol}</span>{renderNumber(Math.round(product.price * rate))}</p>
                            <Link className="view-product" to={`/product/${product.slug}`}>View Item</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default React.memo(ProdutSale);
