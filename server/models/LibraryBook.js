const mongoose = require('mongoose');

const libraryBookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  course: { type: String, required: true, trim: true },
  isbn: { type: String, default: '' },
  description: { type: String, default: '' },
  coverEmoji: { type: String, default: '📚' },
  availableCopies: { type: Number, default: 1 },
  totalCopies: { type: Number, default: 1 },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

libraryBookSchema.index({ title: 'text', author: 'text', subject: 'text', course: 'text' });

module.exports = mongoose.model('LibraryBook', libraryBookSchema);
