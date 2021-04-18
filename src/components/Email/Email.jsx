import React from 'react';
import './Email.scss';

function Email() {
    return (
        <div className="email-section">
            <div className="container">
                <h5>New To Shop?</h5>
                <p>Subscribe to our newsletter to get updates on our lates offers!</p>
                <div className="email-form">
                    <div className="email-field">
                        <input type="text" placeholder="Email Address" />
                    </div>
                    <div>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Email;
