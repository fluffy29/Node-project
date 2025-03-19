const express = require("express");
const app = express();
const config = require("./config/test");
const mysql = require("mysql2");

// Database connection for the data base
const db = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  charset: "utf8mb4",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log(`Connected to MySQL (${process.env.NODE_ENV} environment)`);
});

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Import routes and pass them the database connection
const userRoutes = require("./routes/userRoutes")(db);

// Register routes with the app
app.use("/users", userRoutes);

let server;

if (process.env.NODE_ENV !== "test") {
  server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

module.exports = { app, server, db };
