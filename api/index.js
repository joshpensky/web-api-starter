require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const { connectToMongo, createApp, createRoutes, createServer, env } = require('./lib');

const main = async () => {
  const app = createApp();

  connectToMongo();
  createRoutes(app);

  let port = env.port;
  if (!port) {
    port = process.env.NODE_ENV === 'production' ? 3000 : 3001;
  }
  await createServer(app, port);
  console.log(`Server started on: ${port}`);
};

main();
