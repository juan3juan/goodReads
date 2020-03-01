import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

  return (
    <>
      <div className="container">
        <h2>Please input the author</h2>
        <form className="form-inline md-form mr-auto mb-4">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search author"
            name="author"
            value={author || ""}
            onChange={handleChange}
            aria-label="Search"
          />
          <input
            type="button"
            className="btn btn-info"
            onClick={handleClick}
            value="Search"
          />
        </form>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Books</th>
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
            {/* {authors !== undefined ? (
            <>
              <tr>
                <td>{authors.name}</td>
                <td>
                  <Link to={"/books/" + authors.id}>Edit</Link>
                </td>
              </tr>
            </>
          ) : null} */}
          </tbody>
        </table>
        {/* <h3>{authors}</h3> */}
      </div>
    </>
  );
}

export default Author;
