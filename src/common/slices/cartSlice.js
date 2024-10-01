import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        item => item._id === action.payload._id
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
    addOne: (state, action) => {
      const existingItem = state.cartItems.find(
        item => item._id === action.payload
      );
      existingItem.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    remove: (state, action) => {
      const existingItem = state.cartItems.find(
        item => item._id === action.payload
      );
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          item => item._id !== action.payload
        );
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item._id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: state => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, addOne, remove, deleteItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
