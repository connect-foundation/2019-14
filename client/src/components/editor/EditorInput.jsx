import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HEADING_ATTRIBUTE = {
  diplay: "block",
  fontWeight: "bold",
};

const MARKDOWN_ATTRIBUTE = {
  "": {
    placeholder: "",
    fontSize: "medium",
    marginTopBottom: "0",
  },

  H1: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 1",
    fontSize: "2em",
    marginTopBottom: "0.67em",
  },
  H2: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 2",
    fontSize: "1.5em",
    marginTopBottom: "0.83em",
  },
  H3: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 3",
    fontSize: "1.17em",
    marginTopBottom: "1em",
  },
  H4: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 4",
    fontSize: "1em",
    marginTopBottom: "1.33em",
  },
  H5: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 5",
    fontSize: ".83em",
    marginTopBottom: "1.67em",
  },
  H6: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 6",
    fontSize: ".67em",
    marginTopBottom: "2.33em",
  },
};

const Input = styled.input`
  width: 100%;
  border: transparent;
  outline: transparent;

  display: ${(props) => MARKDOWN_ATTRIBUTE[props.type].display};
  font-weight: ${(props) => MARKDOWN_ATTRIBUTE[props.type].fontWeight};
  font-size: ${(props) => MARKDOWN_ATTRIBUTE[props.type].fontSize};
  margin-top: ${(props) => MARKDOWN_ATTRIBUTE[props.type].marginTopBottom};
  margin-bottom: ${(props) => MARKDOWN_ATTRIBUTE[props.type].marginTopBottom}};
`;

const EditorInput = () => {
  const [state, setState] = useState({
    value: "",
    type: "",
    placeholder: "",
  });

  const STATE = {
    "#": { ...state, type: "H1" },
    "##": { ...state, type: "H2" },
    "###": { ...state, type: "H3" },
    "####": { ...state, type: "H4" },
    "#####": { ...state, type: "H5" },
    "######": { ...state, type: "H6" },
  };

  const onChange = (ev) => setState({ ...state, value: ev.target.value });
  const onKeyPress = (ev) => {
    const { key } = ev;

    if (!state.type && key === " ") {
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
