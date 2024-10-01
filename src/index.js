const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.3dlwa.mongodb.net/?retryWrites=true&w=majority&appName=APICluster`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/product", productRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "Oi!",
  });
});
