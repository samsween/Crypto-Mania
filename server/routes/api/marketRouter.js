const router = require("express").Router();
const {
  getHistoricalData,
  getMarketData,
} = require("../../controller/marketController");

router.get("/market", getMarketData);

router.get("/historical", getHistoricalData);
