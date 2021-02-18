import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PollsList from "./components/PollsList";

const App = () => {
  return (
    <Router>
      <Link to="/polls">Polls</Link>
      <Route path="/polls" component={PollsList} />
    </Router>
  );
};

export default App;
