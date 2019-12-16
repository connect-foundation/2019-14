import React, { useEffect, useContext } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "../../style/MarkdownWrapper";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import { EVENT_TYPE, PLACEHOLDER } from "../../../../enums";
import { useCellState, useKeys, uuidManager } from "../../../../utils";

import {
  getSelection,
  saveCursorPosition,
  deleteCell,
  blockRelease,
} from "../Markdown/handler";
import { newCell, initCell } from "./handler";
import { cellGenerator, setGenerator } from "../CellGenerator";

setGenerator("ul", (uuid) => <ListCell cellUuid={uuid} />);
setGenerator("ol", (uuid) => <ListCell cellUuid={uuid} />);

const ListCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const { currentIndex, cellIndex, text, placeholder, tag } = useCellState(
    state,
    cellUuid
  );
  const { block, cursor, cellManager, isShared } = state;
  const { options } = cellManager;
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

    if (isStartPos) {
      const componentCallback = cellGenerator.p;
      dispatch(cellActionCreator.input(cellUuid, textContent));
      initCell(cellUuid, dispatch, componentCallback);
    }
    if (state.block.start !== null) {
      deleteCell(dispatch);
    }
  };

  const enterEvent = (e) => {
    const { textContent } = e.target;
    /*
      e.target.insertAdjacentHTML(
        "afterend",
        renderToString(
          <MarkdownWrapper
            as="li"
            placeholder={placeholder}
            ref={inputRef || null}
            suppressContentEditableWarning
            contentEditable
          ></MarkdownWrapper>
        )
      );
      */
    if (textContent.length === 0) {
      backspaceEvent(e);
    } else {
      const isOrderedList = tag === "ol";

      const componentCallback = isOrderedList
        ? cellGenerator.ol
        : cellGenerator.ul;

      saveCursorPosition(dispatch);
      dispatch(cellActionCreator.input(cellUuid, textContent));
      newCell(cellUuid, dispatch, componentCallback, tag, start);
    }
    blockRelease(dispatch);
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
  useKeys(keydownHandlers, eventTrigger, [block.end]);

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
