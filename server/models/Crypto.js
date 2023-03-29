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
    },
  }
);

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
    },
  }
);

const cryptoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("Crypto", cryptoSchema);
