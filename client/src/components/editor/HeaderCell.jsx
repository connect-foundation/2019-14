import React, { useRef, useContext, useImperativeHandle } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "./style/MarkdownWrapper";
import { getType } from "../../utils/getType";
import { PLACEHOLDER } from "../../enums";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";

const INDEX_NOT_FOUNDED = -1;

const useSelfCellState = (state, cellUuid) => {
  const { texts, tags, uuidManager } = state;
  const index = uuidManager.findIndex(cellUuid);

  if (index === INDEX_NOT_FOUNDED) {
    // TODO: attach debug
    return null;
  }

  const tagType = tags[index];
  const placeHolder = PLACEHOLDER[tagType];
  const text = texts[index];

  return {
    index,
    tagType,
    text,
    placeHolder,
  };
};

const HeaderCell = React.forwardRef(({ cellUuid }, ref) => {
  const { state } = useContext(CellContext);
  const { tagType, text, placeHolder } = useSelfCellState(state, cellUuid);
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return (
    <MarkdownWrapper
      as={tagType}
      isQuote={false}
      placeholder={placeHolder}
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
