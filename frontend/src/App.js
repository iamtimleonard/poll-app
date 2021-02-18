import { useState, useEffect } from "react";
import PollsList from "./components/PollsList";
import NewPoll from "./components/NewPoll";
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
    let pollFromState = polls.find((poll) => poll._id === id);
    let remainingPolls = polls.filter((poll) => poll._id !== id);
    pollFromState.votes[choice]++;
    axios
      .post(`http://localhost:5000/polls/vote/${id}`, pollFromState)
      .then((res) => console.log(res.data));
    setPolls([pollFromState, ...remainingPolls]);
  };
  const handleCreate = (pollData) => {
    pollData.votes = new Array(pollData.options.length).fill(0);
    axios.post(`http://localhost:5000/polls/add`, pollData).then((res) => {
      console.log(res.data);
      pollData._id = res.data;
      setPolls([...polls, pollData]);
    });
  };
  return (
    <div className="container">
      <PollsList polls={polls} handleVote={handleVote} />
      <NewPoll handleCreate={handleCreate} />
    </div>
  );
};

export default App;
