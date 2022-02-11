module.exports = (app) => {
  const findAll = async (req, res) => {
    const users = await app.services.user.findAll();
    res.status(200).json(users);
  };

  const create = async (req, res) => {
    const users = await app.services.user.save(req.body);
    if (users.error) return res.status(400).json(users);
    res.status(201).json(users[0]);
  };

  return { findAll, create };
};
