module.exports = (app) => {
  const findAll = () => {
    return app.db("accounts");
  };

  const findByID = (filter = {}) => {
    return app.db("accounts").where(filter).first();
  };

  const save = (account) => {
    return app.db("accounts").insert(account, "*");
  };

  const update = (id, account) => {
    return app.db("accounts").where({ id }).update(account, "*");
  };

  const remove = (id) => {
    return app.db("accounts").where({ id }).del();
  };

  return { save, findAll, findByID, update, remove };
};
