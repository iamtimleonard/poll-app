const request = require("supertest");
const app = require("./app");
const mongoDB = require("./mongoDB");

beforeEach(() => {
  mongoDB.connect();
});

afterEach((done) => {
  mongoDB.disconnect(done);
});

test("/users", async () => {
  const response = await request(app).get("/users");
  expect(response.statusCode).toBe(200);
});

test("/users/login fail", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({ name: "test", password: "a;sldfj" });
  expect(response.statusCode).toBe(401);
});

let createdUser;

test("/users/add", async () => {
  const response = await request(app)
    .post("/users/add")
    .send({ name: "bob", password: "test" });
  createdUser = JSON.parse(response.text)._id;
  expect(response.statusCode).toBe(200);
});

test("/users/delete", async () => {
  const response = await request(app)
    .post("/users/delete")
    .send({ userId: createdUser });
  expect(response.statusCode).toBe(200);
});

test("/polls", async () => {
  const response = await request(app).get("/polls");
  expect(response.statusCode).toBe(200);
});
