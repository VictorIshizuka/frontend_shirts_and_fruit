import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "./common/components/Footer";
import Header from "./common/components/Header";
import Categories from "./common/components/Categories";
import "react-toastify/dist/ReactToastify.css";
import CartProducts from "./common/components/CartProducts";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container mt-5">
        <div className="row">
          {!pathname.includes("admin") && (
            <div className="col-4">
              <Categories />
              <CartProducts />
            </div>
          )}
          <div className="col">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
