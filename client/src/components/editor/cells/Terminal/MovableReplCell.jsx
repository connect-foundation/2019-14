import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";

import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import {
  TerminalContext,
  TerminalDispatchContext,
} from "../../../../stores/TerminalStore";
import ReplInput from "./ReplInput";

const MovableReplCell = ({ isCellFocus }) => {
  const replRef = useRef(null);
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const { terminalState } = useContext(TerminalContext);

  const { currentText } = terminalState;

  useEffect(() => {
    const isFocusIn = replRef && replRef.current && isCellFocus;
    if (isFocusIn) {
      replRef.current.focus();
    }
  }, [replRef, isCellFocus]);

  const replInputHandler = (e) => {
    const text = e.target.value;
    dispatchToTerminal(terminalAction.changeCurrentText(text));
  };

  return (
    <>
      <ReplInput
        ref={replRef}
        inputHandler={replInputHandler}
        text={currentText}
      />
    </>
  );
};

MovableReplCell.propTypes = {
  isCellFocus: PropTypes.bool.isRequired,
};

export default MovableReplCell;
