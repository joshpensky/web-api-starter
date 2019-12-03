/**
 * Creates and starts a new server for the given app at the
 * given port.
 * 
 * @param {express.Express} app the app to create the
 * server for
 * @param {number} port the port to run the server on
 * @returns {Promise<express.Server>} a promise that
 * resolves when the server starts to the server instance
 */
const createServer = (app, port) =>
  new Promise(resolve => {
    const server = app.listen(port, () => {
      resolve(server);
    });
  });

module.exports = createServer;
