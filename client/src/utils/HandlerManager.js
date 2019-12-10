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

const checkOsDependentCodeEscape = (e) => {
  const { altKey, ctrlKey, metaKey } = e;
  const agentInfo = navigator.userAgent.toLowerCase();
  const isMac = agentInfo.includes("mac");
  if (isMac) {
    return altKey && metaKey;
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

  [EVENT_TYPE.CODE_ESCAPE_UP]: (handler) => {
    return (e) => {
      const { key, shiftKey } = e;
      const isArrowUp = key === KEY_TYPE.ARROW_UP;
      const isShiftUp = shiftKey;
      const isCodeEscape = checkOsDependentCodeEscape(e);
      if (!isShiftUp && isCodeEscape && isArrowUp) {
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

  [EVENT_TYPE.CODE_ESCAPE_DOWN]: (handler) => {
    return (e) => {
      const { key, shiftKey } = e;
      const isArrowDown = key === KEY_TYPE.ARROW_DOWN;
      const isShiftUp = shiftKey;
      const isCodeEscape = checkOsDependentCodeEscape(e);
      if (!isShiftUp && isCodeEscape && isArrowDown) {
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

const defaultHandlers = {
  [EVENT_TYPE.SHIFT_ENTER]: null,
  [EVENT_TYPE.ARROW_UP]: null,
  [EVENT_TYPE.ARROW_DOWN]: null,
  [EVENT_TYPE.SHIFT_ARROW_UP]: null,
  [EVENT_TYPE.SHIFT_ARROW_DOWN]: null,
  [EVENT_TYPE.CTRL_A]: null,
  [EVENT_TYPE.CTRL_X]: null,
  [EVENT_TYPE.CTRL_C]: null,
  [EVENT_TYPE.CTRL_V]: null,
};

const defaultChecksum = {
  [EVENT_TYPE.SHIFT_ENTER]: false,
  [EVENT_TYPE.ARROW_UP]: false,
  [EVENT_TYPE.ARROW_DOWN]: false,
  [EVENT_TYPE.SHIFT_ARROW_UP]: false,
  [EVENT_TYPE.SHIFT_ARROW_DOWN]: false,
  [EVENT_TYPE.CTRL_A]: false,
  [EVENT_TYPE.CTRL_X]: false,
  [EVENT_TYPE.CTRL_C]: false,
  [EVENT_TYPE.CTRL_V]: false,
};

const defaultChecksumAllTrue = {
  [EVENT_TYPE.SHIFT_ENTER]: true,
  [EVENT_TYPE.ARROW_UP]: true,
  [EVENT_TYPE.ARROW_DOWN]: true,
  // [EVENT_TYPE.SHIFT_ARROW_UP]: true,
  // [EVENT_TYPE.SHIFT_ARROW_DOWN]: true,
  [EVENT_TYPE.CTRL_A]: true,
  [EVENT_TYPE.CTRL_X]: true,
  [EVENT_TYPE.CTRL_C]: true,
  // [EVENT_TYPE.CTRL_V]: true,
};

const attachDefaultHandlers = (handlers) => {
  Object.keys(handlers).forEach((key) => {
    if (!defaultHandlers[key])
      defaultHandlers[key] = makeKeyHandler[key](handlers[key]);
  });
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

const useKeys = (handlers, isFocus, deps = [], checksum = defaultChecksum) => {
  const keydownHandlers = {};
  Object.entries(checksum).forEach(([type, check]) => {
    if (check)
      keydownHandlers[type] = makeKeyHandler[type](defaultHandlers[type]);
  });
  Object.entries(handlers).forEach(([type, handler]) => {
    keydownHandlers[type] = makeKeyHandler[type](handler);
  });

  useEffect(() => {
    if (isFocus) {
      Object.values(keydownHandlers).forEach((handler) => {
        window.addEventListener("keydown", handler);
      });
    }
    return () => {
      Object.values(keydownHandlers).forEach((handler) => {
        window.removeEventListener("keydown", handler);
      });
    };
  }, [isFocus, ...deps]);
};

export { useKey, useKeys, attachDefaultHandlers, defaultChecksumAllTrue };
