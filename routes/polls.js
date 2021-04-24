const router = require("express").Router();
const mongoose = require("mongoose");
let Poll = require("../models/poll");

router.get("/", (req, res) => {
  Poll.find()
    .then((polls) => res.json(polls))
    .catch((err) => res.status(400).json("Error " + err));
});

router.post("/add", (req, res) => {
  const { question, options, createdBy } = req.body;

  const newPoll = new Poll({
    question,
    options,
    createdBy,
  });

  newPoll
    .save()
    .then(() => res.json(newPoll._id))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error " + err);
    });
});

router.get("/:id", (req, res) => {
  Poll.findById(req.params.id)
    .then((poll) => res.json(poll))
    .catch((err) => res.status(400).json("Error " + err));
});

router.post("/vote", (req, res) => {
  const { user, pollId, choice } = req.body;
  Poll.findById(pollId, async (err, foundPoll) => {
    if (err) {
      return res.send(err);
    }
    foundPoll.options.forEach((option) => {
      if (option.id === choice) {
        option.votes = [...option.votes, user._id];
      }
    });
    foundPoll.markModified("options");
    foundPoll.save((err, doc) => {
      res.send(doc);
    });
  });
});

module.exports = router;
