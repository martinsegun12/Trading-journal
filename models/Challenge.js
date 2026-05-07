const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challengeName: { type: String, required: true },
  initialBalance: { type: Number, required: true },
  currentBalance: { type: Number, required: true },
  targetProfit: { type: Number, required: true },
  maxDrawdown: { type: Number, required: true }, // e.g., 10 for 10%
  dailyLossLimit: { type: Number, required: true }, // Max loss per day
  maxLossPerTrade: { type: Number, required: true }, // Max loss per single trade
  minWinRate: { type: Number, default: 0 }, // Minimum win rate requirement
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['ACTIVE', 'COMPLETED', 'FAILED'], default: 'ACTIVE' },
  failureReason: String,
  totalTrades: { type: Number, default: 0 },
  winningTrades: { type: Number, default: 0 },
  totalPnL: { type: Number, default: 0 },
  breachedRules: [String], // Track which rules were breached
  createdAt: { type: Date, default: Date.now },
  completedAt: Date
});

module.exports = mongoose.model('Challenge', challengeSchema);
