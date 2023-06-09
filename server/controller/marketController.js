const dayjs = require("dayjs");
const { default: axios } = require("axios");
const {
  setHistoricalCryptoCache,
  setMarketCache,
} = require("../middleware/cryptoCache");
const URL = "https://api.coingecko.com/api/v3/";

function formatData(historicalData) {
  let obj = {};
  for (const key in historicalData) {
    for (let i = 0; i < historicalData[key].length; i++) {
      const date = dayjs(historicalData[key][i][0]);
      const price = historicalData[key][i][1];
      if (!obj[key]) {
        obj[key] = [];
      }
      obj[key].push({ date, price });
    }
  }
  return obj;
}

module.exports = {
  getHistoricalData: async (req, res) => {
    const { id, days } = req.query;
    try {
      const response = await axios.get(
        `${URL}coins/${id}/market_chart?vs_currency=aud&days=${days}`
      );
      const data = await response.data;
      if (!data.prices) {
        return res.status(400).json({ error: "Error fetching coin data" });
      }
      const sortedData = formatData(data);
      setHistoricalCryptoCache(id, days, sortedData);
      res.json(sortedData);
    } catch (err) {
      res.status(500).json({ error: "An error occured" });
    }
  },
  getMarketData: async (req, res) => {
    try {
      const response = await axios.get(
        `${URL}coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      const data = await response.data;
      if (!data.length) {
        return res.status(400).json({ error: "Error fetching market data" });
      }
      setMarketCache(data);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "An error occured" });
    }
  },
};
