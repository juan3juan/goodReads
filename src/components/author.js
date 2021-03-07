import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/style.css";
import "../css/marquee.css";

function Author() {
  //#region  UseState and Use Effect
  //used to display the Autor typed in SearchBox
  const [author, setAuthor] = useState();
  //Used for Auhtors replied by the service
  const [authors, setAuthors] = useState([]);
  //Used to display warning message
  const [warning, setWarning] = useState();
  useEffect(() => {
    //Add an event listener for Enter and Return Key
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleClick();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [author]);
  //#endregion

  //#region Event Handlers
  //Hanlder for input change
  const handleChange = e => {
    e.preventDefault();
    let regex = new RegExp("^$|^[a-zA-Z0-9]");
    if(regex.test(e.target.value)) {
      console.log(e.target.value);
      setAuthor(e.target.value);
      setWarning("")
    } else {
      setWarning("Please input valid Author or Book name you want to search")
    }
    
  };
  //Handler for Search Button Click
  const handleClick = () => {
    console.log("author");

    console.log(author);
    if (author !== undefined) {
      console.log("author inside");

      axios
        .get("searchAuthor/" + author, {
          headers: { "Content-Type": "application/json" }
        })
        .then(res => {
          setAuthors([res.data.author]);
        });
    }
  };
  //#endregion
  return (
    <>
      <div className="background heightVH">
        <div className="marqueePadding container">
          <div className="marquee">
            <p>Where do you want to go today? Find it in a book</p>
            <p id="secondMarquee">
              A book is a gift you can open again and again
            </p>
          </div>
          <form
            className="form-inline"
            id="searchArea"
            onSubmit={
              handleChange //Handle Enterkey and Return Key Event inside input
            }
          >
            <input
              className="form-control mr-2"
              id="authorSearch"
              type="text"
              pattern="\w"
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
          {warning==="" ? <div></div>: 
          <div style={{color: "#cc3300"}}>{warning}</div>}
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
    </>
  );
}

export default Author;
