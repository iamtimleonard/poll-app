const crypto = require("crypto");
const session = require("express-session");
const router = require("express").Router();
const mongoose = require("mongoose");
let User = require("../models/user");

router.get("/", (req, res) => {
  res.send(req.session.user);
});

router.get("/logout", (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      session.destroy((err) => {
        if (err) throw err;

        res.clearCookie(process.env.SESS_NAME);
        res.send(user);
      });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    res.status(422).send(err);
  }
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
    req.session.user = { userId: foundUser.id, username: foundUser.username };
    res.send(foundUser);
  } catch (err) {
    return res.status(400).json("Error " + err);
  }
});

router.post("/add", async (req, res) => {
  const { name, password } = req.body;
  const newUser = new User({
    name,
    password,
  });

  try {
    let savedUser = await newUser.save();
    req.session.user = { userId: savedUser.id, username: savedUser.username };
    res.json(savedUser);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.post("/vote/:id", async (req, res) => {
  try {
    let foundUser = await User.findById(req.params.id);
    foundUser.voter = req.body.voted;
    await foundUser.save();
    res.json("voted");
  } catch (err) {
    res.status(400).send(err);
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
