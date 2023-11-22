const express = require("express");
const dotenv = require("dotenv");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Start");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!product) {
    res.status(400).json({ message: "product not found" });
  }

  res.send({ message: "Get data by id success", data: product });
});

app.post("/products", async (req, res) => {
  const newProduct = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
    },
  });

  res.send({
    message: "Create data success",
    data: product,
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id; //akan berisi string walaupun id Integer

  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.send({
    message: "Delete data success",
  });
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.description &&
      productData.image &&
      productData.price
    )
  ) {
    return res.status(400).json({ message: "some field is missing" });
  }

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });
  res.send({
    message: "Update data success",
    data: product,
  });
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });
  res.send({
    message: "Update data success",
    data: product,
  });
});

app.listen(PORT, () => {
  console.log("API Runing " + PORT);
});
