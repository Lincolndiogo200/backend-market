const mongoose = require("mongoose");

const Product = mongoose.model("product", {
  name: { type: String, required: true },
  inSale: { type: Boolean },
  price: { type: Number, required: true },
  percent: { type: String },
  type: { type: String, required: true },
  description: { type: String, required: true },
  expiresIn: { type: String, required: true },
});

module.exports = Product;
