const express = require("express");

const router = express.Router();
const mysql = require("mysql2/promise");

const dbInfo = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const pool = mysql.createPool({
  ...dbInfo,
  waitForConnections: true,
});

const query = async (queryString, ...args) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(queryString, ...args);
    conn.release();
    return rows;
  } catch (err) {
    console.log(err);
    if (err.code === "ETIMEDOUT") {
      const [rows] = await conn.query(queryString, ...args);
      conn.release();
      return rows;
    }
    conn.release();
    throw new Error(err);
  }
};

router.query = query;

module.exports = router;
