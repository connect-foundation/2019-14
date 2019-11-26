import { EVENT_TYPE } from "../enums";

/**
 * 기본 키 입력 이벤트
 * - (Shift + )Enter
 * - Backspack
 * - (Shift + )Tab
 * - ArrowUp
 * - ArrowDown
 * 그 외의 이벤트는 setHandler를 이용하여 추가
 */
function HandlerManager() {
  this.handler = {
    [EVENT_TYPE.ENTER]: null,
    [EVENT_TYPE.SHIFT_ENTER]: null,
    [EVENT_TYPE.BACKSPACE]: null,
    [EVENT_TYPE.TAB]: null,
    [EVENT_TYPE.SHIFT_TAB]: null,
    [EVENT_TYPE.ARROW_UP]: null,
    [EVENT_TYPE.ARROW_DOWN]: null,
  };
}

/**
 * 기본 키 입력 이벤트를 모두 null로 초기화한다.
 * 만약, 추가로 등록한 이벤트가 있을 경우 삭제한다.
 */
HandlerManager.prototype.initHandler = () => {
  this.handler = {
    [EVENT_TYPE.ENTER]: null,
    [EVENT_TYPE.SHIFT_ENTER]: null,
    [EVENT_TYPE.BACKSPACE]: null,
    [EVENT_TYPE.TAB]: null,
    [EVENT_TYPE.SHIFT_TAB]: null,
    [EVENT_TYPE.ARROW_UP]: null,
    [EVENT_TYPE.ARROW_DOWN]: null,
  };
};

/**
 * @param {String} eventType 이벤트 타입(enums/EVENT_TYPE)
 * @param {Function} handler 이벤트 핸들러
 */
HandlerManager.prototype.setHandler = (eventType, handler) => {
  this.handler[eventType] = handler;
};

export default HandlerManager;
