import React from "react";
import PropTypes from "prop-types";

import MovableReplCell from "./MovableReplCell";
import ReplOutput from "./ReplOutput";

const ReplCell = ({ isCellFocus }) => {
  return (
    <>
      <ReplOutput key="repl-output" />
      <MovableReplCell key="movable-repl-cell" isCellFocus={isCellFocus} />
    </>
  );
};

ReplCell.propTypes = {
  isCellFocus: PropTypes.bool.isRequired,
};

export default ReplCell;
