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

  border-left: ${({ isQuote }) => isQuote && "0.25rem solid silver"};
  padding-left: ${({ isQuote }) => isQuote && "0.5rem"};
`;

export default MarkdownWrapper;
