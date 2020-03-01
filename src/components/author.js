import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import bi from "../img/bookImage3.jpg";

function Author() {
  const [author, setAuthor] = useState();
  const [authors, setAuthors] = useState([]); //{ name: "test", id: "1" }

  const handleChange = e => {
    setAuthor(e.target.value);
  };
  const handleClick = () => {
    axios
      .get("searchAuthor/" + author, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        setAuthors([res.data.author]);
      });
  };
  console.log("~~~~~~~~~~~~~~~~~~authors");
  console.log(authors.length);
  return (
    <>
      <div className="view" id="backgroundsource">
        <div className="mask rgba-gradient align-items-center">
          <div className="container" id="data">
            {/* <h2>Please input the author</h2> */}
            <form className="form-inline md-form mr-auto mb-4" id="searchArea">
              <input
                className="form-control mr-sm-2"
                id="authorSearch"
                type="text"
                placeholder="Search author"
                name="author"
                value={author || ""}
                onChange={handleChange}
                aria-label="Search"
              />
              <input
                id="searchButton"
                type="button"
                className="btn btn-info"
                onClick={handleClick}
                value="Search"
              />
            </form>
            {authors.length === 0 ? null : (
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Author Name</th>
                    <th>Book List Link</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((au, i) => {
                    return (
                      <tr key={i}>
                        <td>{au.name}</td>
                        <td>
                          <Link to={"/books/" + au.id}>View Books</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          h2,
          th,
          td {
            color: black;
          }
          .table-striped thead > tr > th {
            border-bottom: none;
          }
          #backgroundsource {
            height: 100vh;
            background-image: url("${bi}");
            background-repeat: repeat;
            background-size: cover;
          }
          #searchArea {
           // padding: 10px;
           // background-color: #ffefd5;
           padding-top:100px;

          }
          #authorSearch {
            width: 80%;
          }
          #searchButton {
            width: 19%;
          }

          // .rgba-gradient {
          //   height: 100vh;
          //   background: -moz-linear-gradient(
          //     45deg,
          //     rgba(42, 27, 161, 0.7),
          //     rgba(29, 210, 177, 0.7) 100%
          //   );
          //   background: -webkit-linear-gradient(
          //     45deg,
          //     rgba(42, 27, 161, 0.7),
          //     rgba(29, 210, 177, 0.7) 100%
          //   );
          //   background: -webkit-gradient(
          //     linear,
          //     45deg,
          //     from(rgba(42, 27, 161, 0.7)),
          //     to(rgba(29, 210, 177, 0.7))
          //   );
          //   background: -o-linear-gradient(
          //     45deg,
          //     rgba(42, 27, 161, 0.7),
          //     rgba(29, 210, 177, 0.7) 100%
          //   );
          //   background: linear-gradient(
          //     to 45deg,
          //     rgba(42, 27, 161, 0.7),
          //     rgba(29, 210, 177, 0.7) 100%
          //   );
          // }
        `}
      </style>
    </>
  );
}

export default Author;
