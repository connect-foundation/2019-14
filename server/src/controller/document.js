const db = require("../api/db");

const save = async (req, res) => {
  const { userId, docContent } = req.body;
  const result = await db.document.save(userId, docContent);
  if (result) {
    res.status(200).send();
  } else {
    res.status(500).send();
  }
};

// const load = async (req, res) => {};

module.exports = {
  save,
  //   load,
};
