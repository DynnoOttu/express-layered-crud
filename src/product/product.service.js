const prisma = require("../db");

const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const getProductById = async (id) => {
  if (typeof id !== "number") {
    throw Error("id must be a number");
  }

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw Error("product not found");
  }

  return product;
};

const createProduct = async (newProduct) => {
  //   const newProduct = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
    },
  });

  if (!product) {
    throw Error("create product failed");
  }

  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

  await prisma.product.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
};
