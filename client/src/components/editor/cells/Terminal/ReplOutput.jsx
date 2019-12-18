import React, { useState, useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import createDebug from "debug";
import { strip, parse } from "ansicolor";

import { socketManager } from "../../../../utils";
import { THEME } from "../../../../enums";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import {
  TerminalContext,
  TerminalDispatchContext,
} from "../../../../stores/TerminalStore";
import { CellDispatchContext } from "../../../../stores/CellStore";
import { cellActionCreator as cellAction } from "../../../../actions/CellAction";
import Loading from "../../../commons/Loading";

const debug = createDebug("boost:component:repl-output");

const ReplOutputWrapper = styled.div`
  height: 100%;

  padding: 15px;
  margin: 10px;

  background: ${THEME.VS_CODE.INNER_BOX};

  white-space: pre-wrap;
`;

const ColoredLineWrapper = styled.span`
  ${(props) => props.css}
`;

const LoadingWrapper = styled.div`
  display: flex;

  justify-content: center;

  width: 100%;
`;

const decoder = new TextDecoder();

let isUpdate = false;

const setIsUpdate = (bool) => {
  isUpdate = bool;
};

const ReplOutput = ({ cellUuid }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatchToCell = useContext(CellDispatchContext);
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const { terminalState } = useContext(TerminalContext);

  const { outputTexts } = terminalState;

  const socket = socketManager.get(cellUuid);

  useEffect(() => {
    if (socket) {
      debug("enroll socket's stdout event with", cellUuid, socket);

      socket.on("stdout", (chunk) => {
        setIsLoading(false);

        const decodedText = decoder.decode(chunk);
        debug("stdout text is", decodedText);

        dispatchToTerminal(terminalAction.updateOutputText(decodedText));

        setIsUpdate(true);
      });
    } else {
      debug("stdout socket disabled", cellUuid, socket);
    }
  }, [socket]);

  useEffect(() => {
    if (isUpdate) {
      setIsUpdate(false);

      dispatchToCell(cellAction.input(cellUuid, outputTexts));
    }
  }, [outputTexts]);

  const renderOutputs = () => {
    const outputs = outputTexts.reduce((repls, output, index) => {
      const key = `repl-output-${index}`;

      const parsedRepl = [...parse(output)];
      const coloredRepl = parsedRepl.map((line, innerIndex) => {
        const innerKey = `${key}-${innerIndex}`;
        const rawString = strip(line.text);

        return (
          <ColoredLineWrapper key={innerKey} css={line.css}>
            {rawString}
          </ColoredLineWrapper>
        );
      });

      repls.push(coloredRepl);
      return repls;
    }, []);

    return outputs;
  };

  const memoizedOutputs = useMemo(() => {
    return renderOutputs();
  }, [outputTexts]);

  return (
    <ReplOutputWrapper>
      {isLoading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : (
        memoizedOutputs
      )}
    </ReplOutputWrapper>
  );
};

ReplOutput.propTypes = {
  cellUuid: PropTypes.string.isRequired,
};

export default ReplOutput;
