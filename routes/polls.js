const router = require("express").Router();
const mongoose = require("mongoose");
let Poll = require("../models/poll");

router.route("/").get((req, res) => {
  Poll.find()
    .then((polls) => res.json(polls))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const question = req.body.question;
  const options = req.body.options;

  const newPoll = new Poll({
    question,
    options,
  });

  newPoll
    .save()
    .then(() => res.json(newPoll._id))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").get((req, res) => {
  Poll.findById(req.params.id)
    .then((poll) => res.json(poll))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/vote").post((req, res) => {
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
