import PollCard from "./PollCard";

const PollsList = ({ polls }) => {
  return (
    <>
      {polls.map((poll) => (
        <PollCard key={poll._id} title={poll.question} />
      ))}
    </>
  );
};

export default PollsList;
