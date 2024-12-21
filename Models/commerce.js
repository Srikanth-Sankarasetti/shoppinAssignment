const mongoose = require("mongoose");

const ecommerceShema = new mongoose.Schema({
  domain: { type: String, required: true },
  url: { type: [String], required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Ecommerce = mongoose.model("Ecommerces", ecommerceShema);

module.exports = Ecommerce;
