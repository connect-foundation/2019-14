import styled from "styled-components";

const MarkdownWrapper = styled.p`
  border: none;

  &:empty {
    &::before {
      content: attr(placeholder);
      color: silver;
    }
  }

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: text;
  }

  border-left: ${(props) => {
    if (props.isQuote) return "0.25rem solid silver";
    return null;
  }}
  padding-left: ${(props) => {
    if (props.isQuote) return "0.5rem";
    return null;
  }};
`;

export default MarkdownWrapper;
