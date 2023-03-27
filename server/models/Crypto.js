const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boughtPositionsSchema = new Schema({
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
    required: true,
  },
});

const soldPositionsSchema = new Schema({
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
    required: true,
  },
});

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
