import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
import authSlice, { logout } from "../slices/authSlice";
import cartSlice from "../slices/cartSlice";

const loggingMiddleware = store => next => action => {
  if (action.type.includes("/api") && action.payload) {
    if (action.payload.status === 401) {
      store.dispatch(logout());
    }
  }
  return next(action);
};
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    cart: cartSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware, loggingMiddleware),
});

export default store;
