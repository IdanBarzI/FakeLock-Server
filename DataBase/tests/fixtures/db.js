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

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  userName: "Shimon",
  email: "Shimon@example.com",
  password: "56Shimon!!!!",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.TOKEN_SECRET_KEY),
    },
  ],
};

const postOne = {
  description: "First Post",
  publisher: userOneId,
};

const postTwo = {
  description: "Second Post",
  publisher: userOneId,
};

const postThree = {
  description: "Third Post",
  publisher: userTwoId,
};

const setupDataBase = async () => {
  await User.deleteMany();
  await Post.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Post(postOne).save();
  await new Post(postTwo).save();
  await new Post(postThree).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDataBase,
};
