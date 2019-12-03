const mongoose = require('mongoose');
const { ApiResponse, ErrorApiResponse, StatusApiResponse } = require('../common');
const { DEFAULT_UPDATE_OPTIONS, ERROR_MESSAGES, MODELS, MONGO_ERRORS, STATUS_CODES } = require('../utils/constants');

class NoteController {
  static get Note() {
    return mongoose.model(MODELS.NOTE);
  }

  static async getAll() {
    try {
      const notes = await this.Note.find();
      return new ApiResponse(notes);
    } catch (err) {
      return new ErrorApiResponse(ERROR_MESSAGES.DB_ERROR, err);
    }
  }

  static async create(text) {
    if (!text) {
      return new ErrorApiResponse(ERROR_MESSAGES.INVALID_TEXT);
    }
    try {
      const note = new this.Note({ text });
      await note.save();
      return new ApiResponse(note);
    } catch (err) {
      return new ErrorApiResponse(ERROR_MESSAGES.INVALID_TEXT, err);
    }
  }

  static async get(id) {
    try {
      const note = await this.Note.findById(id);
      if (!note) {
        return new ErrorApiResponse(ERROR_MESSAGES.NOTE_NOT_FOUND);
      }
      return new ApiResponse(note);
    } catch (err) {
      if (err.kind === MONGO_ERRORS.KINDS.OBJECT_ID) {
        return new ErrorApiResponse(ERROR_MESSAGES.NOTE_NOT_FOUND, err);
      }
      return new ErrorApiResponse(ERROR_MESSAGES.DB_ERROR, err);
    }
  }

  static async update(id, text) {
    if (!text) {
      return new ErrorApiResponse(ERROR_MESSAGES.INVALID_TEXT);
    }
    try {
      const note = await this.Note.findByIdAndUpdate(id, { text }, DEFAULT_UPDATE_OPTIONS);
      if (!note) {
        return new ErrorApiResponse(ERROR_MESSAGES.NOTE_NOT_FOUND);
      }
      return new ApiResponse(note);
    } catch (err) {
      if (err.kind === MONGO_ERRORS.KINDS.OBJECT_ID) {
        return new ErrorApiResponse(ERROR_MESSAGES.NOTE_NOT_FOUND, err);
      }
      return new ErrorApiResponse(ERROR_MESSAGES.DB_ERROR, err);
    }
  }

  static async delete(id) {
    try {
      const note = await this.Note.findByIdAndRemove(id);
      if (!note) {
        return new ErrorApiResponse(ERROR_MESSAGES.NOTE_NOT_FOUND);
      }
      return new StatusApiResponse(STATUS_CODES.NO_CONTENT);
    } catch (err) {
      if (err.kind === MONGO_ERRORS.KINDS.OBJECT_ID || err.name === MONGO_ERRORS.NAMES.NOT_FOUND) {
        return new ErrorApiResponse(ERROR_MESSAGES.NOTE_NOT_FOUND, err);
      }
      return new ErrorApiResponse(ERROR_MESSAGES.NOTE_NOT_FOUND, err);
    }
  }
}

module.exports = NoteController;
