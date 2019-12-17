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

const decoder = new TextDecoder();

const ReplOutput = ({ cellUuid }) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const dispatchToCell = useContext(CellDispatchContext);
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const { terminalState } = useContext(TerminalContext);

  const { outputTexts } = terminalState;

  const socket = socketManager.get(cellUuid);

  useEffect(() => {
    if (socket) {
      debug("enroll socket's stdout event with", cellUuid, socket);
      socket.on("stdout", (chunk) => {
        setIsUpdate(true);

        const decodedText = decoder.decode(chunk);
        debug("stdout text is", decodedText);

        return dispatchToTerminal(terminalAction.updateOutputText(decodedText));
      });
    } else {
      debug("stdout socket disabled", cellUuid, socket);
    }
  }, [socket]);

  useEffect(() => {
    if (isUpdate) {
      setIsUpdate(false);

      const savedOutput = outputTexts.join("\n");
      dispatchToCell(cellAction.input(cellUuid, savedOutput));
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

  const memoizedOutputs = useMemo(() => renderOutputs(), [outputTexts]);

  return <ReplOutputWrapper>{memoizedOutputs}</ReplOutputWrapper>;
};

ReplOutput.propTypes = {
  cellUuid: PropTypes.string.isRequired,
};

export default ReplOutput;
