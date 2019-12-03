exports.DEFAULT_UPDATE_OPTIONS = {
  new: true,
  runValidators: true,
};

exports.MODELS = {
  NOTE: 'Note',
};

exports.MONGO_ERRORS = {
  KINDS: {
    OBJECT_ID: 'ObjectId',
  },
  NAMES: {
    NOT_FOUND: 'NotFound',
  },
};

// *******************************
// RESPONSES
// *******************************

// https://www.restapitutorial.com/httpstatuscodes.html
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500,
};
exports.STATUS_CODES = STATUS_CODES;

exports.ERROR_MESSAGES = {
  DB_ERROR: [STATUS_CODES.INTERNAL_SERVER_ERROR, 'Database error.'],
  INVALID_TEXT: [STATUS_CODES.BAD_REQUEST, 'Text for note is invalid.'],
  NOTE_NOT_FOUND: [STATUS_CODES.NOT_FOUND, 'Note with given ID not found.'],
};
