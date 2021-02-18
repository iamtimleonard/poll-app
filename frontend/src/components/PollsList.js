import PollCard from "./PollCard";

const PollsList = ({ polls, handleVote }) => {
  return (
    <>
      {polls.map((poll) => (
        <PollCard
          options={poll.options}
          key={poll._id}
          question={poll.question}
          id={poll._id}
          votes={poll.votes}
          handleVote={handleVote}
        />
      ))}
    </>
  );
};

export default PollsList;
