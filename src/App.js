import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Author from "./components/author";
import Books from "./components/books";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <nav className="navbar navbar-expand navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="navbar-item">
              <Link to="/author" className="nav-link p-3">
                Author
              </Link>
            </li>
          </ul>
        </nav> */}

        {/* <br />
        <div className="container">
          <Route path="/edit/:id" component={Author} />
          <Route path="/author" component={Author} />
        </div> */}
        <Route path="/books/:authorId" component={Books} />
        <Route path="/author" component={Author} />
      </Router>
    </div>
  );
}

export default App;
