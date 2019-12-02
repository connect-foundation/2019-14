import React, { useEffect, useContext } from "react";
import propTypes from "prop-types";

import MarkdownWrapper from "../../style/MarkdownWrapper";
import { PLACEHOLDER, EVENT_TYPE } from "../../../../enums";
import { cellGenerator, setGenerator } from "../CellGenerator";
import { getType, getStart, handlerManager } from "../../../../utils";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import {
  getSelection,
  newCell,
  deleteCell,
  saveCursorPosition,
  focusPrev,
  focusNext,
  createCursor,
  setCursorPosition,
  blockEndUp,
  blockEndDown,
} from "./handler";

setGenerator("p", (uuid) => <MarkdownCell cellUuid={uuid} />);
setGenerator("hr", (uuid) => (
  <hr cellUuid={uuid} noshade="noshade" style={{ borderColor: "silver" }} />
));

const MarkdownCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatch = useContext(CellDispatchContext);
  const { currentIndex, uuidManager, start, cursor, block } = state;
  let inputRef = null;

  const cellIndex = uuidManager.findIndex(cellUuid);
  const text = state.texts[cellIndex];
  const currentTag = state.tags[cellIndex];

  let intoShiftBlock = false;

  if (block.start) {
    const blockStart = block.start < block.end ? block.start : block.end;
    const blockEnd = block.start > block.end ? block.start : block.end;
    if (blockStart <= cellIndex && cellIndex <= blockEnd) {
      intoShiftBlock = true;
    }
  }

  // -------------- Handler -----------------------
  const enterEvent = (e) => {
    const { textContent } = e.target;
    const componentCallback = cellGenerator.p;
    saveCursorPosition(dispatch, inputRef);
    dispatch(cellActionCreator.input(cellUuid, textContent));
    newCell(cellUuid, dispatch, componentCallback);
  };

  const arrowUpEvent = (e) => {
    focusPrev(cellUuid, e.target.textContent, dispatch, inputRef);
  };

  const shiftArrowUpEvent = () => {
    blockEndUp(cellUuid, dispatch);
  };

  const arrowDownEvent = (e) => {
    focusNext(cellUuid, e.target.textContent, dispatch, inputRef);
  };

  const shiftArrowDownEvent = () => {
    blockEndDown(cellUuid, dispatch);
  };

  const backspaceEvent = (e) => {
    if (state.block) {
      dispatch(cellActionCreator.blockDelete());
    } else {
      const { textContent } = e.target;
      if (textContent.length === 0 && cellIndex > 0) {
        deleteCell(dispatch, cellUuid);
      } else {
        const cursorPos = getSelection();
        if (cursorPos.start === 0 && cursorPos.end === 0) {
          deleteCell(dispatch, cellUuid, textContent);
        }
      }
    }
  };

  const keydownHandlers = {
    [EVENT_TYPE.ENTER]: enterEvent,
    [EVENT_TYPE.ARROW_UP]: arrowUpEvent,
    [EVENT_TYPE.SHIFT_ARROW_UP]: shiftArrowUpEvent,
    [EVENT_TYPE.ARROW_DOWN]: arrowDownEvent,
    [EVENT_TYPE.SHIFT_ARROW_DOWN]: shiftArrowDownEvent,
    [EVENT_TYPE.BACKSPACE]: backspaceEvent,
  };

  // -------------- End -----------------------

  if (currentIndex === cellIndex) {
    inputRef = state.inputRef;
    handlerManager.attachKeydownEvent(window, keydownHandlers, cellIndex);
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      const content = createCursor(text, cursor);
      inputRef.current.innerHTML = content;
      setCursorPosition();
      inputRef.current.normalize();
    }
    /**
     * 거슬려서 잠시 주석
     */
    // const isSaved = (e) => {
    //   e.preventDefault();
    //   e.returnValue = "정말로 닫으시겠습니까?";
    // };
    // window.addEventListener("beforeunload", isSaved);
  }, [inputRef]);

  const onKeyUp = (e) => {
    const { textContent } = e.target;

    const matchingTag = getType(textContent);

    if (matchingTag && matchingTag !== currentTag) {
      const makeNewCell = cellGenerator[matchingTag];

      const isOrderedList = matchingTag === "ol";

      let newStart = null;
      if (isOrderedList) {
        newStart = start ? start + 1 : getStart(textContent);
      } else {
        newStart = 0;
      }

      const cell = makeNewCell(cellUuid, newStart);

      dispatch(
        cellActionCreator.transform(cellUuid, "", matchingTag, cell, newStart)
      );
    }
  };

  const onClick = () => {
    handlerManager.attachKeydownEvent(window, keydownHandlers, cellIndex);
    dispatch(cellActionCreator.focusMove(cellUuid));
  };

  const htmlText = () => {
    /**
     * @todo text에 대한 보안장치 필요
     * @todo text에 대해 원하는 것 외에는 전부 유니코드로 바꾸는 로직 필요
     * - placeholder의 key 배열에 해당하는 태그 외에는 전부 변환한다던가
     */
    return { __html: text };
  };

  const renderTarget = (
    <MarkdownWrapper
      as={currentTag}
      intoShiftBlock={intoShiftBlock}
      placeholder={PLACEHOLDER[currentTag]}
      contentEditable
      onKeyUp={onKeyUp}
      onClick={onClick}
      ref={inputRef || null}
      dangerouslySetInnerHTML={htmlText()}
    />
  );

  return renderTarget;
};

MarkdownCell.propTypes = {
  cellUuid: propTypes.string.isRequired,
};

export default MarkdownCell;
