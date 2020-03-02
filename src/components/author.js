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
      <div className="backgroundsource">
        <div className="marqueePadding container">
          <div className="marquee">
            <h3>Where do you want to go today? Find it in a book</h3>
            <h3 id="second">A book is a gift you can open again and again</h3>
          </div>
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
        .marqueePadding{
          padding-top: 70px;
        }
        .marquee {
          height: 70px;
          overflow: hidden;
          position: relative;
      }
      
      .marquee h3{
          font-family: Lucida Handwriting; 
          position: absolute;
          width: 100%;
          height: 100%;
          margin: 0;
          line-height: 50px;
          text-align: center;
          -moz-transform: translateX(100%);
          -webkit-transform: translateX(100%);
          transform: translateX(100%);
          -moz-animation: scroll-left 2s linear infinite;
          -webkit-animation: scroll-left 2s linear infinite;
          animation: scroll-left 20s linear infinite;
      }
      #second {
        padding-top: 18px;
        animation-delay: 8s;
    }
      
      @-moz-keyframes scroll-left {
          0% {
              -moz-transform: translateX(100%);
          }
          100% {
              -moz-transform: translateX(-100%);
          }
      }
      
      @-webkit-keyframes scroll-left {
          0% {
              -webkit-transform: translateX(100%);
          }
          100% {
              -webkit-transform: translateX(-100%);
          }
      }
      
      @keyframes scroll-left {
          0% {
              -moz-transform: translateX(100%);
              -webkit-transform: translateX(100%);
              transform: translateX(100%);
          }
          100% {
              -moz-transform: translateX(-100%);
              -webkit-transform: translateX(-100%);
              transform: translateX(-100%);
          }
      }
            //  h3 {
            //   text-align: center;
            //    padding: 100px 0 10px 0;
            //    font-family: Lucida Handwriting; 
            // }
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
          .backgroundsource {
            height: 100vh;
            background-image: url("${bi}");
            background-repeat: repeat;
            background-size: cover;
          }
          #searchArea {
           padding-top:40px;

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
