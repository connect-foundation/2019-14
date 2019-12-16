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

router.query = async function(queryString, ...args) {
  try {
    const conn = await pool.getConnection(async (_conn) => {
      return _conn;
    });
    try {
      const [rows] = await conn.query(queryString, ...args);
      conn.release();
      return rows;
    } catch (err) {
      const errMsg = `[Query Error] ${err}`;
      conn.release();
      throw new Error(errMsg);
    }
  } catch (err) {
    const errMsg = `[DB Error] ${err}`;
    throw new Error(errMsg);
  }
};

module.exports = router;
