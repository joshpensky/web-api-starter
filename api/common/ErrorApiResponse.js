const { BaseApiResponse } = require('.');

class ErrorApiResponse extends BaseApiResponse {
  /**
   * @constructor
   * Creates an error API response that sends an error payload.
   * 
   * @param {[number, number]} response the status code and payload
   * of the response
   * @param {any} [err] an optional error param to keep track of
   * errors from try-catch blocks
   */
  constructor([statusCode, payload], err) {
    super(statusCode, { error: payload });
    this.err = err;
  }
}

module.exports = ErrorApiResponse;
