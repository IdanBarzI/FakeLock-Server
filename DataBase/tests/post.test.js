const app = require("../src/app");
const request = require("supertest");
const Post = require("../src/db/models/post");
const { userOneId, userOne, setupDataBase } = require("./fixtures/db");

beforeEach(setupDataBase);

test("should create post for user", async () => {
  const response = await request(app)
    .post("/posts")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "description",
    })
    .expect(201);

  const post = await Post.findById(response._body.post._id);
  expect(post).not.toBeNull();
});
