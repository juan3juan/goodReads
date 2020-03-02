import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Author from "./components/author";
import Books from "./components/books";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/books/:authorId" component={Books} />
        <Route path="/" exact component={Author} />
      </Router>
    </div>
  );
}

export default App;
