# 🎨 Trading Journal Frontend

A modern React dashboard for the Trading Journal & Propfirm Bootcamp application.

## ✨ Features

- 🔐 Secure authentication (Login/Register)
- 📊 Dashboard with account statistics
- 📝 Trade journal with manual logging
- 📷 Screenshot uploads for trades
- 🎯 Propfirm challenge tracking
- 📈 Real-time P&L tracking
- 🚨 Rule breach alerts
- ⚙️ Account settings and overview

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your API URL:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   Opens at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` directory.

### Deploy to GitHub Pages

```bash
npm run deploy
```

Automatically builds and deploys to GitHub Pages.

## 📱 Pages

### 🔐 Authentication
- **Login** - Sign in with email and password
- **Register** - Create new account

### 📊 Dashboard
- Overview of all accounts
- Total balance and P&L tracking
- Active challenges overview
- Create new trading accounts

### 📝 Trade Journal
- Log manual trades with details
- Entry/Exit prices, quantity, commission
- Upload screenshots per trade
- View trade history with filtering
- Track win rate and P&L

### 🎯 Challenges
- Start propfirm-style challenges
- Set custom rules and targets
- Real-time progress tracking
- Rule breach detection
- Challenge status modal

### ⚙️ Settings
- User profile information
- Account overview
- Trading tips
- API information

## 🎨 UI/UX Design

- **Dark Theme**: Professional dark gradient background
- **Neon Accents**: Cyan (#00d4ff) and green (#00ff88) highlights
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Spinners and loading indicators

## 🔗 API Integration

Frontend connects to backend API at configured `REACT_APP_API_URL`.

### Key Endpoints Used:
```
POST   /auth/login
POST   /auth/register
GET    /accounts
POST   /accounts
GET    /accounts/:id
POST   /trades
GET    /trades/account/:accountId
POST   /challenges
GET    /challenges
GET    /challenges/:id/status
```

## 🔒 Security

- JWT tokens stored in localStorage
- Automatic token refresh on request
- Unauthorized redirect on 401 error
- Password confirmation on registration

## 📦 Dependencies

- `react` - UI framework
- `react-router-dom` - Routing
- `axios` - HTTP client
- `date-fns` - Date utilities

## 🚀 Deployment

### GitHub Pages
```bash
npm run deploy
```

### Vercel
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod --dir=build
```

## 📝 Environment Variables

```
REACT_APP_API_URL=http://localhost:5000/api  # Backend API URL
```

For production:
```
REACT_APP_API_URL=https://your-backend-api.com/api
```

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend has CORS enabled
- Check `REACT_APP_API_URL` is correct
- Backend should allow `http://localhost:3000` in development

### Login Issues
- Clear browser localStorage: `localStorage.clear()`
- Check API connection
- Verify credentials

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)
- [Date-fns](https://date-fns.org)

## 📄 License

ISC
