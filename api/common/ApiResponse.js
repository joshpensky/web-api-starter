const { BaseApiResponse } = require('.');
const { STATUS_CODES } = require('../utils/constants');

class ApiResponse extends BaseApiResponse {
  /**
   * @constructor
   * Creates a new successful API response with the given payload.
   * 
   * @param {any} payload the payload of the response to send
   * @param {number} [statusCode=200] an optional status code for
   * the response 
   */
  constructor(payload, statusCode = STATUS_CODES.OK) {
    super(statusCode, payload);
  }
}

module.exports = ApiResponse;
