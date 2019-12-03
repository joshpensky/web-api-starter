const { BaseApiResponse } = require('.');

class StatusApiResponse extends BaseApiResponse {
  /**
   * @constructor
   * Creates a basic API response that only sends a status code.
   * 
   * @param {number} statusCode the status code of the response
   */
  constructor(statusCode) {
    super(statusCode, null);
  }
}

module.exports = StatusApiResponse;
