// 수정 간 현재 useImperativeHandle는 사용하지 않습니다.
import React, { useEffect, useContext, useImperativeHandle } from "react";
import propTypes from "prop-types";
// 수정 간 현재 renderToString은 사용하지 않습니다.
// import { renderToString } from "react-dom/server";

import MarkdownWrapper from "../../style/MarkdownWrapper";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator } from "../../../../actions/CellAction";
import { EVENT_TYPE } from "../../../../enums";
import { useCellState, handlerManager } from "../../../../utils";

import {
  newCell,
  saveCursorPosition,
  isContinuePrev,
  isContinueNext,
  focusPrev,
  focusNext,
  setCursorPosition,
  createCursor
} from "../markdowns/handler";
// 수정 간 현재 cellGenerator를 사용하지 않습니다.
import { cellGenerator, setGenerator } from "../cell-generator";

/**
 * @todo ul 및 ol 파일 분리
 */
setGenerator("ul", uuid => (
  <ul>
    <ListCell cellUuid={uuid} />
  </ul>
));
setGenerator("ol", (uuid, start) => (
  <ol start={start}>
    <ListCell cellUuid={uuid} />
  </ol>
));

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

  const enterEvent = e => {
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

    const component = uuid =>
      isOrderedList ? (
        <ol start={newStart}>
          <ListCell cellUuid={uuid} />
        </ol>
      ) : (
        <ul>
          <ListCell cellUuid={uuid} />
        </ul>
      );

    const componentCallback = uuid => component(uuid);

    saveCursorPosition(dispatch, inputRef);
    dispatch(cellActionCreator.input(cellUuid, textContent));
    newCell(dispatch, componentCallback, tag, newStart);
  };

  const arrowUpEvent = e => {
    if (isContinuePrev(cellIndex)) {
      focusPrev(cellUuid, e.target.textContent, dispatch, inputRef);
    }
  };

  const arrowDownEvent = e => {
    if (isContinueNext(cellIndex, state.cells.length)) {
      focusNext(cellUuid, e.target.textContent, dispatch, inputRef);
    }
  };

  const keydownHandlers = {
    [EVENT_TYPE.ENTER]: enterEvent,
    [EVENT_TYPE.ARROW_UP]: arrowUpEvent,
    [EVENT_TYPE.ARROW_DOWN]: arrowDownEvent
  };

  if (currentIndex === cellIndex) {
    inputRef = state.inputRef;

    handlerManager.attachKeydownEvent(window, keydownHandlers, cellIndex, "li");
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      if (text.length > 0) {
        const content = createCursor(text, state.cursor);
        inputRef.current.innerHTML = content;
        setCursorPosition();
        inputRef.current.normalize();
      }
    }
  }, [inputRef]);

  const onClick = () => {
    handlerManager.attachKeydownEvent(window, keydownHandlers, cellIndex, tag);
  };

  const htmlText = () => {
    /**
     * @todo text에 대한 보안장치 필요
     * @todo text에 대해 원하는 것 외에는 전부 유니코드로 바꾸는 로직 필요
     * - placeholder의 key 배열에 해당하는 태그 외에는 전부 변환한다던가
     */
    return { __html: text };
  };

  return (
    <MarkdownWrapper
      as="li"
      contentEditable
      placeholder={placeholder}
      onClick={onClick}
      ref={inputRef || null}
      dangerouslySetInnerHTML={htmlText()}
    />
  );
};

ListCell.propTypes = {
  cellUuid: propTypes.string.isRequired
};

export default ListCell;
