const Crypto = require("../models/Crypto");
const User = require("../models/User");

module.exports = {
  getCrypto: (req, res) => {
    Crypto.find({ user: req.user.id })
      .then((crypto) => {
        res.json(crypto);
      })
      .catch((err) => {
        return res.status(500).json({ error: "Server error" });
      });
  },
  addCrypto: ({ body, user }, res) => {
    const { name, symbol, price, quantity } = body;
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
                .then((user) => {
                  return res.json(crypto);
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
                  .then((user) => {
                    res.json(crypto);
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