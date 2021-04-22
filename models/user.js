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
  created: Array,
  voted: Array,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
