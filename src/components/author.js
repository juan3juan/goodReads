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
            <p>Where do you want to go today? Find it in a book</p>
            <p id="second">A book is a gift you can open again and again</p>
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
      
      .marquee p{
          font-family: Lucida Handwriting; 
          position: absolute;
          width: 100%;
          height: 100%;
          margin: 0;
          white-space: nowrap;
          font-size:small:
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
          @media screen and (max-width : 1900px)
          {
            p
            {
              font-size:xx-large;
            }
          }
          @media screen and (max-width : 1204px)
          {
            p
            {
              font-size:x-large;
            }
            #second
            {
              animation-delay: 10s;
            }
            #searchArea {
              padding-top:25px;
             }
          }
          @media screen and (max-width : 500px)
          {
            p
            {
              font-size:small;
            }
            #searchArea {
              padding-top:15px;
             }
            #second
            {
              animation-delay: 13s;
            }
          }

         
        `}
      </style>
    </>
  );
}

export default Author;
