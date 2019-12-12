import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import createDebug from "debug";
import { parse } from "ansicolor";

import { socketManager } from "../../../../utils";
import { THEME } from "../../../../enums";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import {
  TerminalContext,
  TerminalDispatchContext,
} from "../../../../stores/TerminalStore";

const debug = createDebug("boost:component:repl-output");

const ReplOutputWrapper = styled.div`
  height: 100%;

  padding: 15px;
  margin: 10px;

  background: ${THEME.VS_CODE.INNER_BOX};

  white-space: pre-wrap;
`;

const ColoredOutputWrapper = styled.span`
  ${(props) => props.css}
`;

const decoder = new TextDecoder();

const ReplOutput = ({ cellUuid }) => {
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const { terminalState } = useContext(TerminalContext);
  const { outputTexts } = terminalState;

  const socket = socketManager.get(cellUuid);

  useEffect(() => {
    debug("prev enroll socket's stdout event with", cellUuid, socket);
    if (socket) {
      debug("enroll socket's stdout event with", cellUuid, socket);
      socket.on("stdout", (chunk) => {
        const decodedText = decoder.decode(chunk);
        debug("stdout text is", decodedText);
        dispatchToTerminal(terminalAction.updateOutputText(decodedText));
      });
    } else {
      debug("stdout socket disabled", cellUuid, socket);
    }
  }, [socket]);

  const outputs = outputTexts.map((output, index) => {
    const key = `repl-output-${index}`;
    const coloredOutputs = [...parse(output)];
    return coloredOutputs.map((line, i) => {
      const innerKey = `${key}-${i}`;
      return (
        <ColoredOutputWrapper key={innerKey} css={line.css}>
          {line.text}
        </ColoredOutputWrapper>
      );
    });
  });

  return <ReplOutputWrapper>{outputs}</ReplOutputWrapper>;
};

ReplOutput.propTypes = {
  cellUuid: PropTypes.string.isRequired,
};

export default ReplOutput;
