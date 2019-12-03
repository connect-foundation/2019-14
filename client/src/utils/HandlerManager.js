import { useEffect } from "react";
import { EVENT_TYPE } from "../enums";

const KEY_TYPE = {
  ENTER: "Enter",
  TAB: "Tab",
  BACKSPACE: "Backspace",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
};

const makeKeyHandler = {
  [EVENT_TYPE.ENTER]: (handler) => {
    return (e) => {
      if (e.key === KEY_TYPE.ENTER) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.SHIFT_ENTER]: (handler) => {
    return (e) => {
      const { key, shiftKey } = e;
      const isShiftEnter = key === KEY_TYPE.ENTER && shiftKey;
      if (isShiftEnter) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.BACKSPACE]: (handler) => {
    return (e) => {
      if (e.key === KEY_TYPE.BACKSPACE) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.TAB]: (handler) => {
    return (e) => {
      if (e.key === KEY_TYPE.TAB) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.SHIFT_TAB]: (handler) => {
    return (e) => {
      const { key, shiftKey } = e;
      const isShiftTab = key === KEY_TYPE.TAB && shiftKey;
      if (isShiftTab) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.ARROW_UP]: (handler) => {
    return (e) => {
      if (e.key === KEY_TYPE.ARROW_UP) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.SHIFT_ARROW_UP]: (handler) => {
    return (e) => {
      const { key, shiftKey } = e;
      const isShiftUp = key === KEY_TYPE.ARROW_UP && shiftKey;
      if (isShiftUp) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.ARROW_DOWN]: (handler) => {
    return (e) => {
      if (e.key === KEY_TYPE.ARROW_DOWN) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.SHIFT_ARROW_DOWN]: (handler) => {
    return (e) => {
      const { key, shiftKey } = e;
      const isShiftDown = key === KEY_TYPE.ARROW_DOWN && shiftKey;
      if (isShiftDown) {
        e.preventDefault();
        handler(e);
      }
    };
  },
};

const useKey = (keyEvent, handler, isFocus, deps = []) => {
  const keydownHandler = makeKeyHandler[keyEvent](handler);
  useEffect(() => {
    if (isFocus) {
      console.log("focus the useKey", keyEvent, isFocus);
      window.addEventListener("keydown", keydownHandler);
    }
    return () => {
      console.log("focus out useKey", keyEvent, isFocus);
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [isFocus, ...deps]);
};

export default useKey;
