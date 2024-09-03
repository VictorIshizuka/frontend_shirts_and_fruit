import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "./common/components/Footer";
import Header from "./common/components/Header";
import Categories from "./common/components/Categories";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-4">
            <Categories />
          </div>
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
