class BaseApiResponse {
  /**
   *
   * @param {boolean} ok
   * @param {number} statusCode
   * @param {any} [message]
   */
  constructor(ok, statusCode, message) {
    this.ok = ok;
    this.statusCode = statusCode;
    this.message = message;
  }

  send(res) {
    if (!this.message) {
      res.sendStatus(this.statusCode);
    } else {
      res.status(this.statusCode).send(this.message);
    }
  }
}

module.exports = BaseApiResponse;
