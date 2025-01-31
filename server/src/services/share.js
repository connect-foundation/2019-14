const uuid = require("uuid/v4");

const { query } = require("../db");

module.exports = {
  async isExistedShareId(containerId) {
    const queryString = `select share_id from editors where id = ?`;
    const result = await query(queryString, [containerId]);
    if (!result) return false;
    const shareId = result[0].share_id;
    return shareId;
  },

  async share(containerId) {
    const shareId = await this.isExistedShareId(containerId);
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

  async load(shareId) {
    const queryString = `select content from editors where share_id = ?`;
    const result = await query(queryString, [shareId]);
    if (result.length === 1) return result[0].content;
    return null;
  },
};
