import { useState } from "react";

const Options = ({ options, id, handleVote }) => {
  const [choice, setChoice] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVote(choice);
  };

  return (
    <form onSubmit={handleSubmit}>
      {options.map((option, index) => (
        <div key={index}>
          <input
            onClick={(e) => setChoice(e.target.value)}
            type="radio"
            name={id}
            value={index}
          />
          <label htmlFor={index}>{option}</label>
        </div>
      ))}
      <button>Vote</button>
    </form>
  );
};

export default Options;
