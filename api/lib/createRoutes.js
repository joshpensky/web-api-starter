const path = require('path');
const express = require('express');
const routes = require('../routes');

/**
 * Serves the routes for the API, at the base API path.
 * 
 * @param {Express.Express} app an express app instance
 * @param {string} [basePath="/api/v1"] the base path for the
 * routes to be created at
 */
const serveApiRoutes = (app, basePath = '/api/v1') => {
  routes.forEach(({ path, route }) => {
    route(app, `${basePath}${path}`);
  });
};

/**
 * Serves the web folder's `dist` statically on the given app.
 * 
 * @param {express.Express} app the express app instance
 */
const serveWebDist = app => {
  const webPath = path.resolve(__dirname, 'web', '..', '..');
  const distPath = path.resolve(webPath, 'dist');
  app.use(express.static(distPath));
  app.use('/static', express.static(path.resolve(distPath, 'static')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
};

/**
 * Creates all of the routes for the given app.
 *
 * @param {Express.Express} app an express app instance
 * @param {string} [basePath] the base path for the API routes
 * to be created at
 */
const createRoutes = (app, basePath) => {
  serveApiRoutes(app, basePath);
  if (process.env.NODE_ENV === 'production') {
    serveWebDist(app);
  }
};

module.exports = createRoutes;
