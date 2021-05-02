const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const salt = crypto.randomBytes(8).toString("hex");
  const buffer = crypto.scryptSync(this.password, salt, 64);
  this.password = `${buffer.toString("hex")}.${salt}`;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
