const createServer = (app, port) =>
  new Promise(resolve => {
    const server = app.listen(port, () => {
      resolve(server);
    });
  });

module.exports = createServer;
