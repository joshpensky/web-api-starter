require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const {
  connectToMongo,
  createApp,
  createRoutes,
  createServer,
  env,
} = require('./lib');

const main = async () => {
  const app = createApp();

  connectToMongo();
  createRoutes(app);

  const server = await createServer(app, env.port || 3001);
  console.log(`Server started on: ${server.address().port}`);
};

main();
