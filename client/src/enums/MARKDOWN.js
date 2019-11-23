import CELL_TYPE from "./CELL_TYPE";

const MARKDOWN = {
  RULE: {
    "#": CELL_TYPE.HEADING.H1,
    "##": CELL_TYPE.HEADING.H2,
    "###": CELL_TYPE.HEADING.H3,
    "####": CELL_TYPE.HEADING.H4,
    "#####": CELL_TYPE.HEADING.H5,
    "######": CELL_TYPE.HEADING.H6,

    "-": CELL_TYPE.LIST.UL,
    "*": CELL_TYPE.LIST.UL,
    "+": CELL_TYPE.LIST.UL,

    "1.": CELL_TYPE.LIST.OL,

    ">": CELL_TYPE.BLOCKQUOTE,
  },

  PLACEHOLDER: {
    [CELL_TYPE.HEADING.H1]: "Heading 1",
    [CELL_TYPE.HEADING.H2]: "Heading 2",
    [CELL_TYPE.HEADING.H3]: "Heading 3",
    [CELL_TYPE.HEADING.H4]: "Heading 4",
    [CELL_TYPE.HEADING.H5]: "Heading 5",
    [CELL_TYPE.HEADING.H6]: "Heading 6",
    [CELL_TYPE.LIST.UL]: "Unordered List",
    [CELL_TYPE.LIST.OL]: "Ordered List",
    [CELL_TYPE.BLOCKQUOTE]: "Quote",
  },
};

export default MARKDOWN;
