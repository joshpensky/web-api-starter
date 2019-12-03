class BaseApiResponse {
  /**
   * @constructor
   * Creates a new API response with the given payload and status
   * code.
   * 
   * @param {number} statusCode the status code of the response
   * @param {any} [payload] the payload of the response to send
   */
  constructor(statusCode, payload) {
    this.statusCode = statusCode;
    this.payload = payload;
  }

  /**
   * Sends the response to the client using the given Response
   * object.
   * 
   * @param {express.Response} res an Express Response object
   */
  send(res) {
    if (!this.payload) {
      res.sendStatus(this.statusCode);
    } else {
      res.status(this.statusCode).send(this.payload);
    }
  }
}

module.exports = BaseApiResponse;
