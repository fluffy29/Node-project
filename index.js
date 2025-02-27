require('dotenv').config(); 

const express = require('express');
const app = express();

const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}.js`); 

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log(`Connected to MySQL (${env} environment)`);
});


app.use(express.json());

const userRoutes = require('./routes/userroutes');
app.use('/users', userRoutes(db));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} in ${env} mode`);
});
