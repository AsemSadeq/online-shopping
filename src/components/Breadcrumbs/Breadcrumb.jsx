import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import './Breadcrumb.scss';

function Breadcrumb() {
    const pathnames = window.location.pathname.split('/');
    const isLast = pathnames.length - 1;
    return (
        <div className="breadcrums">
            <div className="container">
                {pathnames.map((ele, index) => {
                    return (
                        <Link key={index} to={index === 0 ? '/' : `/${ele}`} className={`breadcrum-link ${index === isLast ? 'disable-breadcrum' : ''}`}>
                            {index === 0 ? 'Home' : ele}
                            {index !== isLast && <span className="link-separator">/</span>}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Breadcrumb;
