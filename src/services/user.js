module.exports = (app) => {
  const find = (filter) => {
    return app.db("users").where(filter).select();
  };

  const findAll = () => {
    return app.db("users").select();
  };

  const save = async (user) => {
    if (!user.name) return { error: "Nome é um atributo obrigatório." };
    if (!user.mail) return { error: "E-mail é um atributo obrigatório." };
    if (!user.passwd) return { error: "Senha é um atributo obrigatório." };

    const userDB = await find({ mail: user.mail });

    if (userDB && userDB.length > 0)
      return { error: "Já existe um usuário com o e-mail enviado." };

    return app.db("users").insert(user, "*");
  };

  return { findAll, save };
};
