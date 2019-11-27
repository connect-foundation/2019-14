import React, { useRef, useContext, useImperativeHandle } from "react";

import MarkdownWrapper from "./style/MarkdownWrapper";
import { CellContext } from "../../stores/CellStore";
import { useCellState } from "../../utils/";

const HeaderCell = React.forwardRef(({ cellUuid }, ref) => {
  const { state } = useContext(CellContext);
  const { tag, text, placeholder } = useCellState(state, cellUuid);
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return (
    <MarkdownWrapper
      as={tag}
      isQuote={false}
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

export default HeaderCell;
