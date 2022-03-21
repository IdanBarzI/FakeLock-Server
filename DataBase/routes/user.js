const express = require("express");
const auth = require("../middlewares/auth");
const User = require("../db/models/user");
const { CLIENT_RENEG_LIMIT } = require("tls");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const userr = await User.findbyCredentials(
      req.body.email,
      req.body.password
    );
    const user = await User.findOne(userr);
    const token = await userr.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: req.user,
      },
      { new: true, useFindAndModify: false }
    );
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post("/users/loginFacebook", async (req, res) => {
  try {
    await User.findbyCredentials(req.email, req.password);
    console.log("No user found!");
  } catch (error) {
    console.log("User exists!");
  }
  try {
    // const response = await User.findbyCredentials(req.email, req.password);
    res.send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
