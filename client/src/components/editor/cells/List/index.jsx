import React, { useEffect, useContext, useImperativeHandle } from "react";
import propTypes from "prop-types";
import { renderToString } from "react-dom/server";

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
  const { currentIndex, cellIndex, text, placeholder, tag } = useCellState(
    state,
    cellUuid
  );
  let inputRef = null;

  const { start } = state;
  const newStart = start + 1;

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
      const isOrderedList = tag == "ol";

      const component = (uuid) =>
        isOrderedList ? (
          <ol start={newStart}>
            <ListCell cellUuid={uuid} />
          </ol>
        ) : (
          <ul>
            <ListCell cellUuid={uuid} />
          </ul>
        );

      const componentCallback = (uuid) => component(uuid);

      saveCursorPosition(dispatch, inputRef);
      dispatch(cellActionCreator.input(cellUuid, textContent));
      newCell(dispatch, componentCallback, tag, newStart);
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
  }, [inputRef]);

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
