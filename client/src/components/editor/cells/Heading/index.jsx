import React, {
  useRef,
  useEffect,
  useContext,
  useImperativeHandle,
} from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "../../style/MarkdownWrapper";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import { EVENT_TYPE } from "../../../../enums";
import { useCellState, handlerManager } from "../../../../utils";

import {
  newCell,
  saveCursorPosition,
  isContinuePrev,
  isContinueNext,
  focusPrev,
  focusNext,
  setCursorPosition,
  createCursor,
} from "../Markdown/handler";
import MarkdownCell from "../Markdown";

// import {  } from "./handler";

// const HeadingCell = React.forwardRef(({ cellUuid }, ref) => {
const HeadingCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const { currentIndex, cellIndex, tag, text, placeholder } = useCellState(
    state,
    cellUuid
  );
  let inputRef = null;
  // const inputRef = useRef();

  // useImperativeHandle(ref, () => ({
  //   focus: () => {
  //     inputRef.current.focus();
  //   },
  // }));

  const enterEvent = (e) => {
    const { textContent } = e.target;
    const componentCallback = (uuid) => <MarkdownCell cellUuid={uuid} />;
    saveCursorPosition(dispatch, inputRef);
    dispatch(cellActionCreator.input(cellUuid, textContent));
    newCell(dispatch, componentCallback);
  };

  const arrowUpEvent = (e) => {
    if (isContinuePrev(cellIndex)) {
      focusPrev(cellUuid, e.target.textContent, dispatch, inputRef);
    }
  };

  const arrowDownEvent = (e) => {
    if (isContinueNext(cellIndex, state.cells.length)) {
      focusNext(cellUuid, e.target.textContent, dispatch, inputRef);
    }
  };

  const keydownHandlers = {
    [EVENT_TYPE.ENTER]: enterEvent,
    [EVENT_TYPE.ARROW_UP]: arrowUpEvent,
    [EVENT_TYPE.ARROW_DOWN]: arrowDownEvent,
  };

  if (currentIndex === cellIndex) {
    inputRef = state.inputRef;

    handlerManager.attachKeydownEvent(window, keydownHandlers, cellIndex, "hn");
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      // const content = createCursor(text, state.cursor);
      // inputRef.current.innerHTML = content;
      // setCursorPosition();
      // inputRef.current.normalize();
    }
  }, [inputRef]);

  const onClick = () => {
    handlerManager.attachKeydownEvent(window, keydownHandlers, cellIndex, tag);
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
      ref={inputRef || null}
      dangerouslySetInnerHTML={htmlText()}
    />
  );
};

HeadingCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default HeadingCell;
