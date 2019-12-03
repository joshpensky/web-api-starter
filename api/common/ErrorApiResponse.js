const { BaseApiResponse } = require('.');

class ErrorApiResponse extends BaseApiResponse {
  constructor([statusCode, message], err) {
    super(false, statusCode, { error: message });
    this.err = err;
  }
}

module.exports = ErrorApiResponse;
