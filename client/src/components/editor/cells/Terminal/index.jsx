import React, { useContext } from "react";
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
  const { state } = useContext(CellContext);
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const { currentIndex } = state;
  const cellIndex = uuidManager.findIndex(cellUuid);

  const isCellFocus = cellIndex === currentIndex;
  if (isCellFocus) {
    debug(`Terminal cell ${cellIndex} focus in`);
    dispatchToTerminal(terminalAction.focusIn());
  }

  return (
    <TerminalWrapper>
      <ReplContainer
        cellUuid={cellUuid}
        cellIndex={cellIndex}
        isCellFocus={isCellFocus}
      />
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
