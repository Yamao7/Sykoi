import React, { useState, useEffect } from "react";
import '../categories.css'
import initialFoodData from "../../../../foodimage";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, decreaseCart, removeCartItem } from "../../../cart/cartslice";

function SelfPamper(){
    const dispatch = useDispatch();
    const history = useHistory();

    const [foodItems, setFoodItems] = useState(initialFoodData);

    let Food2 = foodItems.filter((ele) => ele.titlename === 'SelfPamper')

    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        setFoodItems(initialFoodData);
    }, []);

    function prevImage(){
        let box=document.querySelector('.itali-card-image')
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
    }
    function nextImage(){
        let box=document.querySelector('.itali-card-image')
        let width=box.clientWidth;
        box.scrollLeft=box.scrollLeft+width;
    }
    function detailed(id){
        history.push(`/singledish?id=${id}`)
    }
    function Alldish(titleId){
        history.push(`/alldish?id=${titleId}`)
    }
    function AddtoCart(ele){
        const cartItem = cart.cartItems.find(item => item.id === ele.id);
        const currentQuantityInCart = cartItem ? cartItem.cartQuantity : 0;

        const itemInState = foodItems.find(item => item.id === ele.id);
        const actualStock = itemInState ? itemInState.stock : 0;

        if (actualStock !== undefined && actualStock <= currentQuantityInCart) {
            alert("Cannot add more of this item. Out of stock!");
            return;
        }

        setFoodItems(prevFoodItems =>
            prevFoodItems.map(item =>
                item.id === ele.id
                    ? { ...item, stock: item.stock - 1 }
                    : item
            )
        );
        
        dispatch(addTocart(ele));
    }
    function order(){
        history.push('/cart')
    }
    return(
        <div className="indi-css">
            <h3>Self-Pamper</h3>
            <div className="main-image">
                
                <button className="leftImageArrowStyles" onClick={()=>prevImage()}> ❰❰ </button>

                <button className="rightImageArrowStyles" onClick={()=>nextImage()}> ❱❱</button>
                <div className="itali-card-image" >
                    {
                        Food2.map((ele)=>{
                            const itemInState = foodItems.find(item => item.id === ele.id);
                            const actualStock = itemInState ? itemInState.stock : 0;

                            const cartItem = cart.cartItems.find(item => item.id === ele.id);
                            const currentQuantityInCart = cartItem ? cartItem.cartQuantity : 0;

                            const availableStock = actualStock !== undefined ? actualStock - currentQuantityInCart : Infinity;
                            
                            const isOutOfStock = availableStock <= 0;
                            const isLowStock = availableStock > 0 && availableStock <= 3;

                            return (
                                <div key={ele.id} className='Perslide'>
                                    <img src={ele.url} alt={ele.title} onClick={()=>detailed(ele.id)}></img>

                                    <p>{ele.title} {ele.quantity}</p>

                                    <span style={{display:'block'}}>₱{ele.rate}</span>
                                    {actualStock !== undefined && (
                                        <p style={{ fontSize: '0.8em', margin: '5px 0' }}>
                                            Stock: {availableStock} {availableStock > 0 ? '' : '(Out of Stock)'}
                                            {isLowStock && <span style={{ color: 'orange', marginLeft: '5px' }}>(Low!)</span>}
                                        </p>
                                    )}
                                    <button className="slide-cart-button" onClick={order}>Order</button>
                                    {'  '}
                                    <button className="slide-cart-button" onClick={()=>AddtoCart(ele)} disabled={isOutOfStock}>
                                        {isOutOfStock ? 'Out of Stock' : '+Add to Cart'}
                                    </button>
                                </div>
                            );
                        })
                    }
                    {Food2.length > 0 && (
                        <button onClick={()=>Alldish(Food2[0].titleId) } className='imsa' >See more</button>
                    )}
                </div>
            </div>
        </div>
    )
}
export default SelfPamper