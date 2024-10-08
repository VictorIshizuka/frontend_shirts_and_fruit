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

import AdminRouter from "./common/components/AdminRouter/index.jsx";
import ListPages from "./common/screens/Admin/List/pages.jsx";
import ListCategories from "./common/screens/Admin/List/categories.jsx";
import ListUsers from "./common/screens/Admin/List/users.jsx";
import ListProducts from "./common/screens/Admin/List/products.jsx";
import FormPage from "./common/screens/Admin/Form/page.jsx";
import FormProduct from "./common/screens/Admin/Form/products.jsx";
import Cart from "./common/screens/Cart/index.jsx";
import OrderPlaced from "./common/screens/OrderPlaced/index.jsx";
import PrivateROuter from "./common/components/PrivateRouter/index.jsx";
import Profile from "./common/screens/Profile/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index path="/:slug?" element={<Page />} />
            <Route index path="/product/:id" element={<ProductDetails />} />
            <Route index path="/category/:slug?" element={<ProductListing />} />

            <Route index path="/login" element={<Login />} />
            <Route index path="/register" element={<Register />} />
            <Route index path="/cart" element={<Cart />} />
            <Route path="/order-placed" element={<OrderPlaced />} />

            <Route path="" element={<AdminRouter />}>
              <Route index path="/admin/pages?" element={<ListPages />} />
              <Route
                index
                path="/admin/categories?"
                element={<ListCategories />}
              />
              <Route index path="/admin/users" element={<ListUsers />} />
              <Route index path="/admin/products" element={<ListProducts />} />

              <Route
                index
                path="/admin/products/form/:id"
                element={<FormProduct />}
              />

              <Route
                index
                path="/admin/categories/form:/id"
                element={<ListProducts />}
              />
              <Route
                index
                path="/admin/pages/form/:slug"
                element={<FormPage />}
              />

              <Route
                index
                path="/admin/categories/:id"
                element={<ListProducts />}
              />
              <Route
                index
                path="/admin/products/form"
                element={<FormProduct />}
              />
              <Route
                index
                path="/admin/categories/form"
                element={<ListProducts />}
              />
              <Route index path="/admin/pages/form" element={<FormPage />} />
            </Route>
            <Route path="" element={<PrivateROuter />}>
              <Route index path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
