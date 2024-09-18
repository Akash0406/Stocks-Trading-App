const fetch = require('node-fetch');

async function getStockPrice(symbol) {
    const apiKey = 'crcoge9r01qibo2g3sg0crcoge9r01qibo2g3sgg';
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
    const data = await response.json();
    return data.c; // 'c' is current price
}

module.exports = { getStockPrice };
