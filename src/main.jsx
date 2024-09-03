import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "./common/store/index.js";

import App from "./App.jsx";
import { Page } from "./common/screens/Page/index.jsx";

import ProductListing from "./common/screens/ProductListing/index.jsx";
import ProductDetails from "./common/screens/ProductDetails/index.jsx";
import Register from "./common/screens/Register/index.jsx";
import Login from "./common/screens/Login/index.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index path="/:slug?" element={<Page />} />
            <Route index path="/category/:slug?" element={<ProductListing />} />
            <Route index path="/product/:id" element={<ProductDetails />} />
            <Route index path="/login" element={<Login />} />
            <Route index path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
