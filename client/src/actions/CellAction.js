import CELL_TAG from "../enums/CELL_TAG";

const CELL_ACTION = {
  INIT: "cell/init",
  NEW: "cell/new",
  INPUT: "cell/input",
  DELETE: "cell/delete",
  TARGET: {
    TRANSFORM: "cell/target/transform",
  },
  FOCUS: {
    PREV: "cell/focus/prev",
    NEXT: "cell/focus/next",
    MOVE: "cell/focus/move",
    ATTACH: "cell/focus/attach",
  },
  BLOCK: {
    ALL: "cell/block/all",
    UP: "cell/block/up",
    DOWN: "cell/block/down",
    RELEASE: "cell/block/release",
  },
  CURSOR: {
    MOVE: "cell/cursor/move",
  },
  CLIPBOARD: {
    COPY: "cell/clipboard/copy",
    PASTE: "cell/clipboard/paste",
  },
  TOOLBAR: {
    SAVE: "cell/toolbar/save",
    LOAD: "cell/toolbar/load",
    LOAD_FINISH: "cell/toolbar/load-finish",
  },
  SHARE: {
    APPLY: "cell/share/apply",
    LOAD: "cell/share/load",
  },
};

const cellActionCreator = {
  /**
   * 셀의 데이터를 초기화시킨다.
   * @param {Cell} createMarkdownCell 초기화할 셀을 리턴하는 콜백. 인자로 uuid를 넣어야 한다.
   * @param {Uuid} cellUuid 초기화할 셀의 uuid
   * - 파라미터로 넘기지 않으면 기본값 null
   */
  init(createMarkdownCell, cellUuid = null) {
    return {
      type: CELL_ACTION.INIT,
      createMarkdownCell,
      tag: CELL_TAG.DEFAULT,
      cellUuid,
    };
  },

  /**
   * 셀을 생성한다.
   * @param {Uuid} cellUuid 새 셀을 생성할 기준 셀의 uuid
   * - 엔터시 기준 셀의 다음 셀에 셀을 생성한다.
   * @param {Cell} createMarkdownCell 새 셀 컴포넌트를 리턴하는 콜백
   * @param {String} tag 셀의 타입(태그). 생략시 default input 셀이 생성된다.
   * @param {Number} start ordered list일 경우의 start
   */
  new(cellUuid, createMarkdownCell, tag = CELL_TAG.DEFAULT, start = null) {
    return {
      type: CELL_ACTION.NEW,
      cellUuid,
      createMarkdownCell,
      tag,
      start,
    };
  },

  /**
   * 셀의 텍스트를 변경한다.
   * @param {Uuid} cellUuid 텍스트를 변경할 셀의 uuid
   * @param {Text} text 변경된 텍스트
   */
  input(cellUuid, text) {
    return {
      type: CELL_ACTION.INPUT,
      cellUuid,
      text,
    };
  },

  /**
   * 지정한 셀을 삭제한다.
   * @param {Uuid} cellUuid 삭제할 셀의 uuid
   * @param {Text} text 이전 셀로 이동할 텍스트
   */
  delete(cellUuid, text = "") {
    return {
      type: CELL_ACTION.DELETE,
      cellUuid,
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
   * 셀 포커스를 지정한 위치로 이동시킨다.
   * @param {Uuid} cellUuid 포커스를 이동시킬 셀의 uuid
   */
  focusMove(cellUuid) {
    return {
      type: CELL_ACTION.FOCUS.MOVE,
      cellUuid,
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
   * @param {Uuid} cellUuid 변경할 Cell의 uuid
   * @param {String} text 변경할 Cell의 텍스트
   * @param {String} tag 변경할 Cell의 태그
   * @param {React.element} cell 변경할 Cell 요소
   * @param {Number} start ordered-list일 경우의 start
   */
  transform(cellUuid, text, tag, cell, start = null) {
    return {
      type: CELL_ACTION.TARGET.TRANSFORM,
      cellUuid,
      text,
      tag,
      cell,
      start,
    };
  },

  /**
   * 모든 셀을 선택한다.
   */
  blockAll() {
    return {
      type: CELL_ACTION.BLOCK.ALL,
    };
  },

  /**
   * 쉬프트+위 입력시 선택할 셀의 범위를 위로 한 단계 올린다.
   */
  blockUp() {
    return {
      type: CELL_ACTION.BLOCK.UP,
    };
  },

  /**
   * 쉬프트+아래 입력시 선택할 셀의 범위를 위로 한 단계 내린다.
   */
  blockDown() {
    return {
      type: CELL_ACTION.BLOCK.DOWN,
    };
  },

  /**
   * 블록 범위를 해제한다.
   */
  blockRelease() {
    return {
      type: CELL_ACTION.BLOCK.RELEASE,
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

  /**
   * 현재 블록 범위를 클립보드에 저장한다.
   */
  copy() {
    return {
      type: CELL_ACTION.CLIPBOARD.COPY,
    };
  },

  /**
   * 현재 셀의 다음 셀부터 클립보드의 내용을 붙여넣기 한다.
   */
  paste() {
    return {
      type: CELL_ACTION.CLIPBOARD.PASTE,
    };
  },

  save() {
    return {
      type: CELL_ACTION.TOOLBAR.SAVE,
    };
  },

  load() {
    return {
      type: CELL_ACTION.TOOLBAR.LOAD,
    };
  },

  loadFinish() {
    return {
      type: CELL_ACTION.TOOLBAR.LOAD_FINISH,
    };
  },

  share() {
    return {
      type: CELL_ACTION.SHARE.APPLY,
    };
  },

  shareLoad(docId) {
    return {
      type: CELL_ACTION.SHARE.LOAD,
      docId,
    };
  },
};

export { CELL_ACTION, cellActionCreator };
