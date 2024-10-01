const router = require("express").Router();

const User = require("../models/userModel");

// Create
router.post("/", async (req, res) => {
  const { name, cpf, email, password, isAdmin, createdAt } = req.body;

  if (
    !name ||
    !cpf ||
    !email ||
    !password ||
    isAdmin === undefined ||
    !createdAt
  ) {
    return res.status(422).json({
      message: "Todos os campos devem ser preenchidos",
    });
  }

  const user = {
    name,
    cpf,
    email,
    password,
    isAdmin,
    createdAt,
  };
  try {
    const newUser = await User.create(user);

    res.status(201).json({
      message: `Usuário: ${newUser.name} criado com sucesso!`,
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
    const users = await User.find();
    return res.status(200).json(users);
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
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(422).json({
        message: "O usuário não foi encontrado!",
      });
      return;
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Update

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, cpf, email, password, isAdmin, createdAt } = req.body;

  const user = {
    name,
    cpf,
    email,
    password,
    isAdmin,
    createdAt,
  };
  try {
    const updatedUser = await User.updateOne({ _id: id }, user);

    if (updatedUser.matchedCount === 0) {
      res.status(422).json({
        message: "O usuário não foi encontrado!",
      });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });

  if (!user) {
    res.status(422).json({
      message: "O usuário não foi encontrado!",
    });
    return;
  }
  try {
    await User.deleteOne({ _id: id });

    res.status(200).json({
      message: `Usuário: ${user.name} removido com sucesso!`,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
