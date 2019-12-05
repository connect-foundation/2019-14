const db = require("../api/db");

const save = async (req, res) => {
  // const userId = req.params.userId
  const { userId, docContent } = req.body;
  const result = await db.document.save(userId, docContent);
  if (result) {
    res.status(200).send();
  } else {
    res.status(500).send();
  }
};

const load = async (req, res) => {
  // const userId = req.params.userId
  const userId = "boost";
  const result = await db.document.load(userId);
  if (result) {
    res.status(200).send(result[0].content);
  } else {
    res.status(500).send();
  }
};

module.exports = {
  save,
  load,
};
