const mongoose = require('mongoose');
const { env } = require('.');

/**
 * Gets the connection string for connecting to a MongoDB
 * table.
 * 
 * @param {string} username a username to the database
 * @param {string} password a password to the database
 * @param {string} uri the URI specifying host, port, and
 * database name
 * @returns {string} the connection string to connect to a
 * MongoDB table
 */
const getConnectionString = (username, password, uri) => `mongodb://${username}:${password}@${uri}`;

/**
 * Opens a new connection to MongoDB and loads in the
 * models for use within Mongoose.
 */
const connectToMongo = () => {
  const { username, password, uri } = env.mongo;
  const connString = getConnectionString(username, password, uri);

  mongoose.connect(connString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  require('../models');
};

module.exports = connectToMongo;
