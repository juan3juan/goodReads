const express = require("express");
const bodyParser = require("body-parser"); //parse incoming request bodies, req.body
const app = express();
const cors = require("cors"); //middleware to anable access from initial request
const goodreads = require("goodreads-api-node");
require("dotenv").config();
const port = process.env.serverport || 3010;
app.use(cors());
app.use(bodyParser.json()); //choose querystring parsing the URL-encoded data

//#region API Credentials
const myCredentials = {
  key: process.env.goodReadsApikey,
  secret: process.env.goodReadsApisecret
};

const gr = goodreads(myCredentials);
//#endregion
app.get("/test", (req, res) => {
  res.send("response");
});

//search by Author
app.get("/searchAuthor/:authorName", (req, res) => {
  let authorName = req.params.authorName;
  gr.searchAuthors(authorName).then(response => {
    res.send(response);
  });
});

//Search Books for Author for a Specific page
app.get("/books/searchBooks/:authorId/:pageNum", async (req, res) => {
  let authorId = req.params.authorId;
  let pageNum = parseInt(req.params.pageNum);
  gr.getBooksByAuthor(authorId, pageNum).then(response => {
    res.send(response);
  });
});

//Get all books for the Author
app.get("/books/searchBooksAll/:authorId", async (req, res) => {
  let authorId = req.params.authorId;
  let pages = 1;
  let authorName = "";
  let books = [];
  let bookResp = {};
  let response = await gr.getBooksByAuthor(authorId);
  if (response !== undefined) {
    pages = response.books.total / 30;
    authorName = response.name;
    if (response.books.total % 30 !== 0) pages = pages + 1;
    for (let page = 1; page <= pages; page++) {
      let respInner = await gr.getBooksByAuthor(authorId, page);
      books = books.concat(respInner.books.book);
    }
  }
  bookResp.books = books;
  bookResp.authorName = authorName;
  res.send(bookResp);
});

app.listen(port, () => {
  console.log("Server running on " + port);
});
