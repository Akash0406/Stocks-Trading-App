# MAC Stock Trading App

A simple **paper-trading** web app to practice buying and selling NASDAQ stocks with virtual funds. Track portfolio value, profit/loss, and manage holdings from a clean dashboard.

**Live Demo:** https://stocks-akash0406.vercel.app/

---

## ✨ Features
- **Dashboard**
  - Total portfolio **Value** and **Profit/Loss**.
  - Holdings table with **Symbol**, **Current Price/Value**, **Shares**, **P/L**.
  - Click a holding to open the **Sell** modal.
- **Buy Page** (`/buy`)
  - Type a NASDAQ symbol (e.g., `AAPL`, `MSFT`) and fetch the latest price.
  - Quantity input auto-updates **Total**.
  - Basic validation for invalid symbols.
- **Sell Modal**
  - Shows **purchase price** and **total shares owned**.
  - Sell any amount; stats update accordingly.
- **Price Source**
  - Designed to work with real-time/near‑real‑time stock APIs (e.g., Finnhub). Prices should be ≤ 1 day old.
- **Deployable**
  - Ready to host on **Vercel** out of the box.

> Note: This repository focuses on the frontend trading flow. You can connect a cloud database to persist holdings (examples below), or keep it stateless for demo purposes.

---

## 🧱 Tech Overview
- **Frontend:** Modern JavaScript single-page app (HTML/CSS/JS)
- **Hosting:** Vercel
- **Stock Prices:** Any compatible provider (e.g., Finnhub)
- **Optional Persistence:** Supabase / Firebase / MongoDB Atlas

---

## 🚀 Quick Start

### 1) Clone & Install
```bash
git clone https://github.com/Akash0406/Stocks-Trading-App.git
cd Stocks-Trading-App
npm install
```

### 2) Environment Variables
Create a `.env.local` (or `.env`) in the project root and add:

```bash
# Choose the prefix that matches your bundler. If unsure, keep both.
VITE_FINNHUB_API_KEY=your_finnhub_api_key
NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key

# Optional (only if you wire a database)
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# or Firebase, MongoDB Atlas, etc.
```

> Get a free Finnhub key at https://finnhub.io (free tier has rate limits). If you use a different provider, expose your key with the appropriate public prefix your bundler requires.

### 3) Run Locally
Most setups use one of the following:
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # (If available) Serve the production build locally
```
Check your `package.json` for the exact scripts.

### 4) Deploy
- **Vercel:** Import the repository, set the same environment variables in your Vercel Project → *Settings → Environment Variables*, and deploy.

---

## 🗂️ Project Structure (high level)
```
Stocks-Trading-App/
├─ public/            # Static assets (icons, logos)
├─ src/               # Application source
│  ├─ components/     # Reusable UI pieces (e.g., tables, modals)
│  ├─ pages/ or routes/ (depending on bundler)
│  ├─ lib/ or utils/  # API clients, helpers (e.g., price fetcher)
│  └─ styles/         # Global styles
├─ config/            # Deployment / build config
├─ package.json
├─ vercel.json        # Vercel configuration (if present)
└─ README.md
```
> Folder names may vary slightly depending on the framework/bundler.

---

## 🔌 Wiring a Database (Optional)
To persist portfolio/transactions, connect a hosted DB.

### Option A: Supabase (Postgres)
- Create a Supabase project → copy **URL** and **anon key**.
- Create tables `holdings`, `transactions` (schema of your choice).
- Use the JS client (`@supabase/supabase-js`) to read/write holdings.

### Option B: Firebase (Firestore)
- Enable Firestore, create collections `holdings`, `transactions`.
- Restrict access with security rules and least-privilege roles.

### Option C: MongoDB Atlas
- Create a free cluster and database.
- Use a simple serverless function (Vercel Functions) to proxy writes.

> Keep keys server-side where possible; only expose public keys in the client. For write operations, prefer secure endpoints (e.g., Vercel/Cloud Functions) instead of client‑side direct writes.

---

## 🧮 Price Lookup
Example response shape for a typical price provider:
```json
{
  "symbol": "AAPL",
  "price": 227.15,
  "timestamp": 1730785200
}
```
Map this into your app’s price store and recompute:
- Position P/L: `(currentPrice - buyPrice) * shares`
- Portfolio P/L: `sum(position P/L)`
- Total Value: `sum(currentPrice * shares)`

---

## 📸 Screenshots (add yours)
Place images under `docs/screenshots/` and uncomment the links below.

<!--
![Dashboard](./docs/screenshots/dashboard.png)
![Buy Flow](./docs/screenshots/buy.png)
![Sell Modal](./docs/screenshots/sell-modal.png)
-->

---

## 🧰 Scripts & Tooling
Common scripts (check your `package.json`):
- `dev` – start local dev server
- `build` – production build
- `preview`/`start` – serve the production build

Recommended tooling:
- Prettier + ESLint for formatting/linting
- GitHub Actions for CI (build/check)

---

## ✅ Roadmap
- [ ] Persist holdings to a cloud DB
- [ ] Add authentication (email/OTP or OAuth)
- [ ] Historical charts and price sparkline
- [ ] Portfolio analytics (sector allocation, daily P/L)
- [ ] Unit tests for price & P/L calculations

---

## 🤝 Contributing
Issues and PRs are welcome. If you’re using this as a take‑home exercise, keep to the original rules of your assignment.

---

## 📄 License
No license specified. If you intend others to use/modify this, consider adding an OSS license (e.g., MIT).

---

## 🙏 Acknowledgements
- Hosting via **Vercel**
- Stock price API ideas: **Finnhub** (or any compatible provider)

