const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Shirts & Fruit
      </a>
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
          <li className="nav-item">
            <a className="nav-link" href="#">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Pricing
            </a>
          </li>
        </ul>
        <ul className="navbar-nav justify-content-end w-100">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Log in
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Register
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
