const express = require('express');
const Challenge = require('../models/Challenge');
const Account = require('../models/Account');
const Trade = require('../models/Trade');
const authMiddleware = require('../middleware/auth');
const RuleChecker = require('../utils/ruleChecker');
const router = express.Router();

// Create Challenge
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { accountId, challengeName, initialBalance, targetProfit, maxDrawdown, dailyLossLimit, maxLossPerTrade, minWinRate, startDate, endDate } = req.body;
    
    const challenge = new Challenge({
      accountId,
      userId: req.userId,
      challengeName,
      initialBalance,
      currentBalance: initialBalance,
      targetProfit: parseFloat(targetProfit),
      maxDrawdown: parseFloat(maxDrawdown),
      dailyLossLimit: parseFloat(dailyLossLimit),
      maxLossPerTrade: parseFloat(maxLossPerTrade),
      minWinRate: parseFloat(minWinRate) || 0,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: 'ACTIVE'
    });
    
    await challenge.save();
    res.status(201).json({ message: 'Challenge created', challenge });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Challenge Status with Rule Violations
router.get('/:challengeId/status', authMiddleware, async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ _id: req.params.challengeId, userId: req.userId });
    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
    
    const trades = await Trade.find({ accountId: challenge.accountId });
    const ruleCheck = RuleChecker.checkRules(challenge, trades);
    
    if (!ruleCheck.passed && challenge.status === 'ACTIVE') {
      challenge.status = 'FAILED';
      challenge.failureReason = ruleCheck.breachedRules.join('; ');
      challenge.breachedRules = ruleCheck.breachedRules;
      await challenge.save();
    }
    
    res.json({
      challenge,
      ruleStatus: ruleCheck,
      summary: {
        initialBalance: challenge.initialBalance,
        currentBalance: challenge.currentBalance,
        pnl: challenge.totalPnL,
        pnlPercentage: ((challenge.totalPnL / challenge.initialBalance) * 100).toFixed(2),
        targetProfit: challenge.targetProfit,
        daysRemaining: Math.ceil((challenge.endDate - new Date()) / (1000 * 60 * 60 * 24)),
        status: challenge.status
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Challenges
router.get('/', authMiddleware, async (req, res) => {
  try {
    const challenges = await Challenge.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(challenges);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
