import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";

import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import { setGenerator } from "./cells/CellGenerator";
import { uuidManager } from "../../utils";
import {
  MarkdownCell,
  HeadingCell,
  ListCell,
  QuoteCell,
  TerminalCell,
  CodeCell,
} from "./cells";

const EditorComponentWrapper = styled.section`
  width: 99%;
  display: flex;
  flex-direction: column;
`;

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

const EditorComponent = () => {
  const { state } = useContext(CellContext);
  const cellDispatch = useContext(CellDispatchContext);
  const { cellManager } = state;
  const { cells } = cellManager;
  const inputRef = useRef(null);

  useEffect(() => {
    const shareDocumentContent = localStorage.getItem("share-document-content");
    const isShared = localStorage.getItem("isShared");
    if (shareDocumentContent && isShared) {
      cellDispatch(cellActionCreator.shareLoad());
      const document = JSON.parse(shareDocumentContent);
      cellManager.load(document);
      cellDispatch(cellActionCreator.shareLoadFinish());
      localStorage.removeItem("share-document-content");
      localStorage.removeItem("isShared");
    }
  }, []);

  useEffect(() => {
    if (state.cellManager.cells.length === 0) {
      cellDispatch(cellActionCreator.focusAttachRef(inputRef));
      cellDispatch(cellActionCreator.init());
    }
  }, []);

  return (
    <EditorComponentWrapper>
      {cells.map((cell, cellIndex) => {
        const uuidArray = uuidManager.getUuidArray();
        const key = uuidArray[cellIndex];
        return <React.Fragment key={key}>{cell}</React.Fragment>;
      })}
    </EditorComponentWrapper>
  );
};

export default EditorComponent;
