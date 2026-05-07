# 🎯 Trading Journal & Propfirm Bootcamp

A full-featured trading journal and propfirm challenge simulator with automated rule enforcement.

## ✨ Features

### 📝 Trading Journal
- ✅ Manual trade logging (LONG/SHORT)
- ✅ Picture/Screenshot uploads (up to 5 per trade)
- ✅ Automatic P&L calculation
- ✅ Trade history & filtering
- ✅ Win rate tracking

### 🎯 Challenge System
- ✅ Create custom propfirm-style challenges
- ✅ Set custom account balances
- ✅ Define target profit goals
- ✅ Set challenge duration (start/end dates)
- ✅ Real-time challenge progress tracking

### 🛡️ Automated Rule Enforcement
- ✅ **Daily Loss Limit** - Prevents exceeding daily loss threshold
- ✅ **Max Drawdown** - Stops trading if account decline exceeds limit
- ✅ **Max Loss Per Trade** - Enforces per-trade loss limits
- ✅ **Win Rate Requirements** - Optional minimum win rate enforcement
- ✅ **Challenge Expiration** - Automatic failure on date expiration
- ✅ **Real-time Breach Detection** - Instant alerts on rule violations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/martinsegun12/trading-journal.git
   cd trading-journal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your values:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Random secret key for JWT
   - `PORT`: Server port (default: 5000)

4. **Start the server**
   ```bash
   npm run dev
   ```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
```
POST /api/auth/register     - Register new user
POST /api/auth/login        - Login user
```

### Accounts
```
POST /api/accounts          - Create trading account
GET  /api/accounts          - Get all accounts
GET  /api/accounts/:id      - Get single account
```

### Trades
```
POST /api/trades            - Log new trade (with screenshots)
GET  /api/trades/account/:accountId - Get all trades for account
```

### Challenges
```
POST /api/challenges        - Create new challenge
GET  /api/challenges        - Get all challenges
GET  /api/challenges/:id/status - Get challenge status & rule violations
```

## 💰 Example Usage

### 1. Register & Login
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"trader","email":"trader@example.com","password":"pass123"}'
```

### 2. Create Trading Account
```bash
curl -X POST http://localhost:5000/api/accounts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"accountName":"MyAccount","accountType":"CHALLENGE","initialBalance":10000}'
```

### 3. Start a Challenge
```bash
curl -X POST http://localhost:5000/api/challenges \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "accountId":"ACCOUNT_ID",
    "challengeName":"FTMO Challenge",
    "initialBalance":10000,
    "targetProfit":1000,
    "maxDrawdown":5,
    "dailyLossLimit":300,
    "maxLossPerTrade":100,
    "minWinRate":50,
    "startDate":"2026-05-07",
    "endDate":"2026-07-07"
  }'
```

### 4. Log a Trade
```bash
curl -X POST http://localhost:5000/api/trades \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "accountId=ACCOUNT_ID" \
  -F "symbol=EURUSD" \
  -F "direction=LONG" \
  -F "entryPrice=1.0950" \
  -F "exitPrice=1.0975" \
  -F "quantity=1.5" \
  -F "entryTime=2026-05-07T10:30:00" \
  -F "exitTime=2026-05-07T12:00:00" \
  -F "commission=5" \
  -F "notes=Good support bounce" \
  -F "screenshots=@screenshot1.png" \
  -F "screenshots=@screenshot2.png"
```

### 5. Check Challenge Status
```bash
curl http://localhost:5000/api/challenges/CHALLENGE_ID/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 Challenge Status Response

```json
{
  "challenge": {
    "_id": "...",
    "status": "ACTIVE",
    "totalPnL": 500,
    "winningTrades": 3,
    "totalTrades": 5,
    "breachedRules": []
  },
  "ruleStatus": {
    "passed": true,
    "breachedRules": []
  },
  "summary": {
    "initialBalance": 10000,
    "currentBalance": 10500,
    "pnl": 500,
    "pnlPercentage": "5.00",
    "targetProfit": 1000,
    "daysRemaining": 43,
    "status": "ACTIVE"
  }
}
```

## 🛡️ Rule Breach Example

When rules are breached, you'll receive alerts like:
```json
{
  "breachedRules": [
    "MAX_DRAWDOWN_EXCEEDED: 8.50% > 5%",
    "DAILY_LOSS_LIMIT_EXCEEDED: $450 > $300",
    "MAX_TRADE_LOSS_EXCEEDED on EURUSD: $150 > $100"
  ],
  "status": "FAILED",
  "failureReason": "Multiple rule violations"
}
```

## 📁 Project Structure
```
trading-journal/
├── models/              # Database schemas
│   ├── User.js
│   ├── Account.js
│   ├── Trade.js
│   └── Challenge.js
├── routes/              # API endpoints
│   ├── auth.js
│   ├── accounts.js
│   ├── trades.js
│   └── challenges.js
├── middleware/          # Authentication
│   └── auth.js
├── utils/               # Helpers
│   └── ruleChecker.js
├── uploads/             # Screenshot storage
├── server.js            # Main app
├── package.json
├── .env.example
└── README.md
```

## 🌐 GitHub Pages Deployment

GitHub Pages only hosts static sites. For this Node.js backend, you need:
- **Vercel** (recommended for Node.js) - https://vercel.com
- **Railway** - https://railway.app
- **Render** - https://render.com
- **Heroku** - https://heroku.com

For frontend hosting on GitHub Pages, build a React/Vue app and push to `gh-pages` branch.

## 📝 License

ISC

## 🤝 Contributing

Contributions welcome! Please submit PRs.
