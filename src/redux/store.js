import { configureStore } from "@reduxjs/toolkit";
import cartslice from "../component/Dashboard/cart/cartslice";
import cartReducer from '../component/Dashboard/cart/cartslice';
import productsReducer from '../component/Dashboard/cart/productsSlice'; 

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
    },
});

export default configureStore({
    reducer:{
        cart:cartslice,
    }
})
