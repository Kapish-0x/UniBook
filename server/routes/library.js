const express = require('express');
const router = express.Router();
const LibraryBook = require('../models/LibraryBook');
const auth = require('../middleware/auth');

// GET /api/library - Get all library books (with search & filter)
router.get('/', async (req, res) => {
  try {
    const { search, subject, page = 1, limit = 20 } = req.query;
    const query = {};

    if (search) query.$text = { $search: search };
    if (subject && subject !== 'All') query.subject = subject;

    const books = await LibraryBook.find(query)
      .populate('addedBy', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await LibraryBook.countDocuments(query);
    res.json({ books, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/library/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await LibraryBook.findById(req.params.id).populate('addedBy', 'name email');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/library - Add a book (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const book = await LibraryBook.create({ ...req.body, addedBy: req.user._id });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/library/subjects/list - distinct subjects
router.get('/subjects/list', async (req, res) => {
  try {
    const subjects = await LibraryBook.distinct('subject');
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
