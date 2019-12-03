const mongoose = require('mongoose');
const { env } = require('.');

const getConnectionString = () => {
  const { username, password, uri } = env.mongo;
  return `mongodb://${username}:${password}@${uri}`;
};

const connectToMongo = () => {
  const connString = getConnectionString();

  mongoose.connect(connString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  require('../models');
};

module.exports = connectToMongo;