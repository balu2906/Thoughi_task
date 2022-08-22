const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  connectionLimit: 10,
  dateStrings: true,
});
module.exports = pool;
