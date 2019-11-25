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

  border-left: ${(props) => (props.isQuote ? "0.25rem solid silver" : null)};
  padding-left: ${(props) => (props.isQuote ? "0.5rem" : null)};
  background-color: ${(props) => (props.isCode ? "silver" : null)};}
`;

export default MarkdownWrapper;
