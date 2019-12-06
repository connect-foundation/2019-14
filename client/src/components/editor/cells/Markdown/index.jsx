import React, { useEffect, useContext } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "../../style/MarkdownWrapper";
import { PLACEHOLDER, EVENT_TYPE } from "../../../../enums";
import { cellGenerator, setGenerator } from "../CellGenerator";
import { getType, getStart, useKeys, uuidManager } from "../../../../utils";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import {
  getSelection,
  newCell,
  deleteCell,
  saveCursorPosition,
  focusPrev,
  focusNext,
  createCursor,
  setCursorPosition,
  blockEndUp,
  blockEndDown,
  blockRelease,
} from "./handler";

setGenerator("p", (uuid) => <MarkdownCell cellUuid={uuid} />);
setGenerator("hr", (uuid) => (
  <hr cellUuid={uuid} noshade="noshade" style={{ borderColor: "silver" }} />
));

const MarkdownCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const { currentIndex, start, cursor, block, cellManager, isLoading } = state;
  let inputRef = null;

  const cellIndex = uuidManager.findIndex(cellUuid);
  let text = cellManager.texts[cellIndex];
  const currentTag = cellManager.tags[cellIndex];

  let intoShiftBlock = false;

  if (block.start !== null) {
    const blockStart = block.start < block.end ? block.start : block.end;
    const blockEnd = block.start > block.end ? block.start : block.end;
    if (blockStart <= cellIndex && cellIndex <= blockEnd) {
      intoShiftBlock = true;
    }
  }

  useEffect(() => {
    text = !isLoading ? cellManager.texts[cellIndex] : "";
  }, [isLoading]);

  // -------------- Handler -----------------------
  const enterEvent = (e) => {
    const { textContent } = e.target;
    const componentCallback = cellGenerator.p;
    saveCursorPosition(dispatch);
    dispatch(cellActionCreator.input(cellUuid, textContent));
    newCell(cellUuid, dispatch, componentCallback);
    blockRelease(dispatch);
  };

  const arrowUpEvent = () => {
    focusPrev(dispatch);
    blockRelease(dispatch);
  };

  const shiftArrowUpEvent = () => {
    blockEndUp(cellUuid, dispatch);
  };

  const arrowDownEvent = () => {
    focusNext(dispatch);
    blockRelease(dispatch);
  };

  const shiftArrowDownEvent = () => {
    blockEndDown(cellUuid, dispatch);
  };

  const backspaceEvent = (e) => {
    const { textContent } = e.target;
    const cursorPos = getSelection();
    if (cursorPos.start === 0 && cursorPos.end === 0 && cellIndex > 0) {
      deleteCell(dispatch, cellUuid, textContent);
    }
  };

  const ctrlAEvent = () => {
    dispatch(cellActionCreator.blockAll());
  };

  const ctrlXEvent = () => {
    dispatch(cellActionCreator.copy());
    deleteCell(dispatch);
  };

  const ctrlCEvent = () => {
    dispatch(cellActionCreator.copy());
  };

  const ctrlVEvent = () => {
    dispatch(cellActionCreator.paste(cellUuid));
    blockRelease(dispatch);
  };

  const keydownHandlers = {
    [EVENT_TYPE.ENTER]: enterEvent,
    [EVENT_TYPE.ARROW_UP]: arrowUpEvent,
    [EVENT_TYPE.SHIFT_ARROW_UP]: shiftArrowUpEvent,
    [EVENT_TYPE.ARROW_DOWN]: arrowDownEvent,
    [EVENT_TYPE.SHIFT_ARROW_DOWN]: shiftArrowDownEvent,
    [EVENT_TYPE.BACKSPACE]: backspaceEvent,
    [EVENT_TYPE.CTRL_A]: ctrlAEvent,
    [EVENT_TYPE.CTRL_X]: ctrlXEvent,
    [EVENT_TYPE.CTRL_C]: ctrlCEvent,
    [EVENT_TYPE.CTRL_V]: ctrlVEvent,
  };

  // -------------- End -----------------------

  const isFocus = currentIndex === cellIndex;
  if (isFocus) {
    inputRef = state.inputRef;
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      const content = createCursor(text, cursor);
      inputRef.current.innerHTML = content;
      setCursorPosition();
      inputRef.current.normalize();
    }
    /**
     * 거슬려서 잠시 주석
     */
    // const isSaved = (e) => {
    //   e.preventDefault();
    //   e.returnValue = "정말로 닫으시겠습니까?";
    // };
    // window.addEventListener("beforeunload", isSaved);
  }, [inputRef]);

  useKeys(keydownHandlers, isFocus);

  const onKeyUp = (e) => {
    const { textContent } = e.target;

    const { findPattern, matchingTag } = getType(textContent);

    if (matchingTag && matchingTag !== currentTag) {
      const makeNewCell = cellGenerator[matchingTag];

      const isOrderedList = matchingTag === "ol";

      let newStart = null;
      if (isOrderedList) {
        newStart = start ? start + 1 : getStart(textContent);
      } else {
        newStart = 0;
      }

      const cell = makeNewCell(cellUuid, {
        start: newStart,
      });
      let exceptPatternText = "";
      if (findPattern) {
        exceptPatternText = textContent.slice(findPattern[0].length);
      }
      dispatch(
        cellActionCreator.transform(
          cellUuid,
          exceptPatternText,
          matchingTag,
          cell,
          newStart
        )
      );
    }
  };

  const onClick = () => {
    dispatch(cellActionCreator.focusMove(cellUuid));
    blockRelease(dispatch);
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

  const renderTarget = (
    <MarkdownWrapper
      as={currentTag}
      intoShiftBlock={intoShiftBlock}
      isCurrentCell={cellIndex === currentIndex}
      placeholder={PLACEHOLDER[currentTag]}
      onKeyUp={onKeyUp}
      onClick={onClick}
      onBlur={onBlur}
      ref={inputRef || null}
      dangerouslySetInnerHTML={htmlText()}
      contentEditable
      spellCheck={false}
    />
  );

  return renderTarget;
};

MarkdownCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default MarkdownCell;
