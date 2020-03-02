import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./common/Pagination";
import bi from "../img/bookImage3.jpg";

let initialpage = 0;
let totalbooks = -1;
const Books = props => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorName, setAuthorName] = useState();
  const [loading, setLoading] = useState("background2");
  const postsPerPage = 10;
  useEffect(() => getBooks(), []);

  const getBooks = () => {
    initialpage++;
    axios
      .get("searchBooks/" + props.match.params.authorId + "/" + initialpage, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        if (totalbooks === -1) {
          totalbooks = res.data.books.total;
        }
        if (books < totalbooks) {
          let updatedbooks = books.concat(res.data.books.book);
          setAuthorName(res.data.name); //res.data.name
          if (updatedbooks.length > 3) {
            setLoading("background1");
          }
          setBooks(updatedbooks); //res.data.books.book
        }
      });
  };

  const handlePageChange = pageNumber => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
    if (pageNumber !== 1 && pageNumber === lastpageNumber) {
      getBooks(false);
    }
  };

  // Get current posts
  const lastpageNumber = Math.ceil(books.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = books.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="view" id={loading}>
        <div className="container">
          <div className="col-12">
            <h2>
              Books of {authorName === undefined ? <>......</> : authorName}
            </h2>
            {books !== undefined && books.length > 0 ? (
              <>
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
                                className="desc"
                                dangerouslySetInnerHTML={{
                                  __html: book.description
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  </tbody>
                </table>
                {lastpageNumber > 1 ? (
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={books.length}
                    paginate={handlePageChange}
                    currentPage={currentPage}
                  />
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          h2 {
            text-align: center;
             padding: 20px 0 10px 0;
             font-family: Lucida Handwriting; 
          }
          .table-striped thead > tr > th {
            border-bottom: none;
          }

          #background1 {
            height: 100%;
            background-image: url("${bi}");
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
          #background2 {
            height: 100vh;
            background-image: url("${bi}");
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
                  
          #table-books td {
            height: 150px;
            width: 30px;
          }
          
          .desc {
            height: 100%;
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
          @media screen and (max-width: 600px) {
            #table-books td {
              width: 15px;
            }
            #background1 {
              width: 100vh;
            }
          }
        `}
      </style>
    </>
  );
};

export default Books;
