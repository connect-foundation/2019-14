import styled from "styled-components";

const stateAttr = {
  "#": { type: "h1", placeholder: "Heading 1" },
  "##": { type: "h2", placeholder: "Heading 2" },
  "###": { type: "h3", placeholder: "Heading 3" },
  "####": { type: "h4", placeholder: "Heading 4" },
  "#####": { type: "h5", placeholder: "Heading 5" },
  "######": { type: "h6", placeholder: "Heading 6" },

  "-": { type: "ul", placeholder: "Unordered List" },
  "*": { type: "ul", placeholder: "Unordered List" },
  "+": { type: "ul", placeholder: "Unordered List" },

  "1.": { type: "ol", placeholder: "Ordered List" },

  ">": { type: "blockquote", placeholder: "Quote" },
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

export { stateAttr, MarkdownWrapper };
