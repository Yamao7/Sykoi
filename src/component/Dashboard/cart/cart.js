import React, { useState, useEffect } from "react";
import Header from "../header/header";
import '../cart/cart.css'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import { addTocart, clearCartItem, decreaseCart, getTotals, removeCartItem } from "./cartslice";

function Cart() {
    const history = useHistory();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [paymentMode, setPaymentMode] = useState('cashOnDelivery');
    const [deliveryEta, setDeliveryEta] = useState('');

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    useEffect(() => {
        if (cart.cartItems.length > 0) {
            const totalAmount = cart.cartTotalAmount;

            let minTime, maxTime;

            if (totalAmount <= 300) {
                minTime = 20;
                maxTime = 35;
            } else if (totalAmount <= 1000) {
                minTime = 35;
                maxTime = 60;
            } else if (totalAmount <= 2500) {
                minTime = 60;
                maxTime = 90;
            } else {
                minTime = 90;
                maxTime = 120;
            }

            const estimatedMin = Math.round(minTime + Math.random() * (maxTime - minTime) / 4);
            const estimatedMax = Math.round(maxTime + Math.random() * (maxTime - minTime) / 4);

            setDeliveryEta(`${estimatedMin}-${estimatedMax} minutes`);
        } else {
            setDeliveryEta('N/A');
        }
    }, [cart.cartItems, cart.cartTotalAmount]);

    function detail(id) {
        history.push(`/singledish?id=${id}`)
    }

    function remove(ele) {
        dispatch(removeCartItem(ele))
    }

    function decrease(cartitem) {
        dispatch(decreaseCart(cartitem))
    }

    function increase(cartItem) {
        dispatch(addTocart(cartItem))
    }

    function clearcart() {
        dispatch(clearCartItem())
    }

    function order() {
        if (cart.cartItems.length === 0) {
            alert('Your cart is empty. Please add items before placing an order.');
            return;
        }

        alert(`Your order placed successfully!\nMode of Payment: ${paymentModeDisplay(paymentMode)}\nEstimated Delivery: ${deliveryEta}`);
        dispatch(clearCartItem());
    }

    // --- MODIFIED: Helper function to format numbers with commas AND exactly two decimals ---
    const formatPrice = (value) => {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
            return value; // Return original if not a valid number
        }
        // Use toLocaleString with options to force two decimal places
        return numericValue.toLocaleString('en-US', {
            minimumFractionDigits: 2, // Ensure at least two decimal places
            maximumFractionDigits: 2, // Ensure no more than two decimal places
            // You can also add style: 'currency' and currency: 'PHP' here if you want the '₱' symbol
            // like this: style: 'currency', currency: 'PHP'
        });
    };

    const paymentModeDisplay = (mode) => {
        switch (mode) {
            case 'cashOnDelivery':
                return 'Cash on Delivery';
            case 'gcash':
                return 'Gcash';
            case 'bankTransfer':
                return 'Bank Transfer';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="cart-bg">
            <Header />
            <div className="cart">
                <h1 style={{ padding: '10px' }}>Shopping cart</h1>
                {
                    cart.cartItems.length === 0 ? (
                        <div style={{ marginBottom: '165px', padding: '10px' }}>
                            <p>Your cart is currently empty</p>
                        </div>
                    ) : (
                        <div className="cart-main">
                            <div className="cart-main-head">
                                <h3 className="cart-main-head-h3">Product</h3>
                                <h3>Price</h3>
                                <h3>Quantity</h3>
                                <h3>Total</h3>
                            </div>

                            {
                                cart.cartItems?.map(cartItems => (
                                    <div key={cartItems.id} className="cart-main-body">

                                        <div className="cart-main-body-div">
                                            <img src={cartItems.url} alt={cartItems.title} onClick={() => detail(cartItems.id)} />
                                            <div style={{ paddingLeft: '5px' }}>
                                                <h3>{cartItems.title}</h3>
                                                <button onClick={() => remove(cartItems)}>Delete</button>
                                            </div>
                                        </div>

                                        <div className="cart-main-body-div2"><h5>₱{formatPrice(cartItems.rate)}</h5></div>

                                        <div className="quantity">
                                            <button onClick={() => decrease(cartItems)}>-</button>
                                            <span>{cartItems.cartQuantity}</span>
                                            <button onClick={() => increase(cartItems)}>+</button>
                                        </div>

                                        <div className="cart-main-body-div2">
                                            <div style={{ color: 'green', fontSize: '23px' }}>
                                                ₱{formatPrice(cartItems.cartQuantity * parseFloat(cartItems.rate))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            <div className="checkout-details-section" style={{
                                width: '1100px',
                                marginLeft: '10px',
                                marginTop: '20px',
                                padding: '15px',
                                borderTop: '1px solid #ccc',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap'
                            }}>
                                <div className="payment-mode-selection" style={{ marginBottom: '20px' }}>
                                    <h4>Mode of Payment:</h4>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>
                                        <input
                                            type="radio"
                                            name="paymentMode"
                                            value="cashOnDelivery"
                                            checked={paymentMode === 'cashOnDelivery'}
                                            onChange={(e) => setPaymentMode(e.target.value)}
                                        />
                                        Cash on Delivery
                                    </label>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>
                                        <input
                                            type="radio"
                                            name="paymentMode"
                                            value="gcash"
                                            checked={paymentMode === 'gcash'}
                                            onChange={(e) => setPaymentMode(e.target.value)}
                                        />
                                        Gcash
                                    </label>
                                    <label style={{ display: 'block' }}>
                                        <input
                                            type="radio"
                                            name="paymentMode"
                                            value="bankTransfer"
                                            checked={paymentMode === 'bankTransfer'}
                                            onChange={(e) => setPaymentMode(e.target.value)}
                                        />
                                        Bank Transfer
                                    </label>
                                </div>

                                <div className="delivery-eta-display">
                                    <h4>Estimated Delivery:</h4>
                                    <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#007bff' }}>
                                        {deliveryEta}
                                    </p>
                                    <p style={{ fontSize: '0.8em', color: '#555' }}>
                                        (This is an estimate and may vary based on traffic, order volume, or weather.)
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '1100px', marginLeft: '10px', marginTop: '20px' }}>
                                <div>
                                    <button className="clearCart-button" onClick={() => clearcart()}> Clear cart </button>
                                </div>
                                <div>
                                    <p>Subtotal <span style={{ fontSize: '12px' }}>*including all taxes*</span>: <b><span style={{ fontSize: '23px' }}> ₱{formatPrice(cart.cartTotalAmount)}/-</span></b></p>
                                    <button className="Order-button " onClick={order}>Order</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}
export default Cart;