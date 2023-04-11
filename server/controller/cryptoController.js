const { setMarketCache, cache } = require("../middleware/cryptoCache");
const Crypto = require("../models/Crypto");
const User = require("../models/User");
module.exports = {
  getCrypto: (req, res) => {
    Crypto.find({ user: req.user.id })
      .then(async (crypto) => {
        let data;
        if (cache.get("marketData")) {
          data = cache.get("marketData");
        } else {
          const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
          );
          data = await res.json();
          setMarketCache(data);
        }
        const cryptoWithPrice = crypto.map((crypto) => {
          const cryptoData = data.find((cryptoData) => {
            return (
              cryptoData.symbol.toLowerCase() === crypto.symbol.toLowerCase()
            );
          });
          return {
            ...crypto._doc,
            current_price: cryptoData.current_price,
          };
        });
        return res.json(cryptoWithPrice);
      })
      .catch((err) => {
        return res.status(500).json({ error: "Server error" });
      });
  },
  addCrypto: ({ body, user }, res) => {
    const { name, symbol, price, quantity, image } = body;
    const userId = user.id;
    User.findById(userId)
      .then((user) => {
        if (user.money < parseFloat(price))
          return res.status(400).json({ error: "Not enough money" });
        Crypto.findOne({ symbol, user: userId }).then((crypto) => {
          console.log(crypto);
          if (!crypto) {
            Crypto.create({
              name,
              symbol,
              price,
              quantity,
              image,
              boughtPositions: [{ price, quantity, date: new Date() }],
              total: parseFloat(quantity),
              user: userId,
            }).then((crypto) => {
              user
                .updateOne(
                  {
                    $inc: { money: -parseFloat(price) },
                  },
                  { new: true }
                )
                .then(() => {
                  return res.json({ money: user.money - parseFloat(price) });
                });
            });
          } else {
            crypto
              .updateOne(
                {
                  $inc: { total: parseFloat(quantity) },
                  $push: {
                    boughtPositions: { price, quantity, date: new Date() },
                  },
                },
                { new: true }
              )
              .then((crypto) => {
                user
                  .updateOne(
                    {
                      $inc: { money: -parseFloat(price) },
                    },
                    { new: true }
                  )
                  .then(() => {
                    res.json({ money: user.money - parseFloat(price) });
                  });
              });
          }
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Server error" });
      });
  },
  sellCrypto: ({ body, user }, res) => {
    const { symbol, quantity, price } = body;
    const userId = user.id;
    Crypto.findOne({ symbol, user: userId })
      .then((crypto) => {
        if (crypto.total < parseFloat(quantity))
          return res.status(400).json({ error: "Not enough crypto" });
        crypto
          .updateOne(
            {
              $inc: { total: -parseFloat(quantity) },
              $push: {
                soldPositions: { price, quantity, date: new Date() },
              },
            },
            { new: true }
          )
          .then((crypto) => {
            User.findOneAndUpdate(
              { __id: userId },
              {
                $inc: { money: parseFloat(price) },
              },
              { new: true }
            );
            return res.json(crypto);
          });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Server error" });
      });
  },
};
