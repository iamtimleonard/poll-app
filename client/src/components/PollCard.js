import { useState } from "react";
import Options from "./Options";

const PollCard = ({ question, options, id, handleVote }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="poll-card">
      <h3 className="question pointer" onClick={() => setActive(!active)}>
        {question}
      </h3>
      {active && <Options handleVote={handleVote} options={options} id={id} />}
    </div>
  );
};

export default PollCard;
