const { BaseApiResponse } = require('.');

class StatusApiResponse extends BaseApiResponse {
  constructor(statusCode) {
    super(statusCode < 400, statusCode);
  }
}

module.exports = StatusApiResponse;
