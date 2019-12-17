import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import createDebug from "debug";

import { THEME } from "../../../../enums";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import {
  TerminalDispatchContext,
  TerminalStore,
} from "../../../../stores/TerminalStore";
import { CellContext } from "../../../../stores/CellStore";
import { setGenerator } from "../CellGenerator";
import { uuidManager } from "../../../../utils";
import ReplContainer from "./ReplContainer";

setGenerator("terminal", (uuid) => {
  return <TerminalCell cellUuid={uuid} />;
});

const debug = createDebug("boost:component:terminal-cell");

const TerminalWrapper = styled.div`
  position: relative;

  display: flex;
  flex-flow: column;

  background: ${THEME.VS_CODE.SIDE_MENU};
  width: 100%;
`;

const InnerTerminalCell = ({ cellUuid }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { state } = useContext(CellContext);
  const dispatchToTerminal = useContext(TerminalDispatchContext);

  const { currentIndex, cellManager } = state;
  const cellIndex = uuidManager.findIndex(cellUuid);

  const isFocus = cellIndex === currentIndex;
  if (isFocus) {
    debug(`Terminal cell ${cellIndex} focus in`);
    dispatchToTerminal(terminalAction.focusIn());
  }

  if (isFirstRender) {
    setIsFirstRender(false);

    const loadedText = cellManager.texts[cellIndex];
    dispatchToTerminal(terminalAction.load(loadedText));
  }

  return (
    <TerminalWrapper>
      <ReplContainer cellUuid={cellUuid} isCellFocus={isFocus} />
    </TerminalWrapper>
  );
};

InnerTerminalCell.propTypes = {
  cellUuid: PropTypes.string.isRequired,
};

const TerminalCell = ({ cellUuid }) => {
  return (
    <>
      <TerminalStore cellUuid={cellUuid}>
        <InnerTerminalCell cellUuid={cellUuid} />
      </TerminalStore>
    </>
  );
};

TerminalCell.propTypes = {
  cellUuid: PropTypes.string.isRequired,
};

export default TerminalCell;
