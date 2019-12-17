import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { THEME } from "../../../../enums";
import EditableReplInput from "./EditableReplInput";
import { cellActionCreator as cellAction } from "../../../../actions/CellAction";
import { CellDispatchContext } from "../../../../stores/CellStore";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import {
  TerminalContext,
  TerminalDispatchContext,
} from "../../../../stores/TerminalStore";

const ReplInputWrapper = styled.div`
  display: flex;

  height: 100%;

  padding: 15px;
  margin: 10px;

  background-color: ${THEME.VS_CODE.INNER_BOX};
`;

const ReplPrompt = styled.div`
  border-right: 5px solid #00fe3d;
  padding-right: 10px;
  width: 5rem;
`;

const ReplInput = ({ cellUuid, isCellFocus }) => {
  const prompt = "User $";

  const replRef = useRef(null);

  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const { terminalState } = useContext(TerminalContext);
  const dispatchToCell = useContext(CellDispatchContext);

  const { currentText } = terminalState;

  useEffect(() => {
    const isFocusIn = replRef && replRef.current && isCellFocus;
    if (isFocusIn) {
      replRef.current.focus();
    }
  }, [replRef, isCellFocus]);

  const changeHandler = (e) => {
    const text = e.target.value;
    dispatchToTerminal(terminalAction.changeCurrentText(text));
  };

  const clickHandler = (e) => {
    e.stopPropagation();
    dispatchToTerminal(terminalAction.focusIn());
    dispatchToCell(cellAction.focusMove(cellUuid));
  };

  return (
    <ReplInputWrapper>
      <ReplPrompt>{prompt}</ReplPrompt>
      <EditableReplInput
        ref={replRef}
        spellCheck={false}
        onChange={changeHandler}
        onClick={clickHandler}
        value={currentText}
      />
    </ReplInputWrapper>
  );
};

ReplInput.propTypes = {
  cellUuid: PropTypes.string.isRequired,
  isCellFocus: PropTypes.bool.isRequired,
};

export default ReplInput;
