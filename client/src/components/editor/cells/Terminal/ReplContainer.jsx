import React, { useContext } from "react";
import PropTypes from "prop-types";
import createDebug from "debug";

import { EVENT_TYPE } from "../../../../enums";
import { useKeys } from "../../../../utils";
import { cellActionCreator as cellAction } from "../../../../actions/CellAction";
import { CellDispatchContext } from "../../../../stores/CellStore";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import { TerminalDispatchContext } from "../../../../stores/TerminalStore";
import ReplCell from "./ReplCell";

const debug = createDebug("boost:component:repl-container");

const ReplContainer = ({ cellUuid, cellIndex, isCellFocus }) => {
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const dispatchToCell = useContext(CellDispatchContext);

  const focusHandlers = {
    [EVENT_TYPE.ENTER]: (e) => {
      e.preventDefault();
      debug("Evaling terminal input");
      dispatchToTerminal(terminalAction.evalInput());
    },

    [EVENT_TYPE.BACKSPACE]: () => {
      debug("Delete terminal cell");
      // dispatchToCell(cellAction.delete(cellUuid));
    },

    [EVENT_TYPE.ARROW_UP]: (e) => {
      e.preventDefault();
      debug("Focus to prev cell");
      dispatchToTerminal(terminalAction.focusOut());
      dispatchToCell(cellAction.focusPrev());
    },

    [EVENT_TYPE.ARROW_DOWN]: (e) => {
      e.preventDefault();
      debug("Focus Down In Terminal");
      dispatchToTerminal(terminalAction.focusOut());
      dispatchToCell(cellAction.focusNext());
    },
  };

  useKeys(focusHandlers, isCellFocus);

  return (
    <>
      <ReplCell isCellFocus={isCellFocus} />
    </>
  );
};

ReplContainer.propTypes = {
  cellUuid: PropTypes.string.isRequired,
  cellIndex: PropTypes.number.isRequired,
  isCellFocus: PropTypes.bool.isRequired,
};

export default ReplContainer;
