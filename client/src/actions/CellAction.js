const CELL_ACTION = {
  NEW: "cell/new",
  INIT: "cell/init",
  TARGET: {
    CHANGE: "cell/target/change",
    TRANSFORM: "cell/transform",
  },
};

const cellActionCreator = {
  /**
   * 셀을 생성한다.
   * @returns type
   * - Cell Action Type
   * @returns renderTarget
   * - 새로 생성한 Cell
   */
  new(renderTarget) {
    return {
      type: CELL_ACTION.NEW,
      renderTarget,
    };
  },
  /**
   * 셀의 데이터를 초기화시킨다.
   * @param {Cell} renderTarget
   * - 초기화할 셀 컴포넌트
   * @param {Text} text
   * - 초기 데이터
   * @returns type
   * - 셀 액션 타입
   * @returns renderTarget
   * - 데이터를 [text]로 초기화할 Cell(React Component)
   * @returns text
   * - 초기화 데이터
   */
  init(renderTarget, text) {
    return {
      type: CELL_ACTION.INIT,
      renderTarget,
      text,
    };
  },
  /**
   * 엔터, 위/아래 화살표 입력, 셀 클릭시 셀 포커스를 이동시킨다.
   * - @todo cell 자체 말고 index로 변경해도 괜찮을 듯.
   * @param {Cell} selectedTarget
   * - 엔터: 다음 셀로 포커스 이동
   * - 위/아래: 이전/다음 셀로 포커스 이동
   * - 셀 클릭: 클릭한 셀로 포커스 이동
   */
  change(selectedTarget) {
    return {
      type: CELL_ACTION.TARGET.CHANGE,
      selectedTarget,
    };
  },
  /**
   * 셀의 속성을 변경한다.
   * - ex) default input cell -> list cell
   * @param {Cell} renderTarget
   * - 변경된 Cell(React Component)
   * - @todo 이 부분은 라인 파서와 연동이 필요함. 추가로 데이터 파라미터를 받아야 할 듯.
   */
  transform(renderTarget) {
    return {
      type: CELL_ACTION.TARGET.TRANSFORM,
      renderTarget,
    };
  },
};

export { CELL_ACTION, cellActionCreator };
