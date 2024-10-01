const router = require("express").Router();

const Product = require("../models/productModel");

// Create
router.post("/", async (req, res) => {
  const { name, inSale, price, percent, type, description, expiresIn } =
    req.body;

  if (
    !name ||
    inSale == undefined ||
    !price ||
    !percent ||
    !type ||
    !description ||
    !expiresIn
  ) {
    return res.status(422).json({
      message: "Todos os campos devem ser preenchidos",
    });
  }

  const product = {
    name,
    inSale,
    price,
    percent,
    type,
    description,
    expiresIn,
  };
  try {
    const newProduct = await Product.create(product);

    res.status(201).json({
      message: `Produto: ${newProduct.name} criado com sucesso!`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Erro interno no servidor.",
    });
  }
});

// Read
router.get("/", async (_req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Read Unique
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      res.status(422).json({
        message: "O produto não foi encontrado!",
      });
      return;
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Update

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, inSale, price, percent, type, description, expiresIn } =
    req.body;

  const product = {
    name,
    inSale,
    price,
    percent,
    type,
    description,
    expiresIn,
  };
  try {
    const updatedProduct = await Product.updateOne({ _id: id }, product);

    if (updatedProduct.matchedCount === 0) {
      res.status(422).json({
        message: "O Produto não foi encontrado!",
      });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({ _id: id });

  if (!product) {
    res.status(422).json({
      message: "O produto não foi encontrado!",
    });
    return;
  }
  try {
    await Product.deleteOne({ _id: id });

    res.status(200).json({
      message: `Produto: ${product.name} removido com sucesso!`,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
