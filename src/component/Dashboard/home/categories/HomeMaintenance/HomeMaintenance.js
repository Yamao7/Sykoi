import React, { useState, useEffect } from "react";
import '../categories.css';
import initialFoodData from "../../../../foodimage"; // Make sure this path is correct!
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../cart/cartslice"; 
import '../../../header/header.css';

function HomeMaintenance() {
    const dispatch = useDispatch();
    const history = useHistory();

    // The component's internal state for displaying stock
    // This state will be derived from initialFoodData and the Redux cart
    const [foodItemsDisplay, setFoodItemsDisplay] = useState([]); // Initialize as empty array

    const cart = useSelector((state) => state.cart);

    // Filter items based on the titlename from the displayed food items
    let Food1 = foodItemsDisplay.filter((ele) => ele.titlename === 'HomeMaintenance');

    // Effect to synchronize foodItemsDisplay whenever the cart changes
    // This calculates available stock based on the *original* data and the *current* cart
    useEffect(() => {
        const updatedFoodDisplay = initialFoodData.map(item => {
            const cartItem = cart.cartItems.find(cartIt => cartIt.id === item.id);
            const quantityInCart = cartItem ? cartItem.cartQuantity : 0;
            // Calculate remaining stock based on original stock and quantity in cart
            const remainingStock = item.stock !== undefined ? item.stock - quantityInCart : Infinity;
            return {
                ...item,
                stock: remainingStock // This 'stock' property in foodItemsDisplay now represents *available* stock
            };
        });
        setFoodItemsDisplay(updatedFoodDisplay);
    }, [cart.cartItems, initialFoodData]); // Dependency: re-run whenever cart items change or initialFoodData (though static)

    function AddtoCart(ele) {
        // Get the original stock from the initialFoodData (our 'master' source)
        const originalItem = initialFoodData.find(item => item.id === ele.id);
        const actualOriginalStock = originalItem ? originalItem.stock : 0;

        // Get how much of this item is currently in the Redux cart
        const cartItem = cart.cartItems.find(item => item.id === ele.id);
        const currentQuantityInCart = cartItem ? cartItem.cartQuantity : 0;

        // Check if adding one more would exceed the original stock
        if (actualOriginalStock !== undefined && (actualOriginalStock <= currentQuantityInCart)) {
            alert("Cannot add more of this item. Out of stock!");
            return;
        }

        // ONLY dispatch the addTocart action.
        // The stock display will update via the useEffect when the cart state changes.
        dispatch(addTocart(ele));
        
        // NO direct setFoodItems calls here to avoid Strict Mode double decrement.
    }

    function prevImage(){
        let box=document.querySelector('.card-image')
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
    }
    function nextImage(){
        let box=document.querySelector('.card-image')
        let width=box.clientWidth;
        box.scrollLeft=box.scrollLeft+width;
    }
    function detail(id){
        history.push(`/singledish?id=${id}`)
    }
    function Alldish(titleId){
        history.push(`/alldish?id=${titleId}`)
    }
    function order(){
        history.push('/cart')
    }
    return(
        <div className="indi-css">
            <h3>Home Maintenance</h3>
            <div className="main-image">
                <button className="leftImageArrowStyles" onClick={()=>prevImage()}> ❰❰</button>
                <button className="rightImageArrowStyles" onClick={()=>nextImage()}> ❱❱</button>
                <div className="card-image" >
                    {  
                        Food1.map((ele)=>{
                            // The 'ele' here is already from foodItemsDisplay, which has the *available* stock
                            const availableStock = ele.stock; 

                            const isOutOfStock = availableStock <= 0;
                            const isLowStock = availableStock > 0 && availableStock <= 3;

                            return (
                                <div key={ele.id} className='Perslide' >
                                    <img src={ele.url} alt={ele.title} onClick={()=>detail(ele.id)}></img>
                                    <p>{ele.title} {ele.quantity}</p>
                                    <span style={{display:'block'}}>₱{ele.rate}</span>
                                    {ele.stock !== undefined && ( 
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
                    {Food1.length > 0 && (
                        <button onClick={()=>Alldish(Food1[0].titleId) } className='imsa' >See more</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomeMaintenance;