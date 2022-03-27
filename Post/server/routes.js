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

router.get("/posts", async (req, res) =>{
  try {
    const response = await databaseServer.get(`posts`, req, {
      headers:req.headers,
    });
    res.status(201).send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const response = await databaseServer.get(`posts/${req.params.id}`, req, {
      headers: req.headers,
    });
    res.status(201).send(response.data);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
     const updatedPost = await databaseServer.put(`posts/${req.params.id}`, req, {
       headers: req.headers
     });
     if (!updatedPost) {
       res.status(400).send("Operation failed!");
      } else res.status(201).send(updatedTest);
  } catch (e) {
     res.status(404).send(e)
  }

});
module.exports = router;
