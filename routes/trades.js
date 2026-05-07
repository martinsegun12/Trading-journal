const express = require('express');
const multer = require('multer');
const path = require('path');
const Trade = require('../models/Trade');
const Account = require('../models/Account');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Log Trade with Screenshots
router.post('/', authMiddleware, upload.array('screenshots', 5), async (req, res) => {
  try {
    const { accountId, symbol, direction, entryPrice, exitPrice, quantity, entryTime, exitTime, commission, notes } = req.body;
    
    // Calculate P&L
    const priceDifference = direction === 'LONG' ? exitPrice - entryPrice : entryPrice - exitPrice;
    const pnl = (priceDifference * quantity) - (commission || 0);
    const pnlPercentage = (pnl / (entryPrice * quantity)) * 100;
    const status = pnl > 0 ? 'WIN' : 'LOSS';
    
    // Get screenshots paths
    const screenshots = req.files ? req.files.map(f => f.path) : [];
    
    const trade = new Trade({
      accountId,
      symbol,
      direction,
      entryPrice: parseFloat(entryPrice),
      exitPrice: parseFloat(exitPrice),
      quantity: parseFloat(quantity),
      entryTime,
      exitTime,
      commission: parseFloat(commission) || 0,
      pnl,
      pnlPercentage,
      status,
      notes,
      screenshots
    });
    
    await trade.save();
    
    // Update Account Stats
    const account = await Account.findById(accountId);
    account.currentBalance += pnl;
    account.totalPnL += pnl;
    account.totalTrades += 1;
    if (status === 'WIN') account.winningTrades += 1;
    account.winRate = ((account.winningTrades / account.totalTrades) * 100).toFixed(2);
    await account.save();
    
    res.status(201).json({ message: 'Trade logged successfully', trade, updatedBalance: account.currentBalance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Trades for Account
router.get('/account/:accountId', authMiddleware, async (req, res) => {
  try {
    const trades = await Trade.find({ accountId: req.params.accountId }).sort({ createdAt: -1 });
    res.json(trades);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
