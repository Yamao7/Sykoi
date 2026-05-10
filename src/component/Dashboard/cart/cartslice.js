import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Load cartItems from localStorage, or default to an empty array
    cartItems: localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems")) 
        : [],
    // Corrected typo: cartTotalQuantity (lowercase 'q')
    cartTotalQuantity: 0, 
    // Corrected name: cartTotalAmount (to match how it's used in Cart.js)
    cartTotalAmount: 0, 
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addTocart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
            }
            // Add localStorage persistence
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeCartItem(state, action) {
            state.cartItems = state.cartItems.filter(
                item => item.id !== action.payload.id
            );
            // Add localStorage persistence
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) { // If quantity is 1, remove item
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );
            }
            // Add localStorage persistence
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCartItem(state, action) {
            state.cartItems = [];
            // Add localStorage persistence
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotals(state) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    // Robust parsing to ensure they are numbers
                    const itemPrice = parseFloat(cartItem.rate); 
                    const itemQuantity = Number(cartItem.cartQuantity);

                    // Skip calculation for items with invalid price or quantity
                    if (isNaN(itemPrice) || isNaN(itemQuantity)) {
                        console.warn(`Skipping item ${cartItem.title} (${cartItem.id}) in total calculation due to invalid price or quantity.`);
                        return cartTotal; // Return current total without adding this item
                    }

                    const itemTotal = itemPrice * itemQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += itemQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            // Assign to the corrected state property names
            state.cartTotalAmount = parseFloat(total.toFixed(2)); // Format to 2 decimal places for currency
            state.cartTotalQuantity = quantity; // Corrected typo
        },
    }
});

export const { addTocart, removeCartItem, decreaseCart, clearCartItem, getTotals } = cartSlice.actions;
export default cartSlice.reducer;