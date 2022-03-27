const express = require("express");
const axios = require("axios");
const databaseServer = require("../helpers/createAxios");
const router = new express.Router();

router.post("/posts", async (req, res) => {
  try {
    const response = await databaseServer.post(`posts`, req, {
      headers: req.headers,
    });
    res.status(201).send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
