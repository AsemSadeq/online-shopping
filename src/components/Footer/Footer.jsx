import React from 'react';
import './Footer.scss';

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer-content">
                    <div>
                        <h5>About </h5>
                        <ul className="unlist">
                            <li>Company</li>
                            <li>Location</li>
                            <li>Contacts</li>
                            <li>Opening Hours</li>
                        </ul>
                    </div>
                    <div>
                        <h5> Useful links</h5>
                        <ul className="unlist">
                            <li>Help</li>
                            <li>Privcy Policy</li>
                            <li>Terms and Conditions</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <h5> Customer Servie</h5>
                        <ul className="unlist">
                            <li>Payment Methods</li>
                            <li>Money-back</li>
                            <li>Returns</li>
                            <li>Shipping</li>
                        </ul>
                    </div>
                    <div>
                        <h5> Join Us</h5>
                        <ul className="unlist">
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                            <li>linkedin</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
