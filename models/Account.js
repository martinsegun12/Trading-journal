const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountName: { type: String, required: true },
  accountType: { type: String, enum: ['LIVE', 'DEMO', 'CHALLENGE'], default: 'DEMO' },
  initialBalance: { type: Number, required: true },
  currentBalance: { type: Number, required: true },
  totalPnL: { type: Number, default: 0 },
  winRate: { type: Number, default: 0 },
  totalTrades: { type: Number, default: 0 },
  winningTrades: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', accountSchema);
