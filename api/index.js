require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const { connectToMongo, createApp, createServer, env, serveWebDist } = require('./lib');
const addRoutes = require('./routes');

const main = async () => {
  const app = createApp();

  connectToMongo();
  addRoutes(app);
  // NOTE: Comment out to not serve the web dist in production mode
  serveWebDist(app);

  const server = await createServer(app, env.port || 3001);
  console.log(`Server started on: ${server.address().port}`);
};

main();
