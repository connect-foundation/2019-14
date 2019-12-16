const documentService = require("../services/document");

const save = async (req, res) => {
  // const userId = req.params.userId
  const { containerId, docContent } = req.body;
  const result = await documentService.save(containerId, docContent);
  if (result) {
    res.status(200).send();
  } else {
    res.status(500).send();
  }
};

const load = async (req, res) => {
  const { containerId } = req.params;

  const content = await documentService.load(containerId);
  if (content) {
    res.status(200).send(content);
  } else {
    res.status(204).send();
  }
};

module.exports = {
  save,
  load,
};
