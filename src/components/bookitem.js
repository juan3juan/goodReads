import React from "react";
//import "../css/style.css";
const BookItem = props => {
  return (
    <tr key={props.id}>
      <td className="align-middle">{props.id + 1}</td>
      <td className="align-middle">{props.book.title}</td>
      <td className="align-middle">{props.book.authors.author.name}</td>
      <td>
        <div className="hover01 column">
          <div>
            <figure>
              <img
                id="bookimage"
                src={props.book.image_url}
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
            __html: props.book.description
          }}
        />
      </td>
    </tr>
  );
};
export default BookItem;
