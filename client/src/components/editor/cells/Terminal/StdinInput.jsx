import React, { useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { THEME } from "../../../../enums";
import EditorableReplInput from "./EditorableReplInput";

const StdinInputWrapper = styled.div`
  display: ${({ isHidden }) => (isHidden ? "none" : "flex")};
  height: 30px;

  padding: 15px;
  margin: 10px;

  background-color: ${THEME.VS_CODE.INNER_BOX};
`;

const StdinInput = React.forwardRef(
  ({ text, isEditorable, inputHandler }, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (!inputRef || !inputRef.current) {
          return;
        }
        inputRef.current.focus();
      },
    }));

    return (
      <StdinInputWrapper isHidden={!isEditorable}>
        <EditorableReplInput
          ref={inputRef}
          onInput={inputHandler}
          isEditorable={isEditorable}
          data-text="Standard Input"
        >
          {text}
        </EditorableReplInput>
      </StdinInputWrapper>
    );
  }
);

StdinInput.propTypes = {
  text: PropTypes.number.isRequired,
  inputHandler: PropTypes.string.isRequired,
  isEditorable: PropTypes.string,
};

StdinInput.defaultProps = {
  isEditorable: false,
};

export default StdinInput;
