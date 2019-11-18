import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Input = styled.input`
  display: block;
  font-weight: bold;
  word-wrap: break-word;
  width: 100%;
  border: transparent;
  outline: transparent;

  font-size: ${(props) => (props.type === "h1" ? "2em" : "medium")};
  margin-top: ${(props) => (props.type === "h1" ? "0.67em" : "0")};
  margin-bottom: ${(props) => (props.type === "h1" ? "0.67em" : "0")};
`;

const EditorInput = () => {
  const [state, setState] = useState({ value: "", type: "", placeholder: "" });

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
    if (state.type) setState({ ...state, value: "", placeholder: "Heading 1" });
  }, [state.type]);

  return (
    <Input
      type={state.type}
      value={state.value}
      placeholder={state.placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

export default EditorInput;
