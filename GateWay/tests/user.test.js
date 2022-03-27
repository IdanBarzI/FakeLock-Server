const request = require("supertest");
const app = require("../src/app");

const userOne = {
  username: "Test",
  email: "Test.jest@gmail.com",
  password: "TestinfNodejs",
};

test("should signup a new user", async () => {
  await request(app).post("/users").send(userOne).expect(201);
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
