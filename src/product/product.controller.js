// controller untuk handle layer request dan response
// bisi juga untuk handle validasi body

const express = require("express");
const router = express.Router();
const prisma = require("../db");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
} = require("./product.service");

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);

    res.send({ message: "Get data by id success", data: product });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;

    const product = await createProduct(newProduct);

    res.send({
      message: "Create data success",
      data: product,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id; //akan berisi string walaupun id Integer

    await deleteProductById(parseInt(productId));

    res.send({
      message: "Delete data success",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
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

router.patch("/:id", async (req, res) => {
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

module.exports = router;
