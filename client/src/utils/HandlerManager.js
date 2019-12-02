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
let handler = {
  [EVENT_TYPE.ENTER]: null,
  [EVENT_TYPE.SHIFT_ENTER]: null,
  [EVENT_TYPE.BACKSPACE]: null,
  [EVENT_TYPE.TAB]: null,
  [EVENT_TYPE.SHIFT_TAB]: null,
  [EVENT_TYPE.ARROW_UP]: null,
  [EVENT_TYPE.ARROW_DOWN]: null,
};

/**
 * 기본 키 입력 이벤트를 모두 null로 초기화한다.
 * 만약, 추가로 등록한 이벤트가 있을 경우 삭제한다.
 */
const initHandler = () => {
  handler = {
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
 * 현재 등록되어 있는 핸들러들의 셀 타입
 */
let currentCell = null;
/**
 * 현재 등록되어 있는 핸들러들의 셀 인덱스
 */
let currentIndex = null;

/**
 * 핸들러를 등록한다.
 * @param {String} eventType 이벤트 타입(enums/EVENT_TYPE)
 * @param {Function} handler 이벤트 핸들러
 */
const setHandler = (eventType, newHandler) => {
  handler[eventType] = newHandler;
};

/**
 * 기본 키 입력 이벤트
 * - (Shift + )Enter
 * - Backspack
 * - (Shift + )Tab
 * - ArrowUp
 * - ArrowDown
 * 그 외의 이벤트는 setHandler를 이용하여 추가(미구현)
 * @param {Event} e event
 */
const customKeydownEventHandler = (e) => {
  try {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (e.shiftKey) handler[EVENT_TYPE.SHIFT_ENTER](e);
        else handler[EVENT_TYPE.ENTER](e);
        break;
      case "Backspace":
        handler[EVENT_TYPE.BACKSPACE](e);
        break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) handler[EVENT_TYPE.SHIFT_TAB](e);
        else handler[EVENT_TYPE.TAB](e);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (e.shiftKey) handler[EVENT_TYPE.SHIFT_ARROW_UP](e);
        else handler[EVENT_TYPE.ARROW_UP](e);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (e.shiftKey) handler[EVENT_TYPE.SHIFT_ARROW_DOWN](e);
        else handler[EVENT_TYPE.ARROW_DOWN](e);
        break;
      default:
        break;
    }
  } catch (err) {
    // console.log(err);
  }
};

/**
 * 지정한 엘리먼트에 등록된 custom keydown 이벤트를 제거한다.
 * @param {Element} target custom keydown 이벤트를 초기화할 타겟 엘리먼트
 * - ex) window
 */
const clearWindowKeydownEvent = (target = window) => {
  target.removeEventListener("keydown", customKeydownEventHandler);
};

/**
 * 지정한 엘리먼트에 등록된 custom keydown 이벤트를 초기화하고, 다시 이벤트를 등록한다.
 * @param {Element} target custom keydown 이벤트를 붙일 타겟 엘리먼트
 * - ex) window
 */
const setWindowKeydownEvent = (target = window) => {
  clearWindowKeydownEvent(target);
  target.addEventListener("keydown", customKeydownEventHandler);
};

/**
 * all in one 함수
 * initHandler, setHandler, setWindowKeydownEvent를 한번에 해준다.
 * @param {Element} target custom keydown 이벤트를 붙일 타겟 엘리먼트
 * - ex) window
 * @param {Object} keydownHandlers key와 핸들러를 매칭시킨 Object
 * - ex) {
 *   [EVENT_TYPE.ENTER]: (e) => {},
 *   [EVENT_TYPE.ARROW_UP]: (e) => {},
 *   ...
 * }
 * @param {String} tag 현재 셀의 타입(태그)
 * - ex) h2
 */
const attachKeydownEvent = (
  target = window,
  keydownHandlers,
  index,
  tag = ""
) => {
  if (tag !== currentCell || index !== currentIndex) {
    currentCell = tag;
    currentIndex = index;
    initHandler();
    Object.keys(keydownHandlers).forEach((key) => {
      const keydownHandler = keydownHandlers[key];
      setHandler(key, keydownHandler);
    });
    setWindowKeydownEvent(target);
  }
};

export default {
  attachKeydownEvent,
  initHandler,
  setHandler,
  setWindowKeydownEvent,
  clearWindowKeydownEvent,
};
