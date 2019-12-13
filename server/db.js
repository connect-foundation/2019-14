const express = require("express");
const uuid = require("uuid/v4");

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
    const queryString = `select count(*) as cntId from editors where user_id = ?`;
    const rows = await query(queryString, [userId]);
    if (rows === "Error: read ECONNRESET") {
      const retry = await query(queryString, [userId]);
      if (retry !== true) return false;
      return retry;
    }
    const result = await rows[0];
    if (result && result.cntId === 1) return true;
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

  async chkExistedShareId(containerId) {
    const queryString = `select share_id from editors where id = ?`;
    const result = await query(queryString, [containerId]);
    if (!result) return false;
    const shareId = result[0].share_id;
    return shareId;
  },
  async share(containerId) {
    const shareId = await this.chkExistedShareId(containerId);
    if (shareId === false) return false;
    if (shareId === null) {
      const newUuid = uuid();
      const queryString = `update editors set share_id = ? where id = ?`;
      const result = await query(queryString, [newUuid, containerId]);
      if (result) return newUuid;
      return result;
    }
    return shareId;
  },

  async shareLoad(shareId) {
    const queryString = `select content from editors where share_id = ?`;
    const result = await query(queryString, [shareId]);
    if (result && result.length === 1) return result[0].content;
    return false;
  },
};

module.exports = router;
