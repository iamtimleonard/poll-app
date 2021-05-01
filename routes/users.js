const crypto = require("crypto");
const router = require("express").Router();
const mongoose = require("mongoose");
let User = require("../models/user");

router.get("/", (req, res) => {
  res.json("searched for user");
});

router.get("/logout", (req, res) => {
  res.json("logged out");
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error " + err));
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    let foundUser = await User.findOne({ name });
    if (!foundUser) {
      return res.status(401).send("something went wrong");
    }
    const [hashed, salt] = foundUser.password.split(".");
    const hashedSuppliedPassword = crypto.scryptSync(password, salt, 64);
    if (hashed !== hashedSuppliedPassword.toString("hex")) {
      return res.status(401).send("something went wrong");
    }
    res.send(foundUser);
  } catch (err) {
    return res.status(400).json("Error " + err);
  }
});

router.post("/add", async (req, res) => {
  const { name, password } = req.body;
  const salt = crypto.randomBytes(8).toString("hex");
  const buffer = crypto.scryptSync(password, salt, 64);
  const newUser = new User({
    name,
    password: `${buffer.toString("hex")}.${salt}`,
  });

  try {
    let savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json("Error " + err);
  }
});

router.post("/vote/:id", async (req, res) => {
  try {
    let foundUser = await User.findById(req.params.id);
    foundUser.voter = req.body.voted;
    await foundUser.save();
    res.json("voted");
  } catch (err) {
    res.send(err);
  }
});

router.post("/delete", async (req, res) => {
  try {
    let deletedUser = await User.findByIdAndDelete(req.body.userId);
    res.send(deletedUser);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
