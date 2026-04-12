# 💱 FreelanceX — AI-Powered Currency Arbitration Platform

> **Team:** Vector Minds | **Hackathon:** OpenPools 2026

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?style=for-the-badge&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3.8-22B5BF?style=for-the-badge)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## 🚀 Problem Statement

Freelancers working globally lose **3–8% of their earnings** due to unfavorable exchange rates, hidden platform fees, and currency conversion charges. There is no centralized tool to help them choose the **optimal invoicing currency** based on real-time market data.

## 💡 Our Solution

**FreelanceX** is an AI-powered currency intelligence platform that helps freelancers **maximize their global earnings** by:

- 🔍 Finding the **best currency** to invoice in using real-time arbitration analysis
- 📊 Providing **live exchange rate analytics** with historical trends & AI predictions
- 🧮 Simulating **net earnings** across 100+ currencies after platform fees
- 🧾 Generating **smart invoices** that calculate the exact bill amount to meet your desired payout
- ⚡ Offering a **typing speed performance tracker** for freelancer skill verification

---

## ✨ Key Features

### 🏠 Dashboard
- Live arbitration feed with real-time API data
- Global currency heatmap (stability & volatility by region)
- Live market depth (USD/INR liquidity & orderbook visualization)
- Dashboard cards with portfolio overview
- Live activity feed — real-time arbitration execution routing

### 💱 Currency Converter
- Multi-currency conversion across **120+ currencies**
- Quick amount presets & currency swap
- Real-time exchange rates from [Open Exchange Rates API](https://open.er-api.com/)

### 📈 Arbitration Optimizer
- AI-ranked currencies by **effective USD** after platform fees
- Spread percentages & gross vs. net comparison
- Visual ranking with flag indicators

### 🧾 Smart Invoice Generator
- Input your desired payout → get the exact invoice amount
- Factor in platform fees, spreads, and conversion costs
- Anti-fee engine to eliminate hidden charges

### 📊 Analytics & Predictions
- Historical exchange rate charts (24h / 7d / 30d)
- AI predictive trend alerts
- Currency risk radar (volatility scores)
- Profit prediction engine

### 🎯 Earnings Simulator
- Model earnings across 10+ currency scenarios
- Worst-case & best-case projections
- Platform fee routing breakdown (smart contract visualization)

### ⌨️ Performance Tracker
- Typing speed (WPM) & accuracy tests
- Skill verification for premium client tiers

### 🤖 AI Assistant
- Built-in AI chatbot powered by Gemini
- Answers currency-related questions in real-time

### 🔐 Authentication
- Local sign-up & login system
- Human verification check
- Profile management with avatar support

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite 5, JSX |
| **Styling** | TailwindCSS 3.4, Custom CSS (94K+ lines) |
| **Animations** | Framer Motion 12, CSS Animations |
| **3D Graphics** | Three.js (React Three Fiber + Drei) |
| **Charts** | Recharts 3.8 |
| **Icons** | Lucide React |
| **API** | Open Exchange Rates API (real-time) |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB (Mongoose 9) |
| **Auth** | JWT, bcryptjs |
| **AI** | Google Gemini API |

---

## 📁 Project Structure

```
freelance-marketplace/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── AIAssistant.jsx          # AI chatbot
│   │   ├── ArbitrationSuggestions.jsx # Best currency ranking
│   │   ├── Background3D.jsx         # 3D animated background
│   │   ├── CurrencyArbitrator.jsx   # Arbitration engine
│   │   ├── CurrencyConverter.jsx    # Multi-currency converter
│   │   ├── CurrencyHeatmap.jsx      # Global heatmap
│   │   ├── DashboardCards.jsx       # Stats cards
│   │   ├── EarningsChart.jsx        # Rate charts
│   │   ├── EarningsSimulator.jsx    # Scenario modeler
│   │   ├── LiveActivityFeed.jsx     # Real-time feed
│   │   ├── LiveMarketDepth.jsx      # Market depth
│   │   ├── LoginPage.jsx            # Auth system
│   │   ├── Navbar.jsx               # Navigation + ticker
│   │   ├── PerformanceStats.jsx     # Typing test
│   │   ├── PlatformFeeBreakdown.jsx # Fee routing
│   │   ├── PredictiveTrend.jsx      # AI predictions
│   │   ├── ProfileModal.jsx         # User profile
│   │   ├── ProfitPrediction.jsx     # Profit engine
│   │   ├── RiskIndicator.jsx        # Risk radar
│   │   ├── SmartInvoiceGenerator.jsx # Invoice tool
│   │   └── TypingTest.jsx           # WPM test
│   ├── hooks/
│   │   └── useExchangeRates.js      # Live exchange rate engine
│   ├── App.jsx                      # Main app
│   ├── App.css
│   ├── index.css                    # Design system (94K+)
│   └── main.jsx
├── server/
│   ├── server.js                    # Express API server
│   └── models/
│       └── User.js                  # User model
├── index.html
├── package.json
├── vite.config.mjs
├── tailwind.config.js
├── vercel.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ 
- **npm** v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/abdulhaque2005/vector-minds.git
cd vector-minds

# Install frontend dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Backend (Optional)

The frontend works standalone with live exchange rate APIs. To run the backend:

```bash
cd server
npm install
node server.js
```

> **Note:** Backend requires MongoDB connection. Set `MONGO_URI` in `.env`.

---

## 🌐 Live Demo

**Deployed on Vercel:** [FreelanceX Live](https://vector-minds.vercel.app)

---

## 📸 Screenshots

| Dashboard | Converter | Analytics |
|-----------|-----------|-----------|
| Live arbitration feed, heatmap, market depth | 120+ currency conversion | Historical trends & AI predictions |

---

## 🧠 How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   User Input    │────▶│  Exchange Rate    │────▶│   Arbitration   │
│  (Invoice Amt)  │     │   API (Live)      │     │    Engine       │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                        ┌──────────────────┐              │
                        │  Smart Invoice   │◀─────────────┤
                        │   Generator      │              │
                        └──────────────────┘     ┌────────▼────────┐
                                                 │  Best Currency  │
                                                 │  Recommendation │
                                                 └─────────────────┘
```

1. **Fetches live exchange rates** from Open Exchange Rates API
2. **Applies spread & fee calculations** for each currency
3. **Ranks currencies** by effective USD equivalent
4. **Simulates** worst-case / best-case scenarios
5. **Generates smart invoices** with anti-fee calculations

---

## 👥 Team — Vector Minds

| Member | Role |
|--------|------|
| **Abdul Haque** | Full Stack Developer & Team Lead |

---

## 📄 License

This project is built for the **OpenPools 2026 Hackathon**.

---

<div align="center">

**Built with ❤️ by Vector Minds**

*Empowering freelancers to earn more, everywhere.* 🌍

</div>
