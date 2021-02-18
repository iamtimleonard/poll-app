const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: { type: String, required: true },
  options: { type: Array, required: true },
  votes: { type: Array },
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
