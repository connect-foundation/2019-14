import React, { useEffect, useContext } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "../../style/MarkdownWrapper";
import { PLACEHOLDER, EVENT_TYPE } from "../../../../enums";
import { cellGenerator, setGenerator } from "../CellGenerator";
import { useKeys, uuidManager, attachDefaultHandlers } from "../../../../utils";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import {
  getSelection,
  newCell,
  deleteCell,
  saveCursorPosition,
  focusPrev,
  focusNext,
  blockEndUp,
  blockEndDown,
  blockRelease,
  transformCell,
} from "./handler";

setGenerator("p", (uuid) => <MarkdownCell cellUuid={uuid} />);
setGenerator("hr", (uuid) => (
  <hr cellUuid={uuid} noshade="noshade" style={{ borderColor: "silver" }} />
));

const MarkdownCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const {
    currentIndex,
    cursor,
    block,
    cellManager,
    isLoading,
    isShared,
  } = state;
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
    transformCell(cellUuid, dispatch, text, currentTag);
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

  const shiftEnterEvent = () => {};

  const arrowUpEvent = () => {
    focusPrev(dispatch);
    blockRelease(dispatch);
  };

  const shiftArrowUpEvent = () => {
    blockEndUp(dispatch);
  };

  const arrowDownEvent = () => {
    focusNext(dispatch);
    blockRelease(dispatch);
  };

  const shiftArrowDownEvent = () => {
    blockEndDown(dispatch);
  };

  const backspaceEvent = (e) => {
    const { textContent } = e.target;
    const cursorPos = getSelection();

    /**
     * @todo 블록 부분들은 추후 싹 리팩토링 예정
     */
    if (
      (cursorPos.start === 0 && cursorPos.end === 0 && cellIndex > 0) ||
      state.block.start !== null
    ) {
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
    dispatch(cellActionCreator.paste());
    blockRelease(dispatch);
  };

  const defaultKeydownHandlers = {
    [EVENT_TYPE.SHIFT_ENTER]: shiftEnterEvent,
    [EVENT_TYPE.ARROW_UP]: arrowUpEvent,
    [EVENT_TYPE.ARROW_DOWN]: arrowDownEvent,
    [EVENT_TYPE.SHIFT_ARROW_UP]: shiftArrowUpEvent,
    [EVENT_TYPE.SHIFT_ARROW_DOWN]: shiftArrowDownEvent,
    [EVENT_TYPE.CTRL_A]: ctrlAEvent,
    [EVENT_TYPE.CTRL_X]: ctrlXEvent,
    [EVENT_TYPE.CTRL_C]: ctrlCEvent,
    [EVENT_TYPE.CTRL_V]: ctrlVEvent,
  };

  const keydownHandlers = {
    [EVENT_TYPE.ENTER]: enterEvent,
    [EVENT_TYPE.BACKSPACE]: backspaceEvent,
  };

  const isFocus = currentIndex === cellIndex;
  if (isFocus) {
    inputRef = state.inputRef;
  }

  const eventTrigger = isFocus && !isShared;
  attachDefaultHandlers(defaultKeydownHandlers);
  useKeys(keydownHandlers, eventTrigger, [block.end]);
  // -------------- End -----------------------

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current.firstChild === null) {
        const emptyElement = document.createTextNode("");
        inputRef.current.appendChild(emptyElement);
      }

      const caretOffset =
        cursor.start > inputRef.current.firstChild.length
          ? inputRef.current.firstChild.length
          : cursor.start;
      window.getSelection().collapse(inputRef.current.firstChild, caretOffset);
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

  const onKeyUp = (e) => {
    const { textContent } = e.target;

    transformCell(cellUuid, dispatch, textContent, currentTag);
  };

  const onClick = () => {
    dispatch(cellActionCreator.focusMove(cellUuid));
    blockRelease(dispatch);
  };

  const onBlur = (e) => {
    const { textContent } = e.target;
    dispatch(cellActionCreator.input(cellUuid, textContent));
  };

  const textContent = text.length > 0 ? text : "\u200b";
  const renderTarget = (
    <MarkdownWrapper
      as={currentTag}
      contentEditable={!state.isShared}
      intoShiftBlock={intoShiftBlock}
      isCurrentCell={isFocus}
      placeholder={PLACEHOLDER[currentTag]}
      onKeyUp={onKeyUp}
      onClick={onClick}
      onBlur={onBlur}
      ref={inputRef || null}
      spellCheck={false}
      suppressContentEditableWarning
    >
      {!isShared ? text : textContent}
    </MarkdownWrapper>
  );

  return renderTarget;
};

MarkdownCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default MarkdownCell;
