import React from "react";
import "../../css/pagination.css";
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center" id="pagination">
        <li className="page-item">
          <a
            onClick={() => paginate(currentPage - 1 >= 1 ? currentPage - 1 : 1)}
            href="#!"
            className="page-link inactive"
          >
            {"<<"}
          </a>
        </li>
        {pageNumbers.map(number =>
          Math.abs(currentPage - number) <= 2 ? (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="#!"
                className={
                  currentPage === number
                    ? "page-link active"
                    : "page-link inactive"
                }
              >
                {number}
              </a>
            </li>
          ) : null
        )}
        <li className="page-item">
          <a
            onClick={() =>
              paginate(
                currentPage + 1 <= pageNumbers.length
                  ? currentPage + 1
                  : pageNumbers.length
              )
            }
            href="#!"
            className="page-link inactive"
          >
            {">>"}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
