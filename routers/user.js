const express = require("express");
const User = require("../models/user");
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

module.exports = router;
