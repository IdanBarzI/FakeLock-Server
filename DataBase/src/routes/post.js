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

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new Error();
    }

    res.status(201).send(post);
  } catch (e) {
    res.status(404).send(e);
  }
});

//find all, or by filter other than ID (query received from req)
router.get("/posts", async ({query}, res) =>{
  try {
    const posts = await Post.find(query);

    if(!posts){
      return "No posts found!";
    }
    res.status(201).send(posts);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.put("/posts", async (req, res) =>{
  try {
    const updatedPost = await Post.findOneAndUpdate(req.params.id, req.body);

    if(!updatedPost){
      throw new Error("No post found!");
    }
    res.status(201).send(updatedPost);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/posts/:id", async (req, res) =>{
  try {
    const deletedPost = await Post.findOneAndDelete(req.params.id);

    if (!deletedPost){
      throw new Error("Deletion failed!");
    }
    res.status(201).send(deletedPost);
  } catch (e) {
    res.status(404).send(e);
  }
})

module.exports = router;