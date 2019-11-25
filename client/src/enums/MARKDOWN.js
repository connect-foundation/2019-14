import CELL_TAG from "./CELL_TAG";

const MARKDOWN = {
  RULE: {
    "#": CELL_TAG.HEADING.H1,
    "##": CELL_TAG.HEADING.H2,
    "###": CELL_TAG.HEADING.H3,
    "####": CELL_TAG.HEADING.H4,
    "#####": CELL_TAG.HEADING.H5,
    "######": CELL_TAG.HEADING.H6,

    "-": CELL_TAG.LIST.UL,
    "*": CELL_TAG.LIST.UL,
    "+": CELL_TAG.LIST.UL,

    "1.": CELL_TAG.LIST.OL,

    ">": CELL_TAG.BLOCKQUOTE,
  },

  PLACEHOLDER: {
    [CELL_TAG.HEADING.H1]: "Heading 1",
    [CELL_TAG.HEADING.H2]: "Heading 2",
    [CELL_TAG.HEADING.H3]: "Heading 3",
    [CELL_TAG.HEADING.H4]: "Heading 4",
    [CELL_TAG.HEADING.H5]: "Heading 5",
    [CELL_TAG.HEADING.H6]: "Heading 6",
    [CELL_TAG.LIST.UL]: "Unordered List",
    [CELL_TAG.LIST.OL]: "Ordered List",
    [CELL_TAG.BLOCKQUOTE]: "Quote",
  },
};

export default MARKDOWN;
