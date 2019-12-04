const mongoose = require('mongoose');
const { ApiResponse, ErrorApiResponse, StatusApiResponse } = require('../common');
const { DEFAULT_UPDATE_OPTIONS, ERROR_MESSAGES, MODELS, MONGO_ERRORS, STATUS_CODES } = require('../utils/constants');

class NoteController {
  /**
   * @static
   * Getter for the note controller's model.
   * 
   * @returns {mongoose.Model} the Note model
   */
  static get Note() {
    return mongoose.model(MODELS.NOTE);
  }

  /**
   * @static
   * Gets all notes and returns them in an API response.
   * 
   * @returns {ApiResponse|ErrorApiResponse} an API response containing
   * the notes, or an error response if one occurs
   */
  static async getAll() {
    try {
      const notes = await this.Note.find();
      return new ApiResponse(notes);
    } catch (err) {
      return new ErrorApiResponse(ERROR_MESSAGES.DB_ERROR, err);
    }
  }

  /**
   * @static
   * Creates a new note with the given text content.
   * 
   * @param {string} text the note's text contents
   * @returns {ApiResponse|ErrorApiResponse} an API response containing
   * the new note, or an error response if one occurs
   */
  static async create(text) {
    if (!text) {
      return new ErrorApiResponse(ERROR_MESSAGES.INVALID_TEXT);
    }
    try {
      const note = new this.Note({ text }, STATUS_CODES.CREATED);
      await note.save();
      return new ApiResponse(note);
    } catch (err) {
      return new ErrorApiResponse(ERROR_MESSAGES.INVALID_TEXT, err);
    }
  }

  /**
   * @static
   * Gets a new note with the given ID.
   * 
   * @param {string} id the ID of the note to get
   * @returns {ApiResponse|ErrorApiResponse} an API response containing
   * the note with the given ID, or an error response if one occurs
   */
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

  /**
   * @static
   * Updates the text content of a note with the given ID.
   * 
   * @param {string} id the ID of the note to update
   * @param {string} text the note's new text contents
   * @returns {ApiResponse|ErrorApiResponse} an API response containing
   * the updated note with the given ID, or an error response if one
   * occurs
   */
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

  /**
   * @static
   * Deletes a note with the given ID.
   * 
   * @param {string} id the ID of the note to delete
   * @returns {StatusApiResponse|ErrorApiResponse} an API response
   * containing a "No Content" response, or an error response if one
   * occurs
   */
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
