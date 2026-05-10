import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import '../categories/categories.css';
import { useDispatch, useSelector } from "react-redux";
import { addTocart, getTotals } from "../../cart/cartslice";

function Singledish() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [detail, setDetail] = useState({});

    const cart = useSelector((state) => state.cart);

    const query = new URLSearchParams(location.search);

    useEffect(() => {
        const allDishes = window.Food || [];

        let data = allDishes.filter((ele) => ele.id == query.get('id'));

        if (data.length > 0) {
            setDetail(data[0]);
        } else {
            history.replace('/home');
        }
    }, [query, history]);

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const cartItem = cart.cartItems.find(item => item.id === detail.id);
    const currentQuantityInCart = cartItem ? cartItem.cartQuantity : 0;
    const availableStock = detail.stock !== undefined ? detail.stock - currentQuantityInCart : Infinity;

    const isOutOfStock = availableStock <= 0;
    const isLowStock = availableStock > 0 && availableStock <= 3;

    function AddtoCart(item) {
        if (item.stock !== undefined && item.stock <= currentQuantityInCart) {
            alert("Cannot add more of this item. Out of stock!");
            return;
        }
        dispatch(addTocart(item));
    }

    function order() {
        history.push('/cart');
    }

    if (!detail.id) {
        return (
            <div className="sfp-bg">
                <Header />
                <div className="sfp-main">
                    <p style={{textAlign: 'center', color: 'red'}}>Dish not found or loading...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <div className="sfp-bg">
                <Header />
                <div className="sfp-main">
                    <div className="sfp-first">
                        <img src={detail.url} alt={detail.title}></img><br />
                    </div>
                    <div className="spf-second">
                        <h1>{detail.title}</h1>
                        <h3>[{detail.quantity}]</h3>
                        <br />
                        <h1>₹{detail.rate}</h1>
                        {detail.stock !== undefined && (
                            <p>
                                Stock: {availableStock} {availableStock > 0 ? '' : '(Out of Stock)'}
                                {isLowStock && <span style={{ color: 'orange', marginLeft: '10px' }}>(Low Stock!)</span>}
                            </p>
                        )}
                        <p><span>Description:</span><br />{detail.description}</p>
                        <div><span>Available Only At :</span><p>9am to 9pm</p></div>
                        <br />
                        <button onClick={() => AddtoCart(detail)} disabled={isOutOfStock}>
                            {isOutOfStock ? 'Out of Stock' : '+ Add to Cart'}
                        </button>
                        <button style={{ marginLeft: '20px' }} onClick={order}>Order</button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Singledish;