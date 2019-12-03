const { BaseApiResponse } = require('.');
const { STATUS_CODES } = require('../utils/constants');

class ApiResponse extends BaseApiResponse {
  constructor(message, statusCode = STATUS_CODES.OK) {
    super(true, statusCode, message);
  }
}

module.exports = ApiResponse;
