// get the client
const mysql = require('mysql2');
require('dotenv').config();

// create the connection to database
const connection = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'employees'
  });

  module.exports = connection;