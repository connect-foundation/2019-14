import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MARKDOWN_TYPE from "./MARKDOWN_TYPE";

const MARKDOWN_ATTRIBUTE = {
  [MARKDOWN_TYPE.DEFAULT]: {
    placeholder: "",
    fontSize: "medium",
    marginTopBottom: "0",
  },
  [MARKDOWN_TYPE.H1]: {
    placeholder: "Heading 1",
    fontSize: "2em",
    marginTopBottom: "0.67em",
  },
  [MARKDOWN_TYPE.H2]: {
    placeholder: "Heading 2",
    fontSize: "1.5em",
    marginTopBottom: "0.83em",
  },
  [MARKDOWN_TYPE.H3]: {
    placeholder: "Heading 3",
    fontSize: "1.17em",
    marginTopBottom: "1em",
  },
  [MARKDOWN_TYPE.H4]: {
    placeholder: "Heading 4",
    fontSize: "1em",
    marginTopBottom: "1.33em",
  },
  [MARKDOWN_TYPE.H5]: {
    placeholder: "Heading 5",
    fontSize: ".83em",
    marginTopBottom: "1.67em",
  },
  [MARKDOWN_TYPE.H6]: {
    placeholder: "Heading 6",
    fontSize: ".67em",
    marginTopBottom: "2.33em",
  },
};

const Input = styled.input`
  display: block;
  font-weight: bold;
  width: 100%;
  border: transparent;
  outline: transparent;

  font-size: ${(props) => MARKDOWN_ATTRIBUTE[props.type].fontSize};
  margin-top: ${(props) => MARKDOWN_ATTRIBUTE[props.type].marginTopBottom};
  margin-bottom: ${(props) => MARKDOWN_ATTRIBUTE[props.type].marginTopBottom}};
`;

const EditorInput = () => {
  const [state, setState] = useState({ value: "", type: "", placeholder: "" });

  const STATE = {
    "#": { ...state, type: MARKDOWN_TYPE.H1 },
    "##": { ...state, type: MARKDOWN_TYPE.H2 },
    "###": { ...state, type: MARKDOWN_TYPE.H3 },
    "####": { ...state, type: MARKDOWN_TYPE.H4 },
    "#####": { ...state, type: MARKDOWN_TYPE.H5 },
    "######": { ...state, type: MARKDOWN_TYPE.H6 },
  };

  const onChange = (ev) => setState({ ...state, value: ev.target.value });
  const onKeyPress = (ev) => {
    if (!state.type && ev.key === " ") {
      setState(STATE[state.value]);
    }
  };

  useEffect(() => {
    if (state.type)
      setState({
        ...state,
        value: "",
        placeholder: MARKDOWN_ATTRIBUTE[state.type].placeholder,
      });
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
