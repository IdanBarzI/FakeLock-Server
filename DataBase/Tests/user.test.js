const app = require("../src/app");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const User = require("../src/db/models/user");
const mongoose = require("mongoose");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: "Test",
  email: "Test.jest@gmail.com",
  password: "TestinfNodejs",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.TOKEN_SECRET_KEY),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      username: "Test signup",
      email: "Testsignup.jest@gmail.com",
      password: "TestinsignupfNodejs",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      username: "Test",
      email: "Test.jest@gmail.com",
      tokens: [
        {
          token: user.tokens[0].token,
        },
      ],
    },
  });
});

test("should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("should not login not-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "userOne.password",
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get(`/users/me`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should get profile for un-auth user", async () => {
  await request(app).get(`/users/me`).send().expect(401);
});

test("should get delete acount for user", async () => {
  await request(app)
    .delete(`/users/me`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should get delete acount for un-auth user", async () => {
  await request(app).delete(`/users/me`).send().expect(401);
});
