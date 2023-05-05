const mongoose = require("mongoose");
const dayjs = require("dayjs");
const Schema = mongoose.Schema;

const boughtPositionsSchema = new Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
      required: true,
      get: (date) => dayjs(date).format("DD/MM/YYYY HH:mm:ss"),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

boughtPositionsSchema.path("quantity").set(function (num) {
  return parseFloat(num).toFixed(8);
});


const soldPositionsSchema = new Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
      required: true,
      get: (date) => dayjs(date).format("DD/MM/YYYY HH:mm:ss"),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

soldPositionsSchema.path("quantity").set(function (num) {
  return parseFloat(num).toFixed(8);
});


const cryptoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    boughtPositions: {
      type: [boughtPositionsSchema],
      default: [],
    },
    soldPositions: {
      type: [soldPositionsSchema],
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);
// set max 8 decimal places
cryptoSchema.path("total").set(function (num) {
  return parseFloat(num).toFixed(8);
});

module.exports = mongoose.model("Crypto", cryptoSchema);
