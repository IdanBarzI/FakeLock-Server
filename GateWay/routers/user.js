const express = require("express");
const axios = require("axios");
const auth = require("../middlewares/auth");
const router = new express.Router();
const UserURL = process.env.LOCAL_USER_API_URL;

router.post("/users", async (req, res) => {
  try {
    const response = await axios.post(`${UserURL}/users`, req.body);
    res.status(201).send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const response = await axios.post(`${UserURL}/users/login`, req.body);
    res.send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    await axios.post(`${UserURL}/users/logout`, {
      user: req.user,
      token: req.token,
    });
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;