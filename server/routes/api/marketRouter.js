const router = require("express").Router();
const marketController = require("../../controller/marketController");
const cryptoMiddleware = require("../../middleware/cryptoCache");

router.get(
  "/market",
  cryptoMiddleware.marketCache,
  marketController.getMarketData
);

router.get(
  "/historical",
  cryptoMiddleware.historicalCryptoCache,
  marketController.getHistoricalData
);

module.exports = router;
