import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import { TerminalContext } from "../../../../stores/TerminalStore";

const EditorTextarea = styled.textarea`
  width: 100%;

  margin-left: 20px;
  padding: 0;

  line-height: ${(props) => props.lineHeight}px;

  box-sizing: border-box;
  border: none;
  outline: none;
  box-shadow: none;

  overflow-y: hidden;
  resize: none;

  background-color: transparent;
  color: inherit;
  font-size: inherit;
`;

const initState = {
  value: "",
  rows: 1,
  minRows: 1,
  lineHeight: 24,
};

const EditableReplInput = React.forwardRef(
  ({ changeHandler, clickHandler }, ref) => {
    const [state, setState] = useState({ ...initState });
    const { terminalState } = useContext(TerminalContext);
    const { currentText } = terminalState;

    const changeHandlerWrapper = (e) => {
      e.persist();
      changeHandler(e);
      const { lineHeight } = state;
      const { scrollHeight } = e.target;
      const currentRows = Math.round(scrollHeight / lineHeight);
      setState((prevState) => {
        return {
          ...prevState,
          rows: currentRows,
          value: e.target.value,
        };
      });
    };

    return (
      <EditorTextarea
        ref={ref}
        onChange={changeHandlerWrapper}
        onClick={clickHandler}
        spellCheck={false}
        rows={state.rows}
        line-height={state.lineHeight}
        value={currentText}
      />
    );
  }
);

EditableReplInput.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default EditableReplInput;
