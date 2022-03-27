const app = require("../src/app");
const request = require("supertest");
const User = require("../src/db/models/user");
const { userOneId, userOne, setupDataBase } = require("./fixtures/db");

beforeEach(setupDataBase);

test("should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      userName: "Idan",
      email: "idan@example.com",
      password: "MyPass777!!!",
    })
    .expect(201);
  const user = await User.findById(response._body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      userName: "Idan",
      email: "idan@example.com",
    },
  });
  expect(user.password).not.toBe("MyPass777!!!");
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

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("should get delete acount for un-auth user", async () => {
  await request(app).delete(`/users/me`).send().expect(401);
});

test("should upload avatar image", async () => {
  await request(app)
    .post(`/users/me/avatar`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .attach("avatar", "tests/fixtures/profile.png")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).not.toBeNull();
  // expect(user.avatar).toEqule(expect.any(Buffer));
});

test("should update valid user fields", async () => {
  await request(app)
    .patch(`/users/me`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      userName: "Jess",
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.userName).toBe("Jess");
});

test("should not update invalid user fields", async () => {
  await request(app)
    .patch(`/users/me`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Israel",
    })
    .expect(400);
});
