import React, { useContext } from "react";
import PropTypes from "prop-types";
import createDebug from "debug";

import { EVENT_TYPE } from "../../../../enums";
import { useKeys, socketManager } from "../../../../utils";
import { cellActionCreator as cellAction } from "../../../../actions/CellAction";
import { CellDispatchContext } from "../../../../stores/CellStore";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import {
  TerminalContext,
  TerminalDispatchContext,
} from "../../../../stores/TerminalStore";
import ReplInput from "./ReplInput";
import ReplOutput from "./ReplOutput";

const debug = createDebug("boost:component:repl-container");

const ReplContainer = ({ cellUuid, isCellFocus }) => {
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const dispatchToCell = useContext(CellDispatchContext);
  const { terminalState } = useContext(TerminalContext);

  const { currentText } = terminalState;

  const eventHandlers = {
    [EVENT_TYPE.ENTER]: (e) => {
      e.preventDefault();

      debug("Enter terminal input");
      socketManager.writeToStdin(cellUuid, currentText);
      dispatchToTerminal(terminalAction.changeCurrentText(""));
    },

    [EVENT_TYPE.SHIFT_BACKSPACE]: () => {
      debug("Shift backspace terminal cell");

      dispatchToCell(cellAction.reset());
      dispatchToCell(cellAction.input(cellUuid, ""));
    },

    [EVENT_TYPE.OPTION_COMMAND_DOWN]: () => {
      debug("Create Next & Focus next");

      dispatchToTerminal(terminalAction.focusOut());
      const makeNewMarkdownCell = cellAction.newEmptyDefault();
      dispatchToCell(makeNewMarkdownCell);
    },

    [EVENT_TYPE.CTRL_C]: () => {
      debug("Signal SIGINT");
      socketManager.sendSignal(cellUuid, "SIGINT");
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

  useKeys(eventHandlers, isCellFocus, [currentText]);

  return (
    <>
      <ReplOutput cellUuid={cellUuid} />
      <ReplInput cellUuid={cellUuid} isCellFocus={isCellFocus} />
    </>
  );
};

ReplContainer.propTypes = {
  cellUuid: PropTypes.string.isRequired,
  isCellFocus: PropTypes.bool.isRequired,
};

export default ReplContainer;
