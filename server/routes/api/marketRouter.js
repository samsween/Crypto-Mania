const router = require("express").Router();
const {
  getHistoricalData,
  getMarketData,
} = require("../../controller/marketController");
const {
  marketCache,
  historicalCryptoCache,
} = require("../../middleware/cryptoCache");

router.get("/market", marketCache, getMarketData);

router.get("/historical", historicalCryptoCache, getHistoricalData);
