import React, { useState, useEffect } from "react";

const EditorInput = () => {
  const [state, setState] = useState({ value: "", type: "" });

  const TYPE = {
    DEFAULT: "",
    H1: "h1",
  };

  const onChange = (ev) => setState({ ...state, value: ev.target.value });
  const onKeyPress = (ev) => {
    if (ev.key === " ") {
      if (state.value === "#") setState({ ...state, type: TYPE.H1 });
    }
  };

  useEffect(() => {
    if (state.type) setState({ ...state, value: "" });
  }, [state.type]);

  return (
    <input
      type={state.type}
      value={state.value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

export default EditorInput;
