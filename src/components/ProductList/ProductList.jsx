import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.scss';

function ProductList() {
    const pathname = window.location.pathname.replace('/', '');
    const wishes = useSelector(state => state.wishlist);
    const products = useSelector(state => state.products);
    const maxPrice = useSelector(state => state.priceFilter.pricerange);
    const filterProducts =
        pathname === 'all' ? products.filter(product => product.price <= maxPrice) :
            pathname === 'sale' ? products.filter(product => product.sale && product.price <= maxPrice) :
                pathname === "wishes" ? products.filter(product => wishes.includes(product.id)) :
                    products.filter(product => product.category === pathname && product.price <= maxPrice);

    return (
        <div className="product-list">
            <div className="product-number">({` ${filterProducts.length} Products found `})</div>
            {!filterProducts.length ?
                <div className="empty-product">There are currently no products. Please check back later</div> :
                <div className="product-cards">
                    {filterProducts.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            }

        </div>
    )
}

export default ProductList;
