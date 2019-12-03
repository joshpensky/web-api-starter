/**
 * Enables CORS on the given response.
 * 
 * @param {express.Request} req the express Request object
 * @param {express.Response} res the express Response object
 * @param {function} next callback function to proceed to next middleware
 * function in chain
 */
const enableCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

module.exports = enableCors;