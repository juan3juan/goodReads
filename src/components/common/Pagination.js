import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const active = "pagination justify-content-center " + "";
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
      <style jsx>{`
        #pagination {
          margin-top: 25px;
        }
        #pagination li a {
          cursor: pointer;
          color: black;
          float: left;
          padding: 8px 16px;
          text-decoration: none;
          transition: background-color 0.3s;
          border: 1px solid #ddd;
        }
        #page-item-hide {
        }
        #pagination li a:active {
          background-color: #eeddaa;
          color: white;
          border: 1px solid #eeddaa;
        }
        .active {
          background-color: #eeddaa;
        }
        .inactive {
          background-color: #f0efd1;
        }
      `}</style>
    </nav>
  );
};

export default Pagination;
