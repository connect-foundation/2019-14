const { query } = require("../db");

module.exports = {
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
};
