const mongoose = require('mongoose');

const marketplaceBookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  course: { type: String, default: '' },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, default: 0 },
  condition: { type: String, enum: ['Like New', 'Good', 'Fair', 'Poor'], default: 'Good' },
  coverEmoji: { type: String, default: '📚' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available', 'sold', 'reserved'], default: 'available' },
  interestedBuyers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

marketplaceBookSchema.index({ title: 'text', author: 'text', subject: 'text', course: 'text' });

module.exports = mongoose.model('MarketplaceBook', marketplaceBookSchema);
