const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  symbol: { type: String, required: true },
  direction: { type: String, enum: ['LONG', 'SHORT'], required: true },
  entryPrice: { type: Number, required: true },
  exitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date, required: true },
  commission: { type: Number, default: 0 },
  pnl: { type: Number, required: true },
  pnlPercentage: { type: Number, required: true },
  status: { type: String, enum: ['WIN', 'LOSS'], required: true },
  notes: String,
  screenshots: [String], // Array of file paths
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
