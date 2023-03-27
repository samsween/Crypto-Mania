const router = require("express").Router();
const dayjs = require("dayjs");
const axios = require("axios");
const URL = "https://api.coingecko.com/api/v3/";

router.get("/market", async (req, res) => {
  try {
    const response = await fetch(
      `${URL}coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    const data = await response.json();
    if (!data.length) {
      return res.status(400).json({ message: "Error fetching market data" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "An error occured" });
  }
});

router.get("/historical", async (req, res) => {
  const { id, days } = req.query;
  try {
    const response = await fetch(
      `${URL}coins/${id}/market_chart?vs_currency=aud&days=${days}`
    );
    const data = await response.json();
    if (!data.prices) {
      return res.status(400).json({ message: "Error fetching coin data" });
    }
    const sortedData = formatData(data);
    res.json(sortedData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occured" });
  }
});

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
