const router = require("express").Router();
let Poll = require("../models/poll");

router.route("/").get((req, res) => {
  Poll.find()
    .then((polls) => res.json(polls))
    .catch((err) => res.status(400).json("Error " + error));
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
    .then(() => res.json("Poll added!"))
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
