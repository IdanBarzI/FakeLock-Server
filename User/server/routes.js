const express = require("express");
const axios = require("axios");
const router = new express.Router();
const DataBaseURL = process.env.LOCAL_DATABASE_URL;

router.post("/users", async (req, res) => {
  try {
    const response = await axios.post(`${DataBaseURL}/users`, req.body);
    res.status(201).send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const response = await axios.post(`${DataBaseURL}/users/login`, req.body);
    res.status(201).send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logout", async (req, res) => {
  try {
    await axios.post(`${DataBaseURL}/users/logout`, req, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
