import React, { useContext, useEffect, useState } from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import { useCellState, useKeys } from "../../../../utils";
import { setGenerator } from "../CellGenerator";
import { focusPrev, focusNext, blockRelease } from "../Markdown/handler";
import { EVENT_TYPE } from "../../../../enums";

setGenerator("code", (uuid) => <CodeCell cellUuid={uuid} />);

const CodeCellWrapper = styled.div`
  border: none;

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

  padding: 0.2em;

  background: ${({ intoShiftBlock }) =>
    intoShiftBlock && "rgba(128, 0, 255, 0.2)"};

  border: ${({ isCurrentCell }) =>
    isCurrentCell && "1.5px solid rgba(255, 255, 255, 0.2)"};
  border-left: ${({ isQuote }) => isQuote && "0.25rem solid silver"};
  padding-left: ${({ isQuote }) => isQuote && "0.5rem"};
`;

const CodeCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const { tag, text, placeholder, cellIndex, currentIndex } = useCellState(
    state,
    cellUuid
  );
  let inputRef = null;
  let intoShiftBlock = false;
  const { block, cursor } = state;

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
      if (!text) {
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

  // ------------ handler -----------
  const codeEscapeUpEvent = () => {
    focusPrev(dispatch);
  };

  const codeEscapeDownEvent = () => {
    focusNext(dispatch);
  };

  const keydownHandlerArray = {
    [EVENT_TYPE.CODE_ESCAPE_UP]: codeEscapeUpEvent,
    [EVENT_TYPE.CODE_ESCAPE_DOWN]: codeEscapeDownEvent,
  };

  useKeys(keydownHandlerArray, isFocus);

  const onClick = () => {
    dispatch(cellActionCreator.focusMove(cellUuid));
    blockRelease(dispatch);
  };

  const onBlur = (e) => {
    const { innerHTML } = e.target;
    dispatch(cellActionCreator.input(cellUuid, innerHTML));
  };

  return (
    <CodeCellWrapper
      contentEditable
      intoShiftBlock={intoShiftBlock}
      isCurrentCell={cellIndex === currentIndex}
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
