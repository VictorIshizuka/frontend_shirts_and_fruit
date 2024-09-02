import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "./common/store/index.js";

import App from "./App.jsx";
import { Page } from "./common/screens/Page/index.jsx";

import "./index.css";
import ProductLIsting from "./common/screens/ProductListing/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index path="/:slug?" element={<Page />} />
            <Route index path="/category/:slug?" element={<ProductLIsting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
