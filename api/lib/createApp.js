const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('morgan');
const { enableCors } = require('../middleware');

/**
 * Creates a new Express app with JSON and URL-encoded
 * body parsing.
 * 
 * @returns {express.Express} a new Express app instance
 */
const createApp = () => {
  const app = express();

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb', parameterLimit: 1000000 }));
  app.use(bodyParser.json());
  app.use(logger('dev'));
  app.use(enableCors);
  app.disable('x-powered-by');

  return app;
};

module.exports = createApp;