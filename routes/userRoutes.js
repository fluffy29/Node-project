const userModel = require('../models/Usermodel');
const userController = require("../controllers/userController");

module.exports = (db) => {
  const router = require("express").Router();

  router.get("/", userController.getAllUsers(userModel, db));
  router.get("/:id", userController.getUserById(userModel, db));
  router.post("/", userController.createUser(userModel, db));
  router.put("/:id", userController.updateUser(userModel, db));
  router.delete("/:id", userController.deleteUser(userModel, db));

  return router;
};