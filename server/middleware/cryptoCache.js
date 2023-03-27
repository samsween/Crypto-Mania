const Cache = require("node-cache");
const cache = new Cache({
  stdTTL: 60,
});

const marketCache = (req, res, next) => {
  const key = "marketData";
  const cached = cache.get(key);
  if (cached) {
    res.json(cached);
  } else {
    next();
  }
};

const setMarketCache = (data) => {
  const key = "marketData";
  cache.set(key, data);
};

const historicalCryptoCache = (req, res, next) => {
  const { id, days } = req.query;
  console.log(id, days);
  const key = `historicalData-${id}-${days}`;
  const cached = cache.get(key);
  if (cached) {
    res.json(cached);
  } else {
    next();
  }
};

const setHistoricalCryptoCache = (id, days, data) => {
  const key = `historicalData-${id}-${days}`;
  cache.set(key, data);
};

module.exports = {
  marketCache,
  setMarketCache,
  historicalCryptoCache,
  setHistoricalCryptoCache,
};
