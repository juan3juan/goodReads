import React, { useState, useEffect } from "react";
import axios from "axios";

const Books = props => {
  const [books, setBooks] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3010/searchBooks/" + props.match.params.authorId)
      .then(res => {
        setBooks(res.data);
        console.log(res);
      });
  }, []);
  return (
    <>
      <h2>books</h2>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {books !== undefined ? (
            <>
              {books.map((book, i) => {
                return (
                  <tr key={i}>
                    <td>{book.title}</td>
                    <td>{book.image_url}</td>
                  </tr>
                );
              })}
            </>
          ) : null}
        </tbody>
      </table>
    </>
  );
};

export default Books;
