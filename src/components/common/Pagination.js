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
            className="page-link"
          >
            {"<<"}
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              href="#!"
              className={
                currentPage === number ? "page-link active" : "page-link"
              }
            >
              {number}
            </a>
          </li>
        ))}
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
            className="page-link"
          >
            {">>"}
          </a>
        </li>
      </ul>
      <style jsx>{`
        #pagination {
          margin-top: 25px;
          bacoground-color: red;
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
        #pagination li a:active {
          background-color: #0099ff;
          color: white;
          border: 1px solid #0099ff;
        }
        .active {
          background-color: #eeddaa;
        }
      `}</style>
    </nav>
  );
};

export default Pagination;
