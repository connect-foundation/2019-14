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
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    border-left: ${({ isQuote }) => isQuote && "0.25rem solid silver"};
  }

  margin: 0;

  padding: 0.2em;

  background: ${({ intoShiftBlock }) =>
    intoShiftBlock && "rgba(128, 0, 255, 0.2)"};

  border: ${({ isCurrentCell }) =>
    isCurrentCell && "1.5px solid rgba(255, 255, 255, 0.2)"};
  border-left: ${({ isQuote }) => isQuote && "0.25rem solid silver"};
  padding-left: ${({ isQuote }) => isQuote && "0.5rem"};
  margin-left: ${({ isList, depth }) => isList && `${depth * 4}rem`};
`;

export default MarkdownWrapper;
