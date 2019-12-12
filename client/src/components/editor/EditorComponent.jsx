import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";

import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";
import { uuidManager } from "../../utils";
import { MarkdownCell } from "./cells";

const EditorComponentWrapper = styled.section`
  width: 99%;
  display: flex;
  flex-direction: column;
`;

const EditorComponent = () => {
  const { state } = useContext(CellContext);
  const cellDispatch = useContext(CellDispatchContext);
  const { cells } = state.cellManager;
  const inputRef = useRef(null);

  useEffect(() => {
    const renderTargetCallback = (cellUuid) => (
      <MarkdownCell cellUuid={cellUuid} />
    );
    if (state.cellManager.cells.length === 0) {
      cellDispatch(cellActionCreator.focusAttachRef(inputRef));
      cellDispatch(cellActionCreator.init(renderTargetCallback));
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
