import { CELL_TYPE } from "../enums";

const CELL_ACTION = {
  INIT: "cell/init",
  NEW: "cell/new",
  INPUT: "cell/input",
  TARGET: {
    TRANSFORM: "cell/target/transform",
  },
  FOCUS: {
    PREV: "cell/focus/prev",
    NEXT: "cell/focus/next",
    MOVE: "cell/focus/move",
    ATTACH: "cell/focus/attach",
  },
  CURSOR: {
    MOVE: "cell/cursor/move",
  },
};

const cellActionCreator = {
  /**
   * 셀의 데이터를 초기화시킨다.
   * @param {Cell} renderTarget 초기화할 셀을 리턴하는 콜백. 인자로 uuid를 넣어야 한다.
   * @param {Number} index 초기화할 셀의 index
   * - 파라미터로 넘기지 않으면 기본값 0
   */
  init(renderTarget, index) {
    return {
      type: CELL_ACTION.INIT,
      renderTarget,
      index: index || 0,
      tag: CELL_TYPE.DEFAULT,
    };
  },

  /**
   * 셀을 생성한다.
   * @param {Cell} renderTarget: 새 셀 컴포넌트를 리턴하는 콜백. 인자로 uuid를 넣어야 한다.
   */
  new(renderTarget) {
    return {
      type: CELL_ACTION.NEW,
      renderTarget,
      tag: CELL_TYPE.DEFAULT,
    };
  },

  /**
   * 셀의 텍스트를 변경한다.
   * @param {Text} text 변경된 텍스트
   */
  input(text) {
    return {
      type: CELL_ACTION.INPUT,
      text,
    };
  },

  /**
   * 셀 포커스를 바로 이전 셀로 이동시킨다.
   * - 위 방향키: 이전 셀로 포커스 이동
   */
  focusPrev() {
    return {
      type: CELL_ACTION.FOCUS.PREV,
    };
  },

  /**
   * 셀 포커스를 바로 다음 셀로 이동시킨다.
   * - 엔터: 다음 셀로 포커스 이동
   * - 아래 방향키: 다음 셀로 포커스 이동
   */
  focusNext() {
    return {
      type: CELL_ACTION.FOCUS.NEXT,
    };
  },

  /**
   * 셀 포커스를 인덱스 위치로 이동시킨다.
   * @param {Number} index 포커스를 이동시킬 인덱스
   */
  focusMove(index) {
    return {
      type: CELL_ACTION.FOCUS.MOVE,
      index,
    };
  },

  /**
   * 현재 셀에 ref를 부여한다.
   * @param {ref} inputRef input ref
   */
  focusAttachRef(inputRef) {
    return {
      type: CELL_ACTION.FOCUS.ATTACH,
      inputRef,
    };
  },

  /**
   * 셀의 속성을 변경한다.
   * - ex) default input cell -> list cell
   * @param {Number} index 변경할 Cell의 인덱스
   * @param {String} text 변경할 Cell의 텍스트
   * @param {String} tag 변경할 Cell의 태그
   */
  transform(index, text, tag) {
    return {
      type: CELL_ACTION.TARGET.TRANSFORM,
      index,
      text,
      tag,
    };
  },

  /**
   * 커서 이동시 커서 위치 상태를 갱신한다.
   * 블록이 아닌 경우, selectionStart와 selectionEnd가 같은 값을 가진다.
   * - @todo 셀 이동 시에만 갱신할지, 키다운 이벤트에 전부 이동 시킬지는 미정: 추후 결정
   * @param {Number} selectionStart 커서 시작 위치
   * @param {Number} selectionEnd 커서 끝 위치
   */
  moveCursor(selectionStart, selectionEnd) {
    return {
      type: CELL_ACTION.CURSOR.MOVE,
      selectionStart,
      selectionEnd,
    };
  },
};

export { CELL_ACTION, cellActionCreator };
