import styled from "styled-components";

const EditorableReplInput = styled.textarea`
  flex-grow: 99;
  margin-left: 20px;

  &:focus {
    outline: none;
    border: none;
  }

  :empty:not(:focus):before {
    content: attr(data-text);
  }
`;

export default EditorableReplInput;
