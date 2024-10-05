import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { logout } from "../../slices/authSlice";
import { useGetPagesQuery } from "../../slices/pagesApiSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";

import HeaderAdmin from "../HeaderAdmin";

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);

  const { data: pages, error } = useGetPagesQuery();
  const [logoutApiCall] = useLogoutMutation();

  async function handleLogout() {
    const res = await logoutApiCall();
    dispatch(logout());
    navigate("/");
    toast.success(res.data.message);
  }

  return (
    <header>
      {userInfo?.isAdmin && <HeaderAdmin />}
      <nav className="navbar navbar-expand-sm navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/">
          Shirts & Fruit
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {error ? (
              <p>{error.data?.message}</p>
            ) : (
              pages?.map((page, index) => (
                <li
                  className={`nav-item ${page.slug === "home" ? "d-none" : ""}`}
                  key={index}
                >
                  <Link className="nav-link" to={`/${page.slug}`}>
                    {page.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
          <ul className="navbar-nav justify-content-end w-100">
            <li className="nav-item">
              {userInfo === null && pathname !== "/login" && (
                <Link className="nav-link" to="/login">
                  Log in
                </Link>
              )}
            </li>
            <li className="nav-item">
              {userInfo === null && pathname !== "/register" && (
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              )}
            </li>
            <li className="nav-item mx-2">
              {userInfo !== null && !pathname.includes("/profile") && (
                <Link className="btn btn-info" to="/profile">
                  My profile
                </Link>
              )}
            </li>
            <li className="nav-item">
              {userInfo !== null && (
                <Link className="btn btn-danger" onClick={handleLogout}>
                  Log out
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
