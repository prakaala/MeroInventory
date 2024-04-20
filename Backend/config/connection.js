const { HOST, USER, PASSWORD, DB } = require('./db');
// const { createPool } = require('mysql2');

// const pool = createPool({
//   host: HOST,
//   user: USER,
//   password: PASSWORD,
//   database: DB,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// //console.log("Code has reached here:")

// module.exports = pool;


const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alpha1_Beta2",
  database: "inventory_db"
});

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: HOST,
//   user: USER,
//   password: PASSWORD,
//   database: DB
// });


// Close the connection
// connection.end();

module.exports = connection;

