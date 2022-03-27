const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/db/models/user");
const Post = require("../../src/db/models/post");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  userName: "Mike",
  email: "mike@example.com",
  password: "56what!!!!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.TOKEN_SECRET_KEY),
    },
  ],
};

const setupDataBase = async () => {
  await User.deleteMany();
  await Post.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDataBase,
};
