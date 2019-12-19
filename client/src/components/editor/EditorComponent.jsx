import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";

import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import { uuidManager } from "../../utils";

const EditorComponentWrapper = styled.section`
  width: 99%;
  display: flex;
  flex-direction: column;
`;

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
