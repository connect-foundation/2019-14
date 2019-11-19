const CELL_ACTION = {
  NEW: "cell/new",
  INIT: "cell/init",
  INPUT: "cell/input",
  TARGET: {
    PREV: "cell/target/prev",
    NEXT: "cell/target/next",
    TRANSFORM: "cell/transform",
  },
};

const cellActionCreator = {
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
   * 셀의 데이터를 초기화시킨다.
   * @param {Number} index 초기화할 셀의 index
   * @param {Text} text 초기 데이터
   * @returns type: 셀 액션 타입
   * @returns renderTarget: 데이터를 [text]로 초기화할 셀 컴포넌트
   * @returns: text 초기화 데이터
   */
  init(index, text) {
    return {
      type: CELL_ACTION.INIT,
      index,
      text: text || "",
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
  transform(renderTarget, currentIndex, text) {
    return {
      type: CELL_ACTION.TARGET.TRANSFORM,
      currentIndex,
      renderTarget,
      text,
    };
  },
};

export { CELL_ACTION, cellActionCreator };
