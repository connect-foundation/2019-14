const shareService = require("../services/share");

const share = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { userId, containerId } = req.body;
  const result = await shareService.share(containerId);
  if (result) {
    res.status(201).send(result);
  } else {
    res.status(500).send();
  }
};

const load = async (req, res) => {
  const { shareId } = req.params;
  const result = await shareService.shareLoad(shareId);
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
