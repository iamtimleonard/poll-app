const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  created: { type: Array, default: [] },
  voted: { type: Array, default: [] },
  joined: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
