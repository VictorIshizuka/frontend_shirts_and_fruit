import { Outlet } from "react-router-dom";
import Footer from "./common/components/Footer";
import Header from "./common/components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-4">
            <h4>Categories</h4>
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
