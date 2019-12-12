const db = require("../api/db");

const share = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { userId, containerId } = req.body;
  const result = await db.document.share(containerId);
  if (result) {
    res.status(201).send(result);
  } else {
    res.status(500).send();
  }
};

const load = async (req, res) => {
  const { shareId } = req.params;
  const result = await db.document.shareLoad(shareId);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).send();
  }
};

module.exports = {
  share,
  load,
};
