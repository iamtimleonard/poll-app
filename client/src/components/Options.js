import { useState } from "react";

const Options = ({ options, id, handleVote }) => {
  const [choice, setChoice] = useState("");
  const [voted, setVoted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setVoted(true);
    handleVote(parseInt(choice), id);
  };

  return (
    <>
      {voted ? (
        <>
          {options.map((option) => (
            <p key={option.id}>{`${option.text}: ${option.votes} ${
              option.votes === 1 ? "vote" : "votes"
            }`}</p>
          ))}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          {options.map((option) => (
            <div key={option.id}>
              <input
                onClick={(e) => {
                  setChoice(e.target.value);
                }}
                type="radio"
                name={id}
                value={option.id}
              />
              <label htmlFor={option.id}>{option.text}</label>
            </div>
          ))}
          <button>Vote</button>
        </form>
      )}
    </>
  );
};

export default Options;
