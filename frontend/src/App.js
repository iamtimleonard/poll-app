import { useState, useEffect } from "react";
import PollsList from "./components/PollsList";
import axios from "axios";

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
    const res = await fetch("http://localhost:5000/polls");
    const data = await res.json();
    return data;
  };
  const handleVote = (choice) => {};
  return (
    <div className="container">
      <PollsList polls={polls} handleVote={handleVote} />
    </div>
  );
};

export default App;
