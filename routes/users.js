const router = require("express").Router();
let User = require("../models/user");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;

  const newUser = new User({
    name,
    created: [],
    voted: [],
  });

  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/vote/:id").post((req, res) => {
  User.findById(req.params.id).then((user) => {
    user.voted = req.body.voted;
    user.save().then(() => res.json("voted"));
  });
});

module.exports = router;
