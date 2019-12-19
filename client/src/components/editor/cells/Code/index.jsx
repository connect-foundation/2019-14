import React, { useContext, useEffect, useState } from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import { useCellState, useKeys, getChecksumAllFalse } from "../../../../utils";
import { EVENT_TYPE } from "../../../../enums";
import { focusPrev, focusNext } from "../Markdown/handler";

const CodeCellWrapper = styled.p`
  &:empty {
    &::before {
      content: attr(placeholder);
      color: silver;
    }
  }
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: text;
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    border-left: ${({ isQuote }) => isQuote && "0.25rem solid silver"};
  }

  margin: 0;
  padding: 1em;

  background: ${({ intoShiftBlock }) =>
    intoShiftBlock && "rgba(128, 0, 255, 0.2)"};
  background: rgba(255, 255, 255, 0.08);

  border: none;
  border: ${({ isCurrentCell }) =>
    isCurrentCell && "1.5px solid rgba(255, 255, 255, 0.2)"};

  white-space: pre-wrap;
`;

const CodeCell = ({ cellUuid }) => {
  const [cursorPos, setCursorPos] = useState(0);
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const { text, placeholder, cellIndex, currentIndex } = useCellState(
    state,
    cellUuid
  );
  let inputRef = null;
  let intoShiftBlock = false;
  const { block, isShared } = state;

  if (block.start !== null) {
    const blockStart = block.start < block.end ? block.start : block.end;
    const blockEnd = block.start > block.end ? block.start : block.end;
    if (blockStart <= cellIndex && cellIndex <= blockEnd) {
      intoShiftBlock = true;
    }
  }

  const isFocus = currentIndex === cellIndex;
  if (isFocus) {
    inputRef = state.inputRef;
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current.firstChild === null) {
        const emptyElement = document.createTextNode("");
        inputRef.current.appendChild(emptyElement);
      }

      window.getSelection().collapse(inputRef.current.firstChild, cursorPos);
    }
  }, [inputRef]);

  // ------------ handler -----------
  const optionCommandUpEvent = () => {
    focusPrev(dispatch);
  };

  const optionCommandDownEvent = () => {
    focusNext(dispatch);
  };

  // 참고 : https://stackoverflow.com/a/36168767/12117094
  // ascii html code
  const tabEvent = () => {
    document.execCommand("insertHTML", false, "&#32;&#32;&#32;&#32;");
  };

  const backspaceEvent = (e) => {
    const { textContent } = e.target;
    if (textContent.length === 0) {
      dispatch(cellActionCreator.reset());
    }
  };

  const keydownHandlerArray = {
    [EVENT_TYPE.OPTION_COMMAND_UP]: optionCommandUpEvent,
    [EVENT_TYPE.OPTION_COMMAND_DOWN]: optionCommandDownEvent,
    [EVENT_TYPE.TAB]: tabEvent,
    [EVENT_TYPE.BACKSPACE]: backspaceEvent,
  };

  const eventTrigger = isFocus && !isShared;
  useKeys(
    keydownHandlerArray,
    eventTrigger,
    [],
    inputRef,
    getChecksumAllFalse()
  );

  const onClick = () => {
    dispatch(cellActionCreator.focusMove(cellUuid));
  };

  const onBlur = (e) => {
    const { innerText } = e.target;
    const cursorOffset = window.getSelection().focusOffset;
    setCursorPos(cursorOffset);
    dispatch(cellActionCreator.input(cellUuid, innerText));
  };

  return (
    <CodeCellWrapper
      contentEditable={!state.isShared}
      intoShiftBlock={intoShiftBlock}
      isCurrentCell={isFocus}
      isQuote={false}
      placeholder={placeholder}
      onClick={onClick}
      onBlur={onBlur}
      ref={inputRef || null}
      spellCheck={false}
      suppressContentEditableWarning
    >
      {text}
    </CodeCellWrapper>
  );
};

CodeCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default CodeCell;
