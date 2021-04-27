import React, { useEffect } from 'react';
import './Navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { toggleNav } from '../../redux/action';

function Navbar() {
    const navLinks = useSelector(state => state.navbar);
    const isNavOpen = useSelector(state => state.toggleNav);
    const dispatch = useDispatch();
    const cartTotal = useSelector(state => state.cartTotal);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [isNavOpen]);

    return (
        <nav>
            <div className="container">
                <Link to="/" className="logo">SHOP</Link>
                <div className="toggle-bar" onClick={() => dispatch(toggleNav())}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`nav nav-side ${isNavOpen ? 'show' : 'hide'}`}>
                    {navLinks.map(ele => {
                        return (
                            <div className="nav-link" key={ele}>
                                <Link
                                    onClick={() => dispatch(toggleNav())}
                                    to={`/${ele}`}>
                                    {ele}
                                    {ele === 'cart' && <span className="cart-number">{cartTotal}</span>}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}

export default React.memo(Navbar);
