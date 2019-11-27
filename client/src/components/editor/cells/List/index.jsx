import React, { useEffect, useContext, useImperativeHandle } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "../../style/MarkdownWrapper";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import { EVENT_TYPE } from "../../../../enums";
import { useCellState, handlerManager } from "../../../../utils";

import {
  saveCursorPosition,
  isContinuePrev,
  isContinueNext,
  focusPrev,
  focusNext,
  setCursorPosition,
  createCursor,
} from "../Markdown/handler";
import { newCell } from "./handler";

// const ListCell = React.forwardRef(({ cellUuid }, ref) => {
const ListCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const { currentIndex, cellIndex, text, placeholder } = useCellState(
    state,
    cellUuid
  );
  let inputRef = null;
  // const inputRef = useRef();

  // useImperativeHandle(ref, () => ({
  //   focus: () => {
  //     inputRef.current.focus();
  //   },
  // }));

  if (currentIndex === cellIndex) {
    inputRef = state.inputRef;

    const enterEvent = (e) => {
      const { textContent } = e.target;
      const componentCallback = (uuid) => (
        <ul>
          <ListCell cellUuid={uuid} />
        </ul>
      );
      saveCursorPosition(dispatch, inputRef);
      dispatch(cellActionCreator.input(cellUuid, textContent));
      newCell(dispatch, componentCallback, "ul");
    };

    const arrowUpEvent = (e) => {
      if (isContinuePrev(cellIndex)) {
        focusPrev(cellUuid, e.target.textContent, dispatch, inputRef);
      }
    };

    const arrowDownEvent = (e) => {
      if (isContinueNext(cellIndex, state.cells.length)) {
        focusNext(cellUuid, e.target.textContent, dispatch, inputRef);
      }
    };

    const keydownHandlers = {
      [EVENT_TYPE.ENTER]: enterEvent,
      [EVENT_TYPE.ARROW_UP]: arrowUpEvent,
      [EVENT_TYPE.ARROW_DOWN]: arrowDownEvent,
    };

    handlerManager.attachKeydownEvent(window, keydownHandlers, cellIndex, "li");
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      // const content = createCursor(text, state.cursor);
      // inputRef.current.innerHTML = content;
      // setCursorPosition();
      // inputRef.current.normalize();
    }
  }, []);

  return (
    <MarkdownWrapper
      as="li"
      placeholder={placeholder}
      ref={inputRef || null}
      suppressContentEditableWarning
      contentEditable
    >
      {text}
    </MarkdownWrapper>
  );
};

ListCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default ListCell;
