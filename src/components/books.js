import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./common/Pagination";

const Books = props => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  useEffect(() => {
    axios
      .get("http://localhost:3010/searchBooks/" + props.match.params.authorId, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        console.log(res);
        setBooks(res.data.book);
      });
  }, []);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = books.slice(indexOfFirstPost, indexOfLastPost);
  console.log("currentPage: " + currentPage);
  return (
    <>
      <div className="container">
        <div className="col-12">
          <h2>Books</h2>
          <table className="table table-striped" id="table-books">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Image</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {books !== undefined ? (
                <>
                  {currentPosts.map((book, i) => {
                    return (
                      <tr key={i}>
                        <td className="align-middle">{i + 1}</td>
                        <td className="align-middle">{book.title}</td>
                        <td className="align-middle">
                          {book.authors.author.name}
                        </td>
                        <td>
                          <div className="hover01 column">
                            <div>
                              <figure>
                                <img
                                  id="bookimage"
                                  src={book.image_url}
                                  className="img-fluid img-thumbnail"
                                  alt="book"
                                />
                              </figure>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            id="desc"
                            dangerouslySetInnerHTML={{
                              __html: book.description
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : null}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={books.length}
            paginate={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
      <style jsx>
        {`
          #table-books td {
            height: 100px;
            width: 30px;
          }
          #desc {
            max-height: 100%;
            overflow: auto;
          }
          #bookimage {
            height: "100%";
          }
          .hover01 figure img {
            -webkit-transform: scale(1);
            transform: scale(1);
            -webkit-transition: 0.3s ease-in-out;
            transition: 0.3s ease-in-out;
          }
          .hover01 figure:hover img {
            -webkit-transform: scale(1.5);
            transform: scale(1.5);
          }
        `}
      </style>
    </>
  );
};

export default Books;
