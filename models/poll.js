const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: { type: String, required: true },
  options: { type: Array, required: true },
  createdBy: Object,
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
