import { useEffect } from "react";
import { EVENT_TYPE } from "../enums";

const KEY_TYPE = {
  ENTER: "Enter",
  TAB: "Tab",
  BACKSPACE: "Backspace",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
};

const checkOsDependentCtrl = (e) => {
  const { ctrlKey, metaKey } = e;
  const agentInfo = navigator.userAgent.toLowerCase();
  const isMac = agentInfo.includes("mac");
  if (isMac) {
    return metaKey;
  }

  const isWindowOrLinux =
    agentInfo.includes("linux") || agentInfo.includes("window");
  if (isWindowOrLinux) {
    return ctrlKey;
  }

  // any other minor os
  return ctrlKey;
};

const makeKeyHandler = {
  [EVENT_TYPE.ENTER]: (handler) => {
    return (e) => {
      const { key, shiftKey } = e;
      const isEnter = key === KEY_TYPE.ENTER;
      const isShift = shiftKey;
      if (isEnter && !isShift) {
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
        handler(e);
      }
    };
  },

  [EVENT_TYPE.TAB]: (handler) => {
    return (e) => {
      const { key, shiftKey } = e;
      const isTab = key === KEY_TYPE.TAB;
      const isShift = shiftKey;
      if (isTab && !isShift) {
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
      const { key, shiftKey } = e;
      const isArrowUp = key === KEY_TYPE.ARROW_UP;
      const isShiftUp = shiftKey;
      if (!isShiftUp && isArrowUp) {
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
      const { key, shiftKey } = e;
      const isArrowDown = key === KEY_TYPE.ARROW_DOWN;
      const isShiftUp = shiftKey;
      if (!isShiftUp && isArrowDown) {
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

  [EVENT_TYPE.CTRL_A]: (handler) => {
    return (e) => {
      const isCtrl = checkOsDependentCtrl(e);
      const isCharA = e.key === "a";
      if (isCtrl && isCharA) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.CTRL_X]: (handler) => {
    return (e) => {
      const isCtrl = checkOsDependentCtrl(e);
      const isCharX = e.key === "x";
      if (isCtrl && isCharX) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.CTRL_C]: (handler) => {
    return (e) => {
      const isCtrl = checkOsDependentCtrl(e);
      const isCharC = e.key === "c";
      if (isCtrl && isCharC) {
        e.preventDefault();
        handler(e);
      }
    };
  },

  [EVENT_TYPE.CTRL_V]: (handler) => {
    return (e) => {
      const isCtrl = checkOsDependentCtrl(e);
      const isCharV = e.key === "v";
      if (isCtrl && isCharV) {
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
      window.addEventListener("keydown", keydownHandler);
    }
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [isFocus, ...deps]);
};

const useKeys = (handlers, isFocus, deps = []) => {
  const keydownHandlers = Object.entries(handlers).map(([type, handler]) => {
    return makeKeyHandler[type](handler);
  });

  useEffect(() => {
    if (isFocus) {
      keydownHandlers.forEach((handler) => {
        window.addEventListener("keydown", handler);
      });
    }
    return () => {
      keydownHandlers.forEach((handler) => {
        window.removeEventListener("keydown", handler);
      });
    };
  }, [isFocus, ...deps]);
};

export { useKey, useKeys };
