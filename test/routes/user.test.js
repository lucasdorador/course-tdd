const request = require("supertest");

const app = require("../../src/app");

const mail = `${Date.now()}@mail.com`;

test("Should list all users", () => {
  return request(app)
    .get("/users")
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test("Should create new user", () => {
  return request(app)
    .post("/users")
    .send({ name: "João José", mail, passwd: "123456" })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("João José");
    });
});

test("Shouldn't insert user without name", () => {
  return request(app)
    .post("/users")
    .send({ mail: "", passwd: "123456" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Nome é um atributo obrigatório.");
    });
});

test("Shouldn't insert user without mail", async () => {
  const result = await request(app)
    .post("/users")
    .send({ name: "Lucas Dorador", passwd: "123456" });

  expect(result.status).toBe(400);
  expect(result.body.error).toBe("E-mail é um atributo obrigatório.");
});

test("Shouldn't insert user without password", (done) => {
  request(app)
    .post("/users")
    .send({ name: "Lucas Dorador", mail: "lucas@mail.com" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Senha é um atributo obrigatório.");
      done();
    })
    .catch((err) => done.fail(err));
});

test("Shouldn't insert user with an existing mail", () => {
  return request(app)
    .post("/users")
    .send({ name: "João José", mail, passwd: "123456" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Já existe um usuário com o e-mail enviado.");
    });
});
