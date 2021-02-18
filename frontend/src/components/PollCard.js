import { useState } from "react";
import Options from "./Options";

const PollCard = ({ question, options, id, handleVote }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="poll-card">
      <h2 onClick={() => setActive(!active)}>{question}</h2>
      {active && <Options handleVote={handleVote} options={options} id={id} />}
    </div>
  );
};

export default PollCard;
