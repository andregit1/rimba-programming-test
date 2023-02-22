const mysql = require('mysql');

// create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'rimba',
});

module.exports = connection;
