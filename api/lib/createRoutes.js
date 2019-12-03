const routes = require('../routes');

/**
 * Creates the routes for the given app, at the base API path.
 *
 * @param {Express.Express} app an express app instance
 * @param {string} [basePath="/api/v1"] the base path for the
 * routes to be created at
 */
const createRoutes = (app, basePath = '/api/v1') => {
  routes.forEach(({ path, route }) => {
    route(app, `${basePath}${path}`);
  });
};

module.exports = createRoutes;
