import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import createDebug from "debug";

import { THEME } from "../../../../enums";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import { TerminalDispatchContext } from "../../../../stores/TerminalStore";
import { CellContext } from "../../../../stores/CellStore";
import { setGenerator } from "../CellGenerator";
import ReplContainer from "./ReplContainer";

setGenerator("terminal", (uuid) => <TerminalCell cellUuid={uuid} />);

const debug = createDebug("boost:component:terminal-cell");

const TerminalWrapper = styled.div`
  position: relative;

  display: flex;
  flex-flow: column;

  background: ${THEME.VS_CODE.SIDE_MENU};
  width: 100%;
`;

const TerminalCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const { uuidManager, currentIndex } = state;
  const cellIndex = uuidManager.findIndex(cellUuid);

  const isCellFocus = cellIndex === currentIndex;
  if (isCellFocus) {
    debug("Terminal cell focus in");
    dispatchToTerminal(terminalAction.focusIn());
  }

  return (
    <TerminalWrapper>
      <ReplContainer cellIndex={cellIndex} isCellFocus={isCellFocus} />
    </TerminalWrapper>
  );
};

TerminalCell.propTypes = {
  cellUuid: PropTypes.string.isRequired,
};

export default TerminalCell;
