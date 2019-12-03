const notes = require('./notes');

const createRoutes = app => {
  const BASE_PATH = '/api/v1';

  notes(app, `${BASE_PATH}/notes`);
};

module.exports = createRoutes;