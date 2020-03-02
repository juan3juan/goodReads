import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./common/Pagination";
import { Link } from "react-router-dom";
import "../css/style.css";

//page counter for Books API call
let initialpage = 0;
//total numer of books for the current author. value got setted after the first API call
let totalbooks = -1;
let Prevauthor = "";

const Books = props => {
  //#region Use State and Use Effect
  const [books, setBooks] = useState([]);
  //Set current page for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  //Set the Author Name for displaying in Book page
  const [authorName, setAuthorName] = useState();
  //Use to handle the backgroundImage size
  const [loading, setLoading] = useState("background2");

  //first API call
  useEffect(() => getBooks(), []);
  //#endregion

  //#region variables for Paginiation
  //Display 10 books perpage
  const postsPerPage = 10;
  const lastpageNumber = Math.ceil(books.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = books.slice(indexOfFirstPost, indexOfLastPost);
  //#endregion

  //#region Event Handlers

  //Method to call service to get books
  const getBooks = () => {
    //Runing for a new Author, reset the value incase user use back button
    if (Prevauthor !== "" && authorName !== "" && Prevauthor !== authorName) {
      initialpage = 0;
      totalbooks = -1;
      Prevauthor = "";
    }
    //if already the last page, don't run again
    if (initialpage > 0 && books.length >= totalbooks) {
      return;
    }

    //pagecounter to indentify which page to call
    initialpage++;
    axios
      .get("searchBooks/" + props.match.params.authorId + "/" + initialpage, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        //Save the total number of books
        if (totalbooks === -1) {
          totalbooks = res.data.books.total;
        }
        //check whther there are books haven't load yet
        if (books.length < totalbooks) {
          //append new books to books already been loaded
          let updatedbooks = books.concat(res.data.books.book);
          setAuthorName(res.data.name); //res.data.name
          if (Prevauthor === "") {
            Prevauthor = res.data.name;
          }
          //Update total books
          setBooks(updatedbooks); //res.data.books.book

          //If the books is less than 3 then change to style for background Image
          console.log(updatedbooks.length);
          console.log(currentPosts.length);
          if (updatedbooks.length > 3) {
            setLoading("background1");
          }
        }
      });
  };

  //Handler for Page change
  const handlePageChange = pageNumber => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
    if (pageNumber !== 1 && pageNumber === lastpageNumber) {
      //if it's the last page, then call the service again to get more books
      getBooks();
    }
  };
  //#endregion

  return (
    <>
      <div className="view" className={loading}>
        <div className="container">
          <div className="col-12">
            <Link className="backLink" to="/">
              GO BACK
            </Link>
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
    </>
  );
};

export default Books;
