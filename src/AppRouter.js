import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import useProfile from "./hooks/useProfile";
import About from "./routes/About";
import Users from "./routes/Users";
import Home from "./routes/Home";

function LoadingScreen() {
  return (
    <div className="App">
      <h1 className="App-header">Loading...</h1>
    </div>
  );
}

export default function AppRouter() {
  const profile = useProfile();

  return profile ? (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <LoadingScreen />
  );
}
