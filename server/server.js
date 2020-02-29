const express = require("express");
const bodyParser = require("body-parser"); //parse incoming request bodies, req.body
const app = express();
const cors = require("cors"); //middleware to anable access from initial request
const goodreads = require("goodreads-api-node");

const port = 3010;
app.use(cors());
app.use(bodyParser.json()); //choose querystring parsing the URL-encoded data

const myCredentials = {
  key: "RDfV4oPehM6jNhxfNQzzQ",
  secret: "fu8fQ5oGQEDlwiICw45dGSuxiu13STyIrxY0Rb6ibI"
};

const gr = goodreads(myCredentials);

app.get("/api/test", (req, res) => {
  res.send("Hello World");
});

app.get("/searchAuthor/:authorName", (req, res) => {
  let authorName = req.params.authorName;
  gr.searchAuthors(authorName).then(response => {
    console.log(response);
    res.send(response);
  });
});

app.get("/searchBooks/:authorId", (req, res) => {
  let authorId = req.params.authorId;
  console.log("authorId");
  console.log(authorId);
  gr.getBooksByAuthor(authorId).then(response => {
    console.log(response.books.book[0]);
    res.send(response.books.book);
  });
});

app.listen(port, () => {
  console.log("Server running on " + port);
});
