import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import createDebug from "debug";

import { EVENT_TYPE } from "../../../../enums";
import { utils, useKeys } from "../../../../utils";
import { cellActionCreator as cellAction } from "../../../../actions/CellAction";
import { CellDispatchContext } from "../../../../stores/CellStore";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import {
  TerminalContext,
  TerminalDispatchContext,
} from "../../../../stores/TerminalStore";
import MovableReplCell from "./MovableReplCell";
import ReplCell from "./ReplCell";

const { splice } = utils;

const debug = createDebug("boost:component:repl-container");

const renderReplList = (cellIndex, terminalState) => {
  const {
    inputTexts,
    outputTexts,

    isActives,
    isLoadings,
  } = terminalState;

  const replList = inputTexts.map((_, index) => {
    const componentKey = `${cellIndex}/repl/${index}`;
    return (
      <ReplCell
        key={componentKey}
        cellIndex={index}
        inputText={inputTexts[index]}
        outputText={outputTexts[index]}
        isActive={isActives[index]}
        isLoading={isLoadings[index]}
      />
    );
  });

  return replList;
};

const ReplContainer = ({ cellIndex, isCellFocus }) => {
  const [movable, setMovable] = useState(null);
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const dispatchToCell = useContext(CellDispatchContext);
  const { terminalState } = useContext(TerminalContext);
  const { focusIndex, currentText, replCount } = terminalState;

  const focusHandlers = {
    [EVENT_TYPE.ENTER]: (e) => {
      e.preventDefault();
      dispatchToTerminal(terminalAction.createNewRepl(replCount));
    },

    [EVENT_TYPE.ARROW_UP]: (e) => {
      e.preventDefault();
      const isFocusTop = focusIndex === 0;
      if (isFocusTop) {
        debug("Focus in top");
        dispatchToTerminal(terminalAction.focusOut());
        dispatchToCell(cellAction.focusPrev());
      } else {
        debug("Focus prev", focusIndex);
        dispatchToTerminal(terminalAction.focusPrev());
      }
    },

    [EVENT_TYPE.ARROW_DOWN]: (e) => {
      e.preventDefault();
      if (focusIndex === replCount) {
        debug("Focus Down Max");
      } else if (focusIndex >= 0 && focusIndex < replCount) {
        debug("Focus Down In Terminal");
        dispatchToTerminal(terminalAction.focusNext());
      }
    },
  };

  useKeys(focusHandlers, isCellFocus, [focusIndex]);

  useEffect(() => {
    if (isCellFocus) {
      setMovable(<MovableReplCell initText={currentText} />);
    }
  }, [focusIndex]);

  const isFirstRender = movable && replCount === 0;
  if (isFirstRender) {
    return <>{movable}</>;
  }

  const replList = renderReplList(cellIndex, terminalState);
  if (!isCellFocus) {
    return <>{replList}</>;
  }

  const replsWithMovable = splice.addBefore(replList, focusIndex, movable);
  return <>{replsWithMovable}</>;
};

ReplContainer.propTypes = {
  cellIndex: PropTypes.number.isRequired,
  isCellFocus: PropTypes.bool.isRequired,
};

export default ReplContainer;
