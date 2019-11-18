import React, { useState, useEffect } from "react";

const EditorInput = () => {
  const [state, setState] = useState({ value: "" });

  const onChange = (ev) => setState({ ...state, value: ev.target.value });

  return <input value={state.value} onChange={onChange} />;
};

export default EditorInput;
