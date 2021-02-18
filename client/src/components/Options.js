import { useState } from "react";

const Options = ({ votes, options, id, handleVote }) => {
  const [choice, setChoice] = useState(1);
  const [voted, setVoted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setVoted(true);
    handleVote(choice, id);
  };

  return (
    <>
      {voted ? (
        <>
          {options.map((option, index) => (
            <p key={index}>{`${option}: ${votes[index]} ${
              votes[index] === 1 ? "vote" : "votes"
            }`}</p>
          ))}
        </>
      ) : (
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
      )}
    </>
  );
};

export default Options;
