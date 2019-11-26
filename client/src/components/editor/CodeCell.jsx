import React, { useRef, useContext, useImperativeHandle } from "react";

import MarkdownWrapper from "./style/MarkdownWrapper";
import { PLACEHOLDER } from "../../enums";
import { CellContext } from "../../stores/CellStore";

const useSelfCellState = (state, cellUuid) => {
  const { texts, tags, uuidManager } = state;

  const index = uuidManager.findIndex(cellUuid);

  if (index < 0) {
    // TODO: attach debug
    return null;
  }

  const tag = tags[index];
  const placeholder = PLACEHOLDER[tag];
  const text = texts[index];

  return {
    index,
    tag,
    text,
    placeholder,
  };
};

const CodeCell = React.forwardRef(({ cellUuid }, ref) => {
  const { state } = useContext(CellContext);
  const { tag, text, placeholder } = useSelfCellState(state, cellUuid);
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return (
    <MarkdownWrapper
      as={tag}
      placeholder={placeholder}
      // onKeyDown={keyDownHandler}
      // onKeyPress={onKeyPress}
      // onBlur={blurHandler}
      ref={inputRef || null}
      suppressContentEditableWarning
      contentEditable
    >
      {text}
    </MarkdownWrapper>
  );
});

export default CodeCell;
