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
  deleteCell,
  focusPrev,
  focusNext,
  changeSpecialCharacter,
  blockEndUp,
  blockEndDown,
  blockRelease,
  htmlText,
} from "../Markdown/handler";
import { newCell, initCell } from "./handler";
import { cellGenerator, setGenerator } from "../CellGenerator";

setGenerator("ul", (uuid) => (
  <ul>
    <ListCell cellUuid={uuid} />
  </ul>
));
setGenerator("ol", (uuid, start) => (
  <ol start={start}>
    <ListCell cellUuid={uuid} />
  </ol>
));

const ListCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const { currentIndex, cellIndex, text, placeholder, tag } = useCellState(
    state,
    cellUuid
  );
  const { block, cursor } = state;
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
    if (
      textContent.length === 0 ||
      (currentCursor.start === 0 && currentCursor.end === 0)
    ) {
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
      newCell(cellUuid, dispatch, componentCallback, tag);
    }
    blockRelease(dispatch);
  };

  const arrowUpEvent = () => {
    focusPrev(dispatch);
    blockRelease(dispatch);
  };

  const arrowDownEvent = () => {
    focusNext(dispatch);
    blockRelease(dispatch);
  };

  const shiftArrowUpEvent = () => {
    blockEndUp(cellUuid, dispatch);
  };

  const shiftArrowDownEvent = () => {
    blockEndDown(cellUuid, dispatch);
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
    [EVENT_TYPE.ARROW_DOWN]: arrowDownEvent,
    [EVENT_TYPE.BACKSPACE]: backspaceEvent,
    [EVENT_TYPE.SHIFT_ARROW_UP]: shiftArrowUpEvent,
    [EVENT_TYPE.SHIFT_ARROW_DOWN]: shiftArrowDownEvent,
    [EVENT_TYPE.CTRL_A]: ctrlAEvent,
    [EVENT_TYPE.CTRL_X]: ctrlXEvent,
    [EVENT_TYPE.CTRL_C]: ctrlCEvent,
    [EVENT_TYPE.CTRL_V]: ctrlVEvent,
  };

  const isFocus = currentIndex === cellIndex;
  if (isFocus) {
    inputRef = state.inputRef;
  }

  useKeys(keydownHandlers, isFocus, [block.end]);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      const cellText = changeSpecialCharacter(text);
      if (cellText) {
        inputRef.current.innerHTML = cellText;
      } else {
        const emptyElement = document.createTextNode("");
        inputRef.current.appendChild(emptyElement);
      }
      const caret =
        cursor.start > inputRef.current.firstChild.length
          ? inputRef.current.firstChild.length
          : cursor.start;
      window.getSelection().collapse(inputRef.current.firstChild, caret);
    }
  }, [inputRef]);

  const onClick = () => {
    dispatch(cellActionCreator.focusMove(cellUuid));
    blockRelease(dispatch);
  };

  const onBlur = (e) => {
    const { textContent } = e.target;
    const cellText = changeSpecialCharacter(textContent);
    dispatch(cellActionCreator.input(cellUuid, cellText));
  };

  return (
    <MarkdownWrapper
      as="li"
      contentEditable
      intoShiftBlock={intoShiftBlock}
      isCurrentCell={cellIndex === currentIndex}
      placeholder={placeholder}
      onClick={onClick}
      onBlur={onBlur}
      ref={inputRef || null}
      dangerouslySetInnerHTML={htmlText(text)}
      spellCheck={false}
    />
  );
};

ListCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default ListCell;
