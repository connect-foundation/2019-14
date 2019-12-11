import React from "react";
import PropTypes from "prop-types";

import MovableReplCell from "./MovableReplCell";
import ReplOutput from "./ReplOutput";

const ReplCell = ({ cellUuid, isCellFocus }) => {
  return (
    <>
      <ReplOutput cellUuid={cellUuid} />
      <MovableReplCell isCellFocus={isCellFocus} />
    </>
  );
};

ReplCell.propTypes = {
  cellUuid: PropTypes.string.isRequired,
  isCellFocus: PropTypes.bool.isRequired,
};

export default ReplCell;
