import React, { useContext, useEffect } from "react";

import propTypes from "prop-types";
import MarkdownWrapper from "../../style/MarkdownWrapper";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import { useCellState, useKey } from "../../../../utils";
import { EVENT_TYPE } from "../../../../enums";

import {
  saveCursorPosition,
  focusPrev,
  focusNext,
  setCursorPosition,
  createCursor,
  htmlText,
} from "../Markdown/handler";
import { newCell, initCell } from "../Heading/handler";
import { cellGenerator, setGenerator } from "../CellGenerator";

setGenerator("blockquote", (uuid) => <QuoteCell cellUuid={uuid} />);

const useKeys = (keydownHandlers, isFocus) => {
  const E = EVENT_TYPE;
  useKey(E.ENTER, keydownHandlers[E.ENTER], isFocus);
  useKey(E.ARROW_UP, keydownHandlers[E.ARROW_UP], isFocus);
  useKey(E.ARROW_DOWN, keydownHandlers[E.ARROW_DOWN], isFocus);
  useKey(E.BACKSPACE, keydownHandlers[E.BACKSPACE], isFocus);
};

const QuoteCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const { currentIndex, cellIndex, tag, text, placeholder } = useCellState(
    state,
    cellUuid
  );
  let inputRef = null;

  const backspaceEvent = (e) => {
    const { textContent } = e.target;
    if (textContent.length === 0) {
      const componentCallback = cellGenerator.p;
      initCell(cellUuid, dispatch, componentCallback);
    }
  };

  const enterEvent = (e) => {
    const { textContent } = e.target;
    if (textContent.length === 0) {
      backspaceEvent(e);
    } else {
      const componentCallback = cellGenerator.p;
      saveCursorPosition(dispatch);
      dispatch(cellActionCreator.input(cellUuid, textContent));
      newCell(cellUuid, dispatch, componentCallback);
    }
  };

  const arrowUpEvent = () => {
    focusPrev(dispatch);
  };

  const arrowDownEvent = () => {
    focusNext(dispatch);
  };

  const keydownHandlers = {
    [EVENT_TYPE.ENTER]: enterEvent,
    [EVENT_TYPE.ARROW_UP]: arrowUpEvent,
    [EVENT_TYPE.ARROW_DOWN]: arrowDownEvent,
    [EVENT_TYPE.BACKSPACE]: backspaceEvent,
  };

  const isFocus = currentIndex === cellIndex;
  if (isFocus) {
    inputRef = state.inputRef;
  }

  useKeys(keydownHandlers, isFocus);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      if (text.length > 0) {
        const content = createCursor(text, state.cursor);
        inputRef.current.innerHTML = content;
        setCursorPosition();
        inputRef.current.normalize();
      }
    }
  }, [inputRef]);

  const onClick = () => {
    dispatch(cellActionCreator.focusMove(cellUuid));
  };

  const onBlur = (e) => {
    const { innerHTML } = e.target;
    dispatch(cellActionCreator.input(cellUuid, innerHTML));
  };

  return (
    <MarkdownWrapper
      as={tag}
      contentEditable
      isQuote
      placeholder={placeholder}
      onClick={onClick}
      onBlur={onBlur}
      ref={inputRef || null}
      dangerouslySetInnerHTML={htmlText(text)}
      spellCheck={false}
    />
  );
};

QuoteCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default QuoteCell;
