const express = require("express");
const multer = require("multer");
const auth = require("../middlewares/auth");
const User = require("../db/models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findbyCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login-facebook", async (req, res) => {
  try {
    const user = await User.findbyCredentialsOrCreate(
      req.body.email,
      req.body.password,
      req.body.userName
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    console.log(e);
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

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    console.log(req);
    if (!file.originalname.match(/\.(jpg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", auth, async (req, res) => {
  try {
    console.log("req.params");
    console.log(req.params);
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    const userAvatar = Buffer.from(user.avatar).toString("base64");
    console.log("got here");
    res.type("png").send(userAvatar);
  } catch (e) {
    console.log(e);
    res.status(e.sta).send();
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    console.log("req.params");
    console.log(req.params);
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error();
    }

    res.send(user);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
