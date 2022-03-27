const express = require("express");
const multer = require("multer");
const auth = require("../middlewares/auth");
const Post = require("../db/models/post");
const router = new express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post("/posts", auth, upload.single("image"), async (req, res) => {
  console.log(req);
  const post = new Post({
    ...req.body,
    image: req.file.buffer,
    publisher: req.user._id,
  });
  try {
    await post.save();
    res.status(201).send({ post });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
