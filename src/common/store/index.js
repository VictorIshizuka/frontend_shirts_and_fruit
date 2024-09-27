import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
import authSlice, { logout } from "../slices/authSlice";

const loggingMIddleware = store => next => action => {
  if (action.type.startsWith("/api") && action.payload) {
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
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware, loggingMIddleware),
});

export default store;
