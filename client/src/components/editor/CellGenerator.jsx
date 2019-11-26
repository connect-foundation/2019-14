import React from "react";
import CELL_TAG from "../../enums/CELL_TAG";
import HeadingCell from "./HeadingCell";
import TerminalCell from "./TerminalCell";

const headingGenerator = (uuid) => <HeadingCell cellUuid={uuid} />;

const cellGenerator = {
  [CELL_TAG.HEADING.H1]: headingGenerator,

  [CELL_TAG.HEADING.H2]: headingGenerator,

  [CELL_TAG.HEADING.H3]: headingGenerator,

  [CELL_TAG.HEADING.H4]: headingGenerator,

  [CELL_TAG.HEADING.H5]: headingGenerator,

  [CELL_TAG.HEADING.H6]: headingGenerator,

  [CELL_TAG.TERMINAL]: (uuid) => <TerminalCell cellUuid={uuid} />,
};

export default cellGenerator;
