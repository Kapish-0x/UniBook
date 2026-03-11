const express = require('express');
const router = express.Router();
const MarketplaceBook = require('../models/MarketplaceBook');
const auth = require('../middleware/auth');

// GET /api/marketplace - Get all listings
router.get('/', async (req, res) => {
  try {
    const { search, subject, condition, page = 1, limit = 20 } = req.query;
    const query = { status: 'available' };

    if (search) query.$text = { $search: search };
    if (subject && subject !== 'All') query.subject = subject;
    if (condition && condition !== 'Any') query.condition = condition;

    const books = await MarketplaceBook.find(query)
      .populate('seller', 'name phone college')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await MarketplaceBook.countDocuments(query);
    res.json({ books, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/marketplace/my-listings - current user listings
router.get('/my-listings', auth, async (req, res) => {
  try {
    const books = await MarketplaceBook.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/marketplace/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await MarketplaceBook.findById(req.params.id).populate('seller', 'name phone college email');
    if (!book) return res.status(404).json({ message: 'Listing not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/marketplace - Create a listing (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const book = await MarketplaceBook.create({ ...req.body, seller: req.user._id });
    await book.populate('seller', 'name phone college');
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/marketplace/:id/status - mark sold/available
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const book = await MarketplaceBook.findOne({ _id: req.params.id, seller: req.user._id });
    if (!book) return res.status(404).json({ message: 'Listing not found or unauthorized' });
    book.status = req.body.status;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/marketplace/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await MarketplaceBook.findOneAndDelete({ _id: req.params.id, seller: req.user._id });
    if (!book) return res.status(404).json({ message: 'Not found or unauthorized' });
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
