import React from "react";
import { setGenerator } from "./CellGenerator";
import MarkdownCell from "./Markdown";
import HeadingCell from "./Heading";
import ListCell from "./List";
import QuoteCell from "./Quote";
import TerminalCell from "./Terminal";
import CodeCell from "./Code";

setGenerator("p", (uuid) => <MarkdownCell cellUuid={uuid} />);
setGenerator("code", (uuid) => <CodeCell cellUuid={uuid} />);
setGenerator("h1", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("h2", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("h3", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("h4", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("h5", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("h6", (uuid) => <HeadingCell cellUuid={uuid} />);
setGenerator("ul", (uuid) => <ListCell cellUuid={uuid} />);
setGenerator("ol", (uuid) => <ListCell cellUuid={uuid} />);
setGenerator("blockquote", (uuid) => <QuoteCell cellUuid={uuid} />);
setGenerator("terminal", (uuid) => {
  return <TerminalCell cellUuid={uuid} />;
});

export {
  MarkdownCell,
  HeadingCell,
  ListCell,
  QuoteCell,
  TerminalCell,
  CodeCell,
};
