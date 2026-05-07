class RuleChecker {
  static checkRules(challenge, trades) {
    const breachedRules = [];
    const balance = challenge.initialBalance + challenge.totalPnL;
    
    // 1. Check Max Drawdown
    const drawdown = ((challenge.initialBalance - balance) / challenge.initialBalance) * 100;
    if (drawdown > challenge.maxDrawdown) {
      breachedRules.push(`MAX_DRAWDOWN_EXCEEDED: ${drawdown.toFixed(2)}% > ${challenge.maxDrawdown}%`);
    }
    
    // 2. Check Daily Loss Limit
    const today = new Date().toDateString();
    const todayTrades = trades.filter(t => new Date(t.exitTime).toDateString() === today);
    const todayPnL = todayTrades.reduce((sum, t) => sum + t.pnl, 0);
    if (todayPnL < -challenge.dailyLossLimit) {
      breachedRules.push(`DAILY_LOSS_LIMIT_EXCEEDED: $${Math.abs(todayPnL)} > $${challenge.dailyLossLimit}`);
    }
    
    // 3. Check Max Loss Per Trade
    trades.forEach(trade => {
      if (trade.pnl < -challenge.maxLossPerTrade) {
        breachedRules.push(`MAX_TRADE_LOSS_EXCEEDED on ${trade.symbol}: $${Math.abs(trade.pnl)} > $${challenge.maxLossPerTrade}`);
      }
    });
    
    // 4. Check Target Profit
    if (challenge.totalPnL >= challenge.targetProfit) {
      return { passed: true, reason: 'TARGET_PROFIT_REACHED', breachedRules: [] };
    }
    
    // 5. Check Win Rate
    if (challenge.totalTrades > 0) {
      const winRate = (challenge.winningTrades / challenge.totalTrades) * 100;
      if (challenge.minWinRate && winRate < challenge.minWinRate) {
        breachedRules.push(`MIN_WIN_RATE_NOT_MET: ${winRate.toFixed(2)}% < ${challenge.minWinRate}%`);
      }
    }
    
    // 6. Check if Challenge Period Expired
    if (new Date() > challenge.endDate) {
      return { passed: false, reason: 'CHALLENGE_EXPIRED', breachedRules: ['CHALLENGE_TIME_EXPIRED'] };
    }
    
    return { passed: breachedRules.length === 0, breachedRules };
  }
}

module.exports = RuleChecker;
