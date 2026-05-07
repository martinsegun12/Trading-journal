const express = require('express');
const Account = require('../models/Account');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create Account
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { accountName, accountType, initialBalance } = req.body;
    const account = new Account({
      userId: req.userId,
      accountName,
      accountType,
      initialBalance,
      currentBalance: initialBalance
    });
    await account.save();
    res.status(201).json({ message: 'Account created', account });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Accounts
router.get('/', authMiddleware, async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.userId });
    res.json(accounts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Single Account
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.params.id, userId: req.userId });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
