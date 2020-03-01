import React, { useState } from "react";
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
    if (author !== undefined) {
      axios
        .get("searchAuthor/" + author, {
          headers: { "Content-Type": "application/json" }
        })
        .then(res => {
          setAuthors([res.data.author]);
        });
    }
  };

  return (
    <>
      <div id="backgroundsource">
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
                          <Link className="bookLink" to={"/books/" + au.id}>
                            View {au.name}'s Books
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
      </div>
      <style jsx>
        {`
          th{
            color: dimgrey;
            font-size: large
          }
          td {
            color: dimgrey;
            font-weight: bold;
            font-style: italic;

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
           padding-top:100px;

          }
          #authorSearch {
            width: 80%;
          }
          #searchButton {
            width: 19%;
          }
          .bookLink {
            color: #47A5C1;
          }

         
        `}
      </style>
    </>
  );
}

export default Author;
