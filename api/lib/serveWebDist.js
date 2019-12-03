const path = require('path');
const express = require('express');

const WEB_PATH = path.resolve(__dirname, 'web', '..', '..');
const DIST_PATH = path.resolve(WEB_PATH, 'dist');

/**
 * Serves the web folder's `dist` statically on the given
 * app *when in production mode.*
 * 
 * @param {express.Express} app the express app instance
 */
const serveWebDist = app => {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(DIST_PATH));
    app.use('/static', express.static(path.resolve(DIST_PATH, 'static')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(DIST_PATH, 'index.html'));
    });
  }
};

module.exports = serveWebDist;