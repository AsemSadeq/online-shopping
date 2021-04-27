import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/action';
import { getKeyByValue, renderNumber } from '../../services/services'
import './Checkout.scss';

function Checkout(props) {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const cartTotal = useSelector(state => state.cartTotal);
    const deliveryOptions = useSelector(state => state.deliveryOptions);
    const usedCurrency = useSelector(state => state.usedCurrency);
    const rates = useSelector(state => state.exchangeRates.rates);
    const currencySymbols = useSelector(state => state.currencySymbols);
    const currentSymbol = useMemo(() => getKeyByValue(currencySymbols, usedCurrency.symbol), [currencySymbols, usedCurrency]);
    const rate = rates[currentSymbol];
    const Total = cart.length === 1 ? (cart[0].price * cart[0].quantity) : cart.reduce((total, product) => total + (Math.round(product.price) * product.quantity), 0);
    const [shippingAmount, setShippingAmount] = useState(deliveryOptions[0].cost);
    const [isOpen, setIsOpen] = useState(false);
    const [formInputs, setformInputs] = useState({
        errors: {}, values: {
            firstName: '',
            lastName: '',
            email: ''
        }
    });
    useEffect(() => {
        if (!cart.length) {
            props.history.goBack();
        }
    })

    const handelOption = (e) => {
        setShippingAmount(parseInt(e.target.value));
    }

    const handelFormInput = async (e) => {
        const checkInput = checkValidInput(e);
        setformInputs(state => { return ({ ...state, errors: { ...state.errors, [`${e.target.name}ErrorMessage`]: checkInput }, values: { ...state.values, [e.target.name]: e.target.value } }) });
    }

    const checkValidInput = (e) => {
        if (e.target.name === 'email') {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value) ? '' : 'please Enter Valid Email';
        }
        return /^[a-zA-Z]*$/g.test(e.target.value) && e.target.value ? '' : 'Please Enter Valid';
    }

    const handelSubmitForm = (e) => {
        e.preventDefault();
        document.body.classList.add('open-modal');
        setIsOpen(true);
    }

    const closeModal = () => {
        document.body.classList.remove('open-modal');
        setIsOpen(false);
        dispatch(clearCart());
    }


    return (
        <div className="container">
            <div className="checkout-container">
                <div className="bill-info">
                    <h3>Billing Information</h3>
                    <form className="checkout-form" autoComplete="off" onSubmit={(e) => handelSubmitForm(e)}>
                        <div className="name-section">
                            <div>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={formInputs.values.firstName}
                                    onChange={(e) => handelFormInput(e)}
                                    className={`${formInputs.errors?.firstNameErrorMessage ? 'error-input' : ''}`}
                                />
                                {formInputs.errors?.firstNameErrorMessage && <span className="error-msg">{`${formInputs.errors.firstNameErrorMessage} First Name`}</span>}
                            </div>
                            <div>
                                <label >Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formInputs.values.lastName}
                                    onChange={(e) => handelFormInput(e)}
                                    className={`${formInputs.errors?.lastNameErrorMessage ? 'error-input' : ''}`}
                                />
                                {formInputs.errors?.lastNameErrorMessage && <span className="error-msg">{`${formInputs.errors.lastNameErrorMessage} Last Name`}</span>}
                            </div>
                        </div>
                        <div className="email-secton">
                            <label >Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formInputs.values.email}
                                onChange={(e) => handelFormInput(e)}
                                className={`${formInputs.errors?.emailErrorMessage ? 'error-input' : ''}`}
                            />
                            {formInputs.errors?.emailErrorMessage && <span className="error-msg">{`${formInputs.errors.emailErrorMessage}`}</span>}
                        </div>
                        <div className="delivery-options">
                            <h3>Delivery Options</h3>
                            {deliveryOptions.map(option => (
                                <div className="delivery-option" key={option.id}>
                                    <input
                                        type="radio"
                                        name="deliveryOption"
                                        checked={shippingAmount === option.cost}
                                        value={option.cost}
                                        id={`delivery-option${option.id}`}
                                        onChange={(e) => handelOption(e)} />
                                    <label className="delivery-radio" htmlFor={`delivery-option${option.id}`}>
                                        <div className="option-name">{option.name}</div>
                                        <div>{option.duration}</div>
                                        <div>{`${usedCurrency.symbol} ${renderNumber(Math.round(option.cost * rate))}`}</div>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="confirm-section">
                            <button type="submit"
                                disabled={!(Object.values(formInputs.errors).every(ele => ele === '') && Object.values(formInputs.values).every(ele => ele !== ''))}
                            >Confirm Order </button>
                        </div>
                    </form>
                </div>
                <div className="order-review">
                    <div className="order-review-title">
                        <span>Order Review</span>
                        <span className="total-num">{cartTotal}</span>
                    </div>
                    <div className="checkout-products">
                        {cart.map(product => (
                            <div className="product-checkout-item" key={product.id}>
                                <div className="checkout-product-img">
                                    <img src={require(`../../assets/images/${product.img}`).default} alt={product.name} />
                                </div>
                                <div className="checkout-product-info">
                                    <div className="checkout-product-name">{product.name}</div>
                                    <div className="checkout-product-price">{`${usedCurrency.symbol} ${renderNumber(Math.round(product.price * rate))}`}</div>
                                    <small className="checkout-product-quantity"><span className="text-muted">Qty : </span> {product.quantity}</small>
                                </div>
                            </div>
                        ))}
                        <div className="sub-total">
                            <div>SubTotal</div>
                            <div className="price-num">{`${usedCurrency.symbol} ${renderNumber(Math.round(Total * rate))}`}</div>
                        </div>
                        <div className="sub-total">
                            <div>Shipping amount</div>
                            <div className="price-num">{`${usedCurrency.symbol} ${renderNumber(Math.round(shippingAmount * rate))}`}</div>
                        </div>
                    </div>
                    <div className="all-total">
                        <div>Total</div>
                        <div className="price-num">{`${usedCurrency.symbol} ${renderNumber(Math.round((shippingAmount + Total) * rate))}`}</div>
                    </div>
                </div>
            </div>
            <div className={`checkout-modal ${isOpen ? 'show' : 'hide'}`}>
                <div className='checkout-modal-content'>
                    <div className="success-msg">
                        <p>You've successfully Ordered</p>
                        <p>Your order is successful. Thank you for shopping with us.</p>
                        <button className="close-btn" onClick={() => closeModal()}>
                            <svg class="fs-icon fs-icon--close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path transform="rotate(45.001 10 10)" d="M2 9h16v2H2z"></path><path transform="rotate(134.999 10 10)" d="M2 9h16v2H2z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
