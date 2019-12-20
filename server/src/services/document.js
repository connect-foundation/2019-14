const { query } = require("../db");

module.exports = {
  async isExisted(containerId) {
    const queryString = `select count(*) as cntId from editors where id = ?`;
    const rows = await query(queryString, [containerId]);
    const result = rows[0];
    if (result.cntId === 1) return true;
    return false;
  },
  async save(containerId, docContent) {
    const isDocumentExisted = await this.isExisted(containerId);
    if (isDocumentExisted) {
      const queryString = `update editors set content = ? where id = ?`;
      const result = await query(queryString, [docContent, containerId]);
      return result;
    }
    const queryString = `insert into editors (id, content) values (?, ?)`;
    const result = await query(queryString, [containerId, docContent]);
    return result;
  },
  async load(containerId) {
    const isDocumentExisted = await this.isExisted(containerId);
    if (isDocumentExisted) {
      const queryString = `select content from editors where id = ?`;
      const result = await query(queryString, [containerId]);
      const { content } = result[0];
      return content;
    }
    return false;
  },
};
