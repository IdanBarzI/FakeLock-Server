const express = require("express");
const axios = require("axios");
const auth = require("../middlewares/auth");
const router = new express.Router();
const userServer = require("../helpers/createAxios")(
  process.env.LOCAL_USER_API_URL
);

router.post("/users", async (req, res) => {
  try {
    const response = await userServer.post(`users`, req.body);
    res.status(201).send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const response = await userServer.post(`users/login`, req.body);
    res.send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login-facebook", async (req, res) => {
  try {
    const response = await userServer.post(`users/login-facebook`, req.body);
    res.send(response.data);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    await userServer.post(`users/logout`, req, {
      headers: req.headers,
    });
    res.send({ ok: "Ok" });
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/me/avatar", async (req, res) => {
  try {
    console.log(req);
    await userServer.post(`users/me/avatar`, req, {
      headers: req.headers,
    });
    res.send({ sended: "S" });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/users/:id/avatar", auth, async (req, res) => {
  try {
    const response = await userServer.get(
      `users/${req.params.id}/avatar`,
      req,
      {
        headers: req.headers,
      }
    );
    res.type("png").send(response.data);
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/users/:id", auth, async (req, res) => {
  try {
    const response = await userServer.get(`users/${req.params.id}`, req, {
      headers: req.headers,
    });
    res.send(response.data);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
