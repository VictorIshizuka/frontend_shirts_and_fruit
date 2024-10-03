import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages }) => {
  const isFirstPage = Number(currentPage) === 1;
  const isLastPage = Number(currentPage) === totalPages;
  return (
    <nav className="Page navigation d-flex justify-content-center">
      <ul className="pagination">
        <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
          <Link className="page-link" href={`/?p=1`} aria-label="First">
            <span aria-hidden="true">&raquo;&raquo;</span>
          </Link>
        </li>
        <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to={`?p=${currentPage - 1}`}
            aria-label="Previous"
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
        {[...Array(totalPages).keys()].map(page => (
          <li
            key={page + 1}
            className={`page-item ${currentPage === page + 1 ? "active" : ""}`}
          >
            <Link className="page-link" to={`?p=${page + 1}`}>
              {page + 1}
            </Link>
          </li>
        ))}
        <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to={`?p=${currentPage + 1}`}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
        <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
          <Link className="page-link" to={`?p=${totalPages}`} aria-label="Last">
            <span aria-hidden="true">&raquo;&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
