import React, { useRef, useContext, useImperativeHandle } from "react";

import propTypes from "prop-types";
import MarkdownWrapper from "../../style/MarkdownWrapper";
import { CellContext } from "../../../../stores/CellStore";
import { useCellState } from "../../../../utils";

import { cellGenerator, setGenerator } from "../CellGenerator";

setGenerator("blockquote", (uuid) => <QuoteCell cellUuid={uuid} />);

const QuoteCell = React.forwardRef(({ cellUuid }, ref) => {
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
      isQuote
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

QuoteCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default QuoteCell;
