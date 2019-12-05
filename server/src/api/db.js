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

const query = async function(queryString, ...arg) {
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

router.document = {
  async chkExisted(userId) {
    const queryString = `select count(*) as result from editors where user_id = ?`;
    const rows = await query(queryString, [userId]);
    const result = await rows[0].result;
    if (result > 0) return true;
    return false;
  },
  async save(userId, docContent) {
    const check = await this.chkExisted(userId);
    if (check) {
      const queryString = `update editors set content = ? where user_id = ?`;
      const result = await query(queryString, [docContent, userId]);
      return result;
    }
    const queryString = `insert into editors (user_id, content) values (?, ?)`;
    const result = await query(queryString, [userId, docContent]);
    return result;
  },
  async load(userId) {
    const check = await this.chkExisted(userId);
    if (check) {
      const queryString = `select content from editors where user_id = ?`;
      const result = await query(queryString, [userId]);
      return result;
    }
    return false;
  },
};

module.exports = router;
