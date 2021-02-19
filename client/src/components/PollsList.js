import PollCard from "./PollCard";

const PollsList = ({ polls, handleVote }) => {
  return (
    <>
      <h2 className="heading">Choose a poll below:</h2>
      {polls.map((poll) => (
        <PollCard
          options={poll.options}
          key={poll._id}
          question={poll.question}
          id={poll._id}
          handleVote={handleVote}
        />
      ))}
    </>
  );
};

export default PollsList;
