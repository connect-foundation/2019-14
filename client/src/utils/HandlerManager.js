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
 * 핸들러를 등록한다.
 * @param {String} eventType 이벤트 타입(enums/EVENT_TYPE)
 * @param {Function} handler 이벤트 핸들러
 */
const setHandler = (eventType, newHandler) => {
  handler[eventType] = newHandler;
};

const customKeydownEventHandler = (e) => {
  try {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (e.shiftKey) handler[EVENT_TYPE.SHIFT_ENTER](e);
        else handler[EVENT_TYPE.ENTER](e);
        break;
      case "Backspace":
        e.preventDefault();
        handler[EVENT_TYPE.BACKSPACE](e);
        break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) handler[EVENT_TYPE.SHIFT_TAB](e);
        else handler[EVENT_TYPE.TAB](e);
        break;
      case "ArrowUp":
        e.preventDefault();
        handler[EVENT_TYPE.ARROW_UP](e);
        break;
      case "ArrowDown":
        e.preventDefault();
        handler[EVENT_TYPE.ARROW_DOWN](e);
        break;
      default:
        break;
    }
  } catch (err) {
    // console.log(err);
  }
};

const clearWindowKeydownEvent = () => {
  window.removeEventListener("keydown", customKeydownEventHandler);
};

const setWindowKeydownEvent = () => {
  clearWindowKeydownEvent();
  window.addEventListener("keydown", customKeydownEventHandler);
};

export default {
  handler,
  initHandler,
  setHandler,
  setWindowKeydownEvent,
  clearWindowKeydownEvent,
};
