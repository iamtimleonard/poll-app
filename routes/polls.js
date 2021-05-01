const router = require("express").Router();
const mongoose = require("mongoose");
let Poll = require("../models/poll");
let User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    let polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.post("/add", async (req, res) => {
  const { question, options, createdBy } = req.body;

  const newPoll = new Poll({
    question,
    options,
    createdBy,
  });
  try {
    let savedPoll = await newPoll.save();
    let foundUser = await User.findById(createdBy.id);
    foundUser.created.push(savedPoll._id);
    foundUser.markModified("created");
    foundUser.save();
    res.json(newPoll._id);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let foundPoll = await Poll.findById(req.params.id);
    res.json(foundPoll);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.post("/vote", async (req, res) => {
  const { user, pollId, choice } = req.body;
  try {
    let foundPoll = await Poll.findById(pollId);
    foundPoll.options.forEach((option) => {
      if (option.id === choice) {
        option.votes = [...option.votes, user._id];
      }
    });
    foundPoll.markModified("options");
    foundPoll.save((err, doc) => {
      res.send(doc);
    });
  } catch (err) {
    res.send(err);
  }
});

router.post("/vote/change", async (req, res) => {
  const { pollId, userId } = req.body;
  try {
    let foundPoll = Poll.findById(pollId);
    foundPoll.options.forEach((option) => {
      if (option.votes.includes(userId)) {
        option.votes.splice(option.votes.indexOf(userId), 1);
      }
    });
    foundPoll.markModified("options");
    foundPoll.save((err, doc) => {
      res.send(doc);
    });
    User.findById(userId).then((foundUser) => {
      foundUser.voted.splice(foundUser.voted.indexOf(pollId), 1);
      foundUser.markModified("voted");
      foundUser.save();
    });
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
});

router.get("/getall/:id", async (req, res) => {
  const foundPolls = await Poll.aggregate([
    { $match: { "createdBy.id": req.params.id } },
  ]);
  res.send(foundPolls);
});

router.post("/delete/:id", async (req, res) => {
  try {
    const deletedPoll = await Poll.findByIdAndDelete(req.params.id);
    res.send(deletedPoll);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("something went wrong, please try again");
  }
});

module.exports = router;
