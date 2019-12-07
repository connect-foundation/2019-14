import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";

import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import { TerminalDispatchContext } from "../../../../stores/TerminalStore";
import ReplInput from "./ReplInput";
import StdinInput from "./StdinInput";

const MovableReplCell = ({ currentText, currentStdin, isReplFocus }) => {
  const replRef = useRef(null);
  const stdinRef = useRef(null);
  const dispatchToTerminal = useContext(TerminalDispatchContext);

  useEffect(() => {
    if (isReplFocus) {
      replRef.current.focus();
    } else {
      stdinRef.current.focus();
    }
  }, [replRef, stdinRef, isReplFocus]);

  const replInputHandler = (e) => {
    const text = e.target.textContent;
    dispatchToTerminal(terminalAction.changeCurrentText(text));
  };

  const stdinInputHandler = (e) => {
    const text = e.target.textContent;
    dispatchToTerminal(terminalAction.changeCurrentStdin(text));
  };

  return (
    <>
      <ReplInput
        ref={replRef}
        inputHandler={replInputHandler}
        text={currentText}
        isEditorable
      />
      <StdinInput
        ref={stdinRef}
        inputHandler={stdinInputHandler}
        text={currentStdin}
        isEditorable
      />
    </>
  );
};

MovableReplCell.propTypes = {
  currentText: PropTypes.string.isRequired,
  currentStdin: PropTypes.string.isRequired,
  isReplFocus: PropTypes.bool.isRequired,
};

export default MovableReplCell;
