import React, { useEffect, useContext } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "../../style/MarkdownWrapper";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import { EVENT_TYPE } from "../../../../enums";
import { useCellState, useKeys } from "../../../../utils";

import {
  getSelection,
  saveCursorPosition,
  blockRelease,
} from "../Markdown/handler";
import { newCell, transformCell } from "./handler";

const ListCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const { currentIndex, cellIndex, text, placeholder, tag } = useCellState(
    state,
    cellUuid
  );
  const { block, cursor, cellManager, isShared } = state;
  const { options } = cellManager;
  const depth =
    options[cellIndex] && options[cellIndex].depth
      ? options[cellIndex].depth
      : 0;
  const start =
    options[cellIndex] && options[cellIndex].start
      ? options[cellIndex].start
      : null;
  let inputRef = null;
  let intoShiftBlock = false;

  if (block.start !== null) {
    const blockStart = block.start < block.end ? block.start : block.end;
    const blockEnd = block.start > block.end ? block.start : block.end;
    if (blockStart <= cellIndex && cellIndex <= blockEnd) {
      intoShiftBlock = true;
    }
  }

  const backspaceEvent = (e) => {
    const { textContent } = e.target;
    const currentCursor = getSelection();
    const isStartPos =
      textContent.length === 0 ||
      (currentCursor.start === 0 && currentCursor.end === 0);

    if (block.start !== null) {
      dispatch(cellActionCreator.blockDelete());
    } else if (isStartPos) {
      if (depth) {
        transformCell(cellUuid, dispatch, textContent, tag, depth - 1, start);
      } else {
        dispatch(cellActionCreator.input(cellUuid, textContent));
        dispatch(cellActionCreator.reset());
      }
    }
  };

  const enterEvent = (e) => {
    const { textContent } = e.target;
    if (textContent.length === 0) {
      backspaceEvent(e);
    } else {
      saveCursorPosition(dispatch);
      dispatch(cellActionCreator.input(cellUuid, textContent));
      newCell(dispatch);
    }
    blockRelease(dispatch);
  };

  const tabEvent = (ev) => {
    const { textContent } = ev.target;

    transformCell(cellUuid, dispatch, textContent, tag, depth + 1, start);
  };

  const shiftTabEvent = (ev) => {
    const { textContent } = ev.target;

    transformCell(cellUuid, dispatch, textContent, tag, depth - 1, start);
  };

  const keydownHandlers = {
    [EVENT_TYPE.ENTER]: enterEvent,
    [EVENT_TYPE.BACKSPACE]: backspaceEvent,
    [EVENT_TYPE.TAB]: tabEvent,
    [EVENT_TYPE.SHIFT_TAB]: shiftTabEvent,
  };

  const isFocus = currentIndex === cellIndex;
  if (isFocus) {
    inputRef = state.inputRef;
  }

  const eventTrigger = isFocus && !isShared;
  useKeys(keydownHandlers, eventTrigger, [block.end, depth], inputRef);

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
  }, [inputRef]);

  const onClick = () => {
    dispatch(cellActionCreator.focusMove(cellUuid));
    blockRelease(dispatch);
  };

  const onBlur = (e) => {
    const { textContent } = e.target;
    dispatch(cellActionCreator.input(cellUuid, textContent));
  };

  const renderTarget = (
    <MarkdownWrapper
      as="li"
      contentEditable={!state.isShared}
      intoShiftBlock={intoShiftBlock}
      isCurrentCell={isFocus}
      placeholder={placeholder}
      onClick={onClick}
      onBlur={onBlur}
      ref={inputRef || null}
      spellCheck={false}
      suppressContentEditableWarning
      isList
      depth={depth}
    >
      {text}
    </MarkdownWrapper>
  );

  if (tag === "ol") {
    return <ol start={start}>{renderTarget}</ol>;
  }
  return <ul>{renderTarget}</ul>;
};

ListCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default ListCell;
