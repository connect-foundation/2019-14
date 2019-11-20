const CELL_ACTION = {
  INIT: "cell/init",
  NEW: "cell/new",
  INPUT: "cell/input",
  TARGET: {
    PREV: "cell/target/prev",
    NEXT: "cell/target/next",
    TRANSFORM: "cell/target/transform",
  },
  CURSOR: {
    MOVE: "cell/cursor/move",
  },
};

const cellActionCreator = {
  /**
   * 셀의 데이터를 초기화시킨다.
   * @param {Cell} renderTarget 초기화할 셀
   * @param {Number} index 초기화할 셀의 index
   * - 파라미터로 넘기지 않으면 기본값 0
   * @returns type: 셀 액션 타입
   * @returns renderTarget: 데이터를 [text]로 초기화할 셀 컴포넌트
   * @returns: text 초기화 데이터
   */
  init(renderTarget, index) {
    return {
      type: CELL_ACTION.INIT,
      renderTarget,
      index: index || 0,
    };
  },
  /**
   * 셀을 생성한다.
   * @returns type: 셀 액션 타입
   * @returns renderTarget: 새로 생성한 셀 컴포넌트
   */
  new(renderTarget) {
    return {
      type: CELL_ACTION.NEW,
      renderTarget,
    };
  },
  /**
   * 셀의 텍스트를 변경한다.
   * @param {Text} text 변경된 텍스트
   * @returns type: 셀 액션 타입
   * @returns renderTarget: 데이터를 [text]로 변경할 Cell
   * @returns text: 변경된 텍스트
   */
  input(text) {
    return {
      type: CELL_ACTION.INPUT,
      text,
    };
  },
  /**
   * 셀 포커스를 이동시킨다.
   * - 위 방향키: 이전 셀로 포커스 이동
   */
  prev() {
    return {
      type: CELL_ACTION.TARGET.PREV,
    };
  },
  /**
   * 셀 포커스를 이동시킨다.
   * - 엔터: 다음 셀로 포커스 이동
   * - 아래 방향키: 다음 셀로 포커스 이동
   */
  next() {
    return {
      type: CELL_ACTION.TARGET.NEXT,
    };
  },
  /**
   * 셀의 속성을 변경한다.
   * - ex) default input cell -> list cell
   * @param {Cell} renderTarget
   * - 변경된 Cell(React Component)
   * - @todo 이 부분은 라인 파서와 연동이 필요함. 추가로 데이터 파라미터를 받아야 할 듯.
   * - 라인 파서로 변경된 데이터가 반영된 텍스트를 받아서 store에 넣어줘야 함
   * - @todo 현재 무슨 태그인지 저장하기
   */
  transform(renderTarget, text) {
    return {
      type: CELL_ACTION.TARGET.TRANSFORM,
      renderTarget,
      text,
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
