const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: { String, required: true },
  email: { String, required: true },
  password: { String, required: true },
  address: { String, required: true },
  phone: { String, required: true },
  isVerified: { Boolean, default: false },
  bankAccount: { Number, required: true },
});

module.exports = mongoose.model("Seller", sellerSchema);
