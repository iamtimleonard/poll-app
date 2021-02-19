import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PollsList from "./components/PollsList";
import NewPoll from "./components/NewPoll";
import axios from "axios";
require("dotenv").config();

const App = () => {
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    const getPolls = async () => {
      const pollsFromServer = await fetchPolls();
      setPolls(pollsFromServer);
    };
    getPolls();
  }, []);

  const fetchPolls = async () => {
    const res = await fetch(`https://its-poll-time.herokuapp.com/polls`);
    const data = await res.json();
    return data;
  };

  const handleVote = (choice, pollId) => {
    let pollFromState = polls.find((poll) => poll._id === pollId);
    let remainingPolls = polls.filter((poll) => poll._id !== pollId);

    pollFromState.options.forEach((option) => {
      option.id === choice && option.votes++;
    });

    axios
      .post(
        `https://its-poll-time.herokuapp.com/polls/vote/${pollId}`,
        pollFromState
      )
      .then((res) => console.log(res.data));

    setPolls([pollFromState, ...remainingPolls]);
  };

  const handleCreate = (pollData) => {
    axios
      .post(`https://its-poll-time.herokuapp.com/polls/add`, pollData)
      .then((res) => {
        pollData._id = res.data;
        setPolls([...polls, pollData]);
      });
  };

  return (
    <Router>
      <nav>
        <ul className="navbar">
          <li className="nav-link pointer">
            <Link to="/">See All</Link>
          </li>
          <li className="nav-link pointer">
            <Link to="/create">Create Survey</Link>
          </li>
        </ul>
      </nav>
      <h1>PollBuddy</h1>
      <div className="container">
        <Route path="/" exact>
          <PollsList polls={polls} handleVote={handleVote} />
        </Route>
        <Route path="/create">
          <NewPoll handleCreate={handleCreate} />
        </Route>
      </div>
    </Router>
  );
};

export default App;
