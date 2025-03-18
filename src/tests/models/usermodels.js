const express = require("express");
const userController = require("../../../controllers/userController");

module.exports = (db) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    userController.getAllUsers(db, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    const userId = req.params.id;
    userController.getUserById(db, userId, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!result) return res.status(404).json({ message: "User not found" });
      res.json(result);
    });
  });

  router.post("/", (req, res) => {
    const newUser = req.body;
    userController.createUser(db, newUser, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    });
  });

  router.put("/:id", (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    userController.updateUser(db, userId, updatedUser, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ affectedRows: result.affectedRows });
    });
  });

  router.delete("/:id", (req, res) => {
    const userId = req.params.id;
    userController.deleteUser(db, userId, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ affectedRows: result.affectedRows });
    });
  });

  return router;
};
