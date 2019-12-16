const shareService = require("../services/share");

const share = async (req, res) => {
  const { containerId } = req.body;
  const shareId = await shareService.share(containerId);
  if (shareId) {
    res.status(201).send(shareId);
  } else {
    res.status(500).send();
  }
};

const load = async (req, res) => {
  const { shareId } = req.params;
  const content = await shareService.load(shareId);
  if (content) {
    res.status(200).send(content);
  } else {
    res.status(500).send();
  }
};

module.exports = {
  share,
  load,
};
