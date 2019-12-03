const mongoose = require('mongoose');
const { MODELS } = require('../utils/constants');

const NoteSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(MODELS.NOTE, NoteSchema);