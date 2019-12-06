import React, { useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { THEME } from "../../../../enums";

const ReplInputWrapper = styled.div`
  display: flex;

  height: 100%;

  padding: 15px;
  margin: 10px;

  background-color: ${THEME.VS_CODE.INNER_BOX};
`;

const ReplPrompt = styled.div`
  border-right: 5px solid #00fe3d;
  padding-right: 10px;
  width: 5rem;
`;

const EditorableReplInput = styled.div.attrs((props) => ({
  spellCheck: false,
  contentEditable: props.isEditorable || false,
  suppressContentEditableWarning: true,
}))`
  flex-grow: 99;
  margin-left: 20px;

  &:focus {
    outline: none;
    border: none;
  }
`;

const ReplInput = React.forwardRef(
  ({ text, isEditorable, inputHandler }, ref) => {
    const inputRef = useRef();
    const prompt = "User $";

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (!inputRef || !inputRef.current) {
          return;
        }
        inputRef.current.focus();
      },
    }));

    return (
      <ReplInputWrapper>
        <ReplPrompt>{prompt}</ReplPrompt>
        <EditorableReplInput
          ref={inputRef}
          onInput={inputHandler}
          isEditorable={isEditorable}
        >
          {text}
        </EditorableReplInput>
      </ReplInputWrapper>
    );
  }
);

ReplInputWrapper.propTypes = {
  isEditorable: PropTypes.bool.isRequired,
  text: PropTypes.string,
  inputHandler: PropTypes.func,
};

ReplInputWrapper.defaultProps = {
  text: "",
  inputHandler: () => {},
};

export default ReplInput;
