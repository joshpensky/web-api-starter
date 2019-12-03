const env = {
  port: process.env.PORT,
  mongo: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    uri: process.env.MONGO_URI,
  },
};

module.exports = env;