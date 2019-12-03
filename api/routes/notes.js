const { NoteController } = require('../controllers');

module.exports = (app, path) => {
  app.get(path, async (req, res) => {
    const response = await NoteController.getAll();
    response.send(res);
  });

  app.post(path, async (req, res) => {
    const { text } = req.body;
    const response = await NoteController.create(text);
    response.send(res);
  });

  app.get(`${path}/:id`, async (req, res) => {
    const { id } = req.params;
    const response = await NoteController.get(id);
    response.send(res);
  });

  app.put(`${path}/:id`, async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const response = await NoteController.update(id, text);
    response.send(res);
  });

  app.delete(`${path}/:id`, async (req, res) => {
    const { id } = req.params;
    const response = await NoteController.delete(id);
    response.send(res);
  });
};