const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("########### Connected to MongoDB ###########");
});

const pollRouter = require("./routes/polls");
const userRouter = require("./routes/users");

app.use("/polls", pollRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("okay");
});

module.exports = app;
