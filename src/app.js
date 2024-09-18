const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const Portfolio = require('./model/Portfolio');
const connectDB = require('../config/database');

app.use(express.json());
app.use(bodyParser.json());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));

// CORS configuration
app.use(cors({
    origin: ["https://Stocks-Trading-App.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  }));

// Route to serve the purchase.html page
app.get('/purchase', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/purchase.html'));
});


app.post('/api/portfolio', async (req, res) => {
    const { symbol, units, unitPrice, purchasePrice, purchaseDate } = req.body;
    try {
        let stock = await Portfolio.findOne({ symbol });
        if (stock) {
            res.status(405).json({ message: 'Stock already purchased can not purchase again' });
        } else {
            // If stock doesn't exist, create a new entry with purchase price
            const newStock = new Portfolio({
                symbol,
                units,
                unitPrice,
                purchasePrice,
                purchaseDate
            });
            await newStock.save();
            res.status(200).json({ message: 'Stock purchased successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error purchasing stock', error });
    }
});


app.get('/api/portfolio', async (req, res) => {
    try {
        const portfolio = await Portfolio.find(); // Fetch portfolio items from MongoDB
        let totalValueNow = 0;
        let totalValueAtPurchase = 0;
        
        // Calculate total value and profit/loss
        for (const stock of portfolio) {
            const stockPrice = await getStockPrice(stock.symbol);
            totalValueNow += stock.units * stockPrice;
            totalValueAtPurchase += stock.units * stock.unitPrice;
        }
        const totalProfitLoss = totalValueNow - totalValueAtPurchase;        
        res.status(200).json({ totalValueNow, totalProfitLoss, portfolio });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolio data', error });
    }
});

app.post('/api/portfolio/sell', async (req, res) => {
    const { symbol, unitsToSell } = req.body;
    try {
        let stock = await Portfolio.findOne({ symbol });
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        // Check if there are enough units to sell
        if (stock.units < unitsToSell) {
            return res.status(400).json({ message: 'Not enough units to sell' });
        }

        // Update the stock units
        stock.units -= unitsToSell;

        // If units become zero, optionally remove the stock or handle it as needed
        if (stock.units === 0) {
            await Portfolio.deleteOne({ symbol });
            return res.status(200).json({ message: 'Stock sold and removed from portfolio' });
        }

        // Save the updated stock
        await stock.save();``
        res.status(200).json({ message: 'Stock sold successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error selling stock', error });
    }
});


async function getStockPrice(symbol) {
    const apiKey = 'crcoge9r01qibo2g3sg0crcoge9r01qibo2g3sgg';
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
    const data = await response.json();
    return data.c; // 'c' is current price
}

const PORT = process.env.PORT || 4000;
console.log(process.env.PORT);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database', error);
  });