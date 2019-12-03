import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";

import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import { TerminalDispatchContext } from "../../../../stores/TerminalStore";
import ReplInput from "./ReplInput";

const MovableReplCell = ({ initText }) => {
  const ref = useRef(null);
  const dispatchToTerminal = useContext(TerminalDispatchContext);

  useEffect(() => {
    const isComponentFocus = ref && ref.current;
    if (isComponentFocus) {
      ref.current.focus();
    }
  }, [ref]);

  const inputHandler = (e) => {
    const text = e.target.textContent;
    dispatchToTerminal(terminalAction.changeCurrentText(text));
  };

  return (
    <ReplInput
      ref={ref}
      inputHandler={inputHandler}
      text={initText}
      isEditorable
    />
  );
};

MovableReplCell.propTypes = {
  initText: PropTypes.string.isRequired,
};

export default MovableReplCell;
