module.exports = (app) => {
  const getAll = async (req, res) => {
    const result = await app.services.account.findAll();
    res.status(200).json(result);
  };

  const getByID = async (req, res) => {
    const result = await app.services.account.findByID({ id: req.params.id });
    res.status(200).json(result);
  };

  const create = async (req, res) => {
    const result = await app.services.account.save(req.body);
    res.status(201).json(result[0]);
  };

  const update = async (req, res) => {
    const result = await app.services.account.update(req.params.id, req.body);
    res.status(200).json(result[0]);
  };

  const remove = async (req, res) => {
    await app.services.account.remove(req.params.id);
    res.status(204).send();
  };

  return { create, getAll, getByID, update, remove };
};
