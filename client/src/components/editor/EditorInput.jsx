import styled from "styled-components";

const stateAttr = {
  "#": { type: "h1" },
  "##": { type: "h2" },
  "###": { type: "h3" },
  "####": { type: "h4" },
  "#####": { type: "h5" },
  "######": { type: "h6" },

  "-": { type: "ul" },
  "*": { type: "ul" },
  "+": { type: "ul" },

  "1.": { type: "ol" },

  ">": { type: "blockquote" },
};

const placeholder = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  ul: "Unordered List",
  ol: "Ordered List",
  blockquote: "Quote",
};

const MarkdownWrapper = styled.div`
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

export { stateAttr, placeholder, MarkdownWrapper };
