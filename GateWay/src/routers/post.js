const express = require("express");
const axios = require("axios");
const auth = require("../middlewares/auth");
const router = new express.Router();
const postServer = require("../helpers/createAxios")(
  process.env.LOCAL_POST_API_URL
);

router.post("/posts", async (req, res) => {
  try {
    console.log(req.body);
    const response = await postServer.post(`posts`, req, {
      headers: req.headers,
    });
    res.status(201).send({ added: "added" });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
