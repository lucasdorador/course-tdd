module.exports = {
  test: {
    client: "pg",
    version: "14.1",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "lucas123",
      database: "financeiro",
    },
    migrations: {
      directory: "src/migrations",
    },
  },
};
