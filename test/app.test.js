const request = require("supertest");

const app = require("../src/app");

test("Should answer in root", () => {
  return request(app)
    .get("/")
    .then((res) => expect(res.status).toBe(200));
});
