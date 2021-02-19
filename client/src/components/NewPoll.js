import { useState } from "react";
import { FaAngry } from "react-icons/fa";

const NewPoll = ({ handleCreate }) => {
  const [question, setQuestion] = useState("");
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState([]);

  const handleAddOption = (e) => {
    e.preventDefault();
    const newOptionObj = {
      text: newOption,
      id: Math.floor(Math.random() * 100000),
    };
    setOptions([...options, newOptionObj]);
    setNewOption("");
  };

  const createPoll = (e) => {
    e.preventDefault();
    if (!question) {
      alert("Question is required!");
      return;
    }
    let optionsList = options.map((option) => {
      option.votes = 0;
      return option;
    });
    const pollData = {
      question,
      options: optionsList,
    };
    setQuestion("");
    setNewOption("");
    setOptions([]);
    handleCreate(pollData);
  };
  const deleteOption = (id) => {
    setOptions(options.filter((option) => option.id !== id));
  };
  return (
    <div className="new-poll">
      <h2 className="heading">Create a New Poll</h2>
      <form>
        <div className="form-control">
          <input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            type="text"
            name=""
            id=""
            placeholder="Poll question"
          />
        </div>
        {options.map((option, index) => (
          <p className="option-input" key={option.id}>
            {option.text}
            <span className="icon pointer">
              <FaAngry color="red" onClick={() => deleteOption(option.id)} />
            </span>
          </p>
        ))}
        <div className="form-control">
          <input
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            type="text"
            placeholder="Response option"
          />
        </div>
        <div className="buttons">
          <button disabled={!newOption.length} onClick={handleAddOption}>
            Add option
          </button>
          <button
            onClick={createPoll}
            disabled={
              newOption.length || options.length < 2 || !question.length
            }
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPoll;
