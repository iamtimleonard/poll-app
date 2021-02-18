const router = require("express").Router();
let Poll = require("../models/poll");

router.route("/").get((req, res) => {
  Poll.find()
    .then((polls) => res.json(polls))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const question = req.body.question;
  const options = req.body.options;
  const votes = new Array(options.length).fill(0);

  const newPoll = new Poll({
    question,
    options,
    votes,
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

router.route("/vote/:id").post((req, res) => {
  Poll.findById(req.params.id)
    .then((poll) => {
      poll.question = req.body.question;
      poll.options = req.body.options;
      poll.votes = req.body.votes;

      poll
        .save()
        .then(() => res.json("Voted!"))
        .catch((err) => res.status(400).json("Error " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
