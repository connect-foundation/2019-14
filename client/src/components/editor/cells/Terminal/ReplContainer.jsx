import React, { useContext } from "react";
import PropTypes from "prop-types";
import createDebug from "debug";

import { EVENT_TYPE } from "../../../../enums";
import { useKeys, socketManager } from "../../../../utils";
import { cellGenerator } from "../CellGenerator";
import { cellActionCreator as cellAction } from "../../../../actions/CellAction";
import { CellDispatchContext } from "../../../../stores/CellStore";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import {
  TerminalContext,
  TerminalDispatchContext,
} from "../../../../stores/TerminalStore";
import ReplCell from "./ReplCell";

const debug = createDebug("boost:component:repl-container");

const ReplContainer = ({ cellUuid, cellIndex, isCellFocus }) => {
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const dispatchToCell = useContext(CellDispatchContext);
  const { terminalState } = useContext(TerminalContext);
  const { currentText } = terminalState;

  const socket = socketManager.get(cellUuid);

  const focusHandlers = {
    [EVENT_TYPE.ENTER]: (e) => {
      e.preventDefault();
      debug("Evaling terminal input");
      socket.emit("stdin", currentText);
      dispatchToTerminal(terminalAction.changeCurrentText(""));
    },

    [EVENT_TYPE.BACKSPACE]: () => {
      debug("Backspace terminal cell");
      if (currentText.length === 0) {
        // if outputTexts.length === 0 -> init cell
        // delete last output
      }
      // dispatchToCell(cellAction.init(null, cellUuid));
    },

    [EVENT_TYPE.SHIFT_BACKSPACE]: () => {
      debug("Shift backspace terminal cell");
      dispatchToCell(cellAction.init(null, cellUuid));
    },

    [EVENT_TYPE.OPTION_COMMAND_DOWN]: () => {
      debug("Create Next & Focus next");
      // TODO: options focus next
    },

    [EVENT_TYPE.CTRL_C]: () => {
      debug("Signal SIGINT");
      // TODO: change interupt string and abstraction
      socket.emit("stdin", "SIGINT");
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

  useKeys(focusHandlers, isCellFocus, [currentText]);

  return (
    <>
      <ReplCell cellUuid={cellUuid} isCellFocus={isCellFocus} />
    </>
  );
};

ReplContainer.propTypes = {
  cellUuid: PropTypes.string.isRequired,
  cellIndex: PropTypes.number.isRequired,
  isCellFocus: PropTypes.bool.isRequired,
};

export default ReplContainer;
