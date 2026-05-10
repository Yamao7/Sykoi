// productsSlice.js (create this new file)
import { createSlice } from "@reduxjs/toolkit";

// Assuming your dish data is exported from 'dish' file.
// You might need to adjust this path based on your project structure.
import initialDishData from '../../foodimage'; // Adjust this import path as needed

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: initialDishData, // Your dish data, now managed by Redux
    },
    reducers: {
        decrementStock(state, action) {
            const { id, quantity } = action.payload;
            const product = state.items.find(item => item.id === id);
            if (product && product.stock !== undefined) {
                product.stock -= quantity;
            }
        },
        incrementStock(state, action) {
            const { id, quantity } = action.payload;
            const product = state.items.find(item => item.id === id);
            if (product && product.stock !== undefined) {
                product.stock += quantity;
            }
        },
    },
});

export const { decrementStock, incrementStock } = productsSlice.actions;
export default productsSlice.reducer;