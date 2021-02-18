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
  const handleVote = (choice, id) => {
    // get targeted poll by id from state
    let pollFromState = polls.find((poll) => poll._id === id);
    let remainingPolls = polls.filter((poll) => poll._id !== id);
    pollFromState.votes[choice]++;

    // update votes in db
    axios
      .post(`http://localhost:5000/polls/vote/${id}`, pollFromState)
      .then((res) => console.log(res.data));
    // update votes in state
    setPolls([pollFromState, ...remainingPolls]);
  };
  return (
    <div className="container">
      <PollsList polls={polls} handleVote={handleVote} />
    </div>
  );
};

export default App;
