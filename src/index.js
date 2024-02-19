const express = require("express");
const dotenv = require("dotenv");
const app = express();
const productController = require("./product/product.controller");

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Start");
});

app.use("/products", productController);

app.listen(PORT, () => {
  console.log("API Runing " + PORT);
});
