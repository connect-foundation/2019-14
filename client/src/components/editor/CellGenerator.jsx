import React from "react";
import CELL_TAG from "../../enums/CELL_TAG";
import HeadingCell from "./HeadingCell";
import TerminalCell from "./TerminalCell";
import QuoteCell from "./QuoteCell";
import CodeCell from "./CodeCell";
import ListCell from "./ListCell";

const headingGenerator = (uuid) => <HeadingCell cellUuid={uuid} />;
const terminalGenerator = (uuid) => <TerminalCell cellUuid={uuid} />;
const quoteGenerator = (uuid) => <QuoteCell cellUuid={uuid} />;
const codeGenerator = (uuid) => <CodeCell cellUuid={uuid} />;

const unorderedListGenerator = (uuid) => (
  <ul cellUuid={"ul" + uuid}>
    <ListCell cellUuid={uuid} />
  </ul>
);
const orderedListGenerator = (uuid, start) => (
  <ol cellUuid={"ol" + uuid} start={start}>
    <ListCell cellUuid={uuid} />
  </ol>
);

const hrGenerator = (uuid) => (
  <hr cellUuid={uuid} noshade="noshade" style={{ borderColor: "silver" }} />
);

const cellGenerator = {
  h1: headingGenerator,
  h2: headingGenerator,
  h3: headingGenerator,
  h4: headingGenerator,
  h5: headingGenerator,
  h6: headingGenerator,

  terminal: terminalGenerator,

  blockquote: quoteGenerator,

  code: codeGenerator,

  ul: unorderedListGenerator,

  ol: orderedListGenerator,

  hr: hrGenerator,
};

export default cellGenerator;
