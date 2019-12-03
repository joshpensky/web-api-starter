const { NoteController } = require('../controllers');

/**
 * Creates the `notes` routes for the given app.
 * 
 * @param {express.Express} app an express app instance
 * @param {string} path the base path of the routes
 */
const notes = (app, path) => {
  // GET /notes
  app.get(path, async (req, res) => {
    const response = await NoteController.getAll();
    response.send(res);
  });

  // POST /notes
  app.post(path, async (req, res) => {
    const { text } = req.body;
    const response = await NoteController.create(text);
    response.send(res);
  });

  // GET /notes/:id
  app.get(`${path}/:id`, async (req, res) => {
    const { id } = req.params;
    const response = await NoteController.get(id);
    response.send(res);
  });

  // PUT /notes/:id
  app.put(`${path}/:id`, async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const response = await NoteController.update(id, text);
    response.send(res);
  });

  // DELETE /notes/:id
  app.delete(`${path}/:id`, async (req, res) => {
    const { id } = req.params;
    const response = await NoteController.delete(id);
    response.send(res);
  });
};

module.exports = notes;