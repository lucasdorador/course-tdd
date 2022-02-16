const request = require("supertest");
const app = require("../../src/app");

const MAIN_ROUTE = "/accounts";
let user;

beforeAll(async () => {
  const res = await app.services.user.save({
    name: "User Account",
    mail: `${Date.now()}@mail.com`,
    passwd: "123456",
  });

  user = { ...res[0] };
});

test("Should insert new account with sucess", () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      name: "Acc #1",
      user_id: user.id,
    })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe("Acc #1");
    });
});

test("Should list all accounts", () => {
  return app
    .db("accounts")
    .insert({ name: "Acc list", user_id: user.id })
    .then(() => request(app).get(MAIN_ROUTE))
    .then((result) => {
      expect(result.status).toBe(200);
      expect(result.body.length).toBeGreaterThan(0);
    });
});

test("Should return one accounts by id", () => {
  return app
    .db("accounts")
    .insert({ name: "Acc By ID", user_id: user.id }, ["id"])
    .then((acc) => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((result) => {
      expect(result.status).toBe(200);
      expect(result.body.name).toBe("Acc By ID");
      expect(result.body.user_id).toBe(user.id);
    });
});

test("Should update an account", () => {
  return app
    .db("accounts")
    .insert({ name: "Acc Update", user_id: user.id }, ["id"])
    .then((acc) =>
      request(app)
        .put(`${MAIN_ROUTE}/${acc[0].id}`)
        .send({ name: "Acc Updated" })
    )
    .then((result) => {
      expect(result.status).toBe(200);
      expect(result.body.name).toBe("Acc Updated");
    });
});

test("Should remove an account", () => {
  return app
    .db("accounts")
    .insert({ name: "Acc to Remove", user_id: user.id }, ["id"])
    .then((acc) => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});
