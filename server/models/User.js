const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  heldCrypto: [
    {
      type: Schema.Types.ObjectId,
      ref: "Crypto",
    },
  ],
  money: {
    type: Number,
    default: 50000,
  },
});
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = await hashPassword(this.password);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};

module.exports = mongoose.model("User", userSchema);
