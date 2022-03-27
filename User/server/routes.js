const express = require("express");
const axios = require("axios");
const databaseServer = require("../helpers/createAxios");
const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    console.log(req.body);
    const response = await databaseServer.post(`users`, req.body);
    res.status(201).send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const response = await databaseServer.post(`users/login`, req.body);
    res.status(201).send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login-facebook", async (req, res) => {
  try {
    console.log(req.body);
    const response = await databaseServer.post(
      `users/login-facebook`,
      req.body
    );
    res.send(response.data);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/users/logout", async (req, res) => {
  try {
    await databaseServer.post(`users/logout`, req, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    console.log(req.params.id);
    const response = await databaseServer.get(
      `users/${req.params.id}/avatar`,
      req,
      {
        headers: req.headers,
      }
    );
    res.send(response.data);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

router.post("/users/me/avatar", async (req, res) => {
  try {
    const response = await databaseServer.post(`users/me/avatar`, req, {
      headers: req.headers,
    });
    res.send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const response = await databaseServer.get(`users/${req.params.id}`, req, {
      headers: req.headers,
    });
    res.send(response.data);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
