import { useState, useEffect } from "react";

const PollsList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const getPolls = async () => {
      const pollsFromServer = await fetchPolls();
      setPolls(pollsFromServer);
      console.log(polls);
    };
    getPolls();
  }, []);

  const fetchPolls = async () => {
    const res = await fetch("http://localhost:5000/polls");
    const data = await res.json();

    return data;
  };
  return (
    <>
      {polls.map((poll) => (
        <h1 key={poll._id}>{poll.question}</h1>
      ))}
    </>
  );
};

export default PollsList;
