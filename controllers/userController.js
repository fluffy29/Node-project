module.exports = {
  getAllUsers: (model, db) => (req, res) => {
    model.getAllUsers(db, (err, users) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(users);
    });
  },

  getUserById: (model, db) => (req, res) => {
    const { id } = req.params;
    model.getUserById(db, id, (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    });
  },

  createUser: (model, db) => (req, res) => {
    model.createUser(db, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "User created",
        userId: result.insertId,
      });
    });
  },

  updateUser: (model, db) => (req, res) => {
    const { id } = req.params;
    model.updateUser(db, id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User updated" });
    });
  },

  deleteUser: (model, db) => (req, res) => {
    const { id } = req.params;
    model.deleteUser(db, id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted" });
    });
  },
};
