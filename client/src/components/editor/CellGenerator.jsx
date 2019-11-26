import React from "react";
import CELL_TAG from "../../enums/CELL_TAG";
import HeaderCell from "./HeaderCell";
import TerminalCell from "./TerminalCell";
import QuoteCell from "./QuoteCell";
import CodeCell from "./CodeCell";

const headerGenerator = (uuid) => <HeaderCell cellUuid={uuid} />;

const cellGenerator = {
  [CELL_TAG.HEADING.H1]: headerGenerator,

  [CELL_TAG.HEADING.H2]: headerGenerator,

  [CELL_TAG.HEADING.H3]: headerGenerator,

  [CELL_TAG.HEADING.H4]: headerGenerator,

  [CELL_TAG.HEADING.H5]: headerGenerator,

  [CELL_TAG.HEADING.H6]: headerGenerator,

  [CELL_TAG.TERMINAL]: (uuid) => <TerminalCell cellUuid={uuid} />,

  [CELL_TAG.BLOCKQUOTE]: (uuid) => <QuoteCell cellUuid={uuid} />,

  code: (uuid) => <CodeCell cellUuid={uuid} />,

  hr: (uuid) => (
    <hr cellUuid={uuid} noshade="noshade" style={{ borderColor: "silver" }} />
  ),
};

export default cellGenerator;
