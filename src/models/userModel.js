const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  createdAt: { type: String, required: true },
});

module.exports = User;
