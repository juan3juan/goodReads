const express = require("express");
const bodyParser = require("body-parser"); //parse incoming request bodies, req.body
const app = express();
const cors = require("cors"); //middleware to anable access from initial request
const goodreads = require("goodreads-api-node");
const fetch = require("node-fetch");

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

const xmlToJson = xml => {
  var convert = require("xml-js");
  xml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<note importance="high" logged="true">' +
    "    <title>Happy</title>" +
    "    <todo>Work</todo>" +
    "    <todo>Play</todo>" +
    "</note>";
  var result1 = convert.xml2json(xml, { compact: true, spaces: 4 });
  return result1;
};

app.get("/searchAuthor/:authorName", (req, res) => {
  let authorName = req.params.authorName;
  gr.searchAuthors(authorName).then(response => {
    console.log("**************************************");
    console.log(response.headers);
    res.send(response);
  });
});

app.get("/searchAuthor1/:authorName", (req, res) => {
  let authorName = req.params.authorName;
  let baseUrl = "https://www.goodreads.com/api/author_url/";
  let key = myCredentials.key;
  let secret = myCredentials.secret;
  let url = baseUrl + authorName + "?key=" + key + "&secret=" + secret;
  console.log("url");
  console.log(url);
  fetch(url).then(response => {
    console.log(response.data);
    res.send(response);
  });
});

app.get("/books/searchBooks/:authorId", async(req, res) => {
  let authorId = req.params.authorId;
  gr.getBooksByAuthor(authorId).then(response => {
    res.send(response);
  });
});

app.get("/books/searchBooksAll/:authorId", async(req, res) => {
  let authorId = req.params.authorId;
  let pages = 1;
  let authorName = "";
  let books = [];
  let bookResp = {};
  let response = await gr.getBooksByAuthor(authorId);
  if(response !== undefined){
    pages = response.books.total/30;
    authorName = response.name;
    if(response.books.total%30 !==0)
      pages = pages+1;
    for(let page=1; page<=pages; page++){
      let respInner = await gr.getBooksByAuthor(authorId, page);
      books = books.concat(respInner.books.book);
    }
  }
  bookResp.books = books;
  bookResp.authorName = authorName;
  console.log("response");
  console.log(bookResp.books.length);
  res.send(bookResp);
});

app.listen(port, () => {
  console.log("Server running on " + port);
});
