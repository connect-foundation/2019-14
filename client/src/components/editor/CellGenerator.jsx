import React from "react";
import CELL_TAG from "../../enums/CELL_TAG";
import HeadingCell from "./HeadingCell";
import TerminalCell from "./TerminalCell";
import QuoteCell from "./QuoteCell";
import CodeCell from "./CodeCell";
import ListCell from "./ListCell";

const headingGenerator = (uuid) => <HeadingCell cellUuid={uuid} />;

const cellGenerator = {
  [CELL_TAG.HEADING.H1]: headingGenerator,

  [CELL_TAG.HEADING.H2]: headingGenerator,

  [CELL_TAG.HEADING.H3]: headingGenerator,

  [CELL_TAG.HEADING.H4]: headingGenerator,

  [CELL_TAG.HEADING.H5]: headingGenerator,

  [CELL_TAG.HEADING.H6]: headingGenerator,

  [CELL_TAG.TERMINAL]: (uuid) => <TerminalCell cellUuid={uuid} />,

  [CELL_TAG.BLOCKQUOTE]: (uuid) => <QuoteCell cellUuid={uuid} />,

  ul: (uuid) => (
    <ul cellUuid={"ul" + uuid}>
      <ListCell cellUuid={uuid} />
    </ul>
  ),

  ol: (uuid, start) => (
    <ol cellUuid={"ol" + uuid} start={start}>
      <ListCell cellUuid={uuid} />
    </ol>
  ),

  code: (uuid) => <CodeCell cellUuid={uuid} />,

  hr: (uuid) => (
    <hr cellUuid={uuid} noshade="noshade" style={{ borderColor: "silver" }} />
  ),
};

export default cellGenerator;
