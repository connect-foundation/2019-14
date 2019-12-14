const documentService = require("../services/document");

const save = async (req, res) => {
  // const userId = req.params.userId
  const { userId, docContent } = req.body;
  const result = await documentService.save(userId, docContent);
  if (result) {
    res.status(200).send();
  } else {
    res.status(500).send();
  }
};

const load = async (req, res) => {
  // const userId = req.params.userId
  const userId = "boost";
  const result = await documentService.load(userId);
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
