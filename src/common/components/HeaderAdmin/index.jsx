import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  return (
    <nav
      className="navbar navbar-expand-sm bg-secondary px-3"
      data-bs-theme="dark"
    >
      <ul className="navbar-nav w-100">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/users">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/products">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/categories">
            Categories
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/pages">
            Pages
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderAdmin;
