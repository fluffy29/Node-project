module.exports = {
  getAllUsers: (db, callback) => {
    db.query("SELECT * FROM users", (err, results) => {
      callback(err, results);
    });
  },

  getUserById: (db, userId, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
      callback(err, results && results[0]);
    });
  },

  createUser: (db, userData, callback) => {
    const { name, email } = userData;
    db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
      (err, results) => {
        callback(err, results);
      }
    );
  },

  updateUser: (db, userId, userData, callback) => {
    const { name, email } = userData;
    db.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, userId],
      (err, results) => {
        callback(err, results);
      }
    );
  },

  deleteUser: (db, userId, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [userId], (err, results) => {
      callback(err, results);
    });
  },
};