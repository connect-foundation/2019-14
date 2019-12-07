import React, { useEffect, useContext } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "../../style/MarkdownWrapper";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import { EVENT_TYPE } from "../../../../enums";
import { useCellState, useKey } from "../../../../utils";

import {
  saveCursorPosition,
  focusPrev,
  focusNext,
  setCursorPosition,
  createCursor,
} from "../Markdown/handler";
import { newCell, initCell } from "./handler";
import { cellGenerator, setGenerator } from "../CellGenerator";

setGenerator("h1", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("h2", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("h3", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("h4", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("h5", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("h6", (uuid) => <HeadingCell cellUuid={uuid} />);

const useKeys = (keydownHandlers, isFocus) => {
  const E = EVENT_TYPE;
  useKey(E.ENTER, keydownHandlers[E.ENTER], isFocus);
  useKey(E.ARROW_UP, keydownHandlers[E.ARROW_UP], isFocus);
  useKey(E.ARROW_DOWN, keydownHandlers[E.ARROW_DOWN], isFocus);
  useKey(E.BACKSPACE, keydownHandlers[E.BACKSPACE], isFocus);
};

// const HeadingCell = React.forwardRef(({ cellUuid }, ref) => {
const HeadingCell = ({ cellUuid }) => {
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

  const htmlText = () => {
    /**
     * @todo text에 대한 보안장치 필요
     * @todo text에 대해 원하는 것 외에는 전부 유니코드로 바꾸는 로직 필요
     * - placeholder의 key 배열에 해당하는 태그 외에는 전부 변환한다던가
     */
    return { __html: text };
  };

  return (
    <MarkdownWrapper
      as={tag}
      contentEditable
      isQuote={false}
      placeholder={placeholder}
      onClick={onClick}
      onBlur={onBlur}
      ref={inputRef || null}
      dangerouslySetInnerHTML={htmlText()}
    />
  );
};

HeadingCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default HeadingCell;
