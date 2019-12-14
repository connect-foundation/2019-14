const express = require("express");

const router = express.Router();
const mysql = require("mysql2/promise");

const dbInfo = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const pool = mysql.createPool(dbInfo);

router.query = async function(queryString, ...arg) {
  try {
    const conn = await pool.getConnection(async (_conn) => {
      return _conn;
    });
    try {
      const [rows] = await conn.query(queryString, ...arg);
      conn.release();
      return rows;
    } catch (err) {
      console.log(`[Query Error] ${err}`);
      conn.release();
      return false;
    }
  } catch (err) {
    console.log("DB Error");
    return false;
  }
};

module.exports = router;
