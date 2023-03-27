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
