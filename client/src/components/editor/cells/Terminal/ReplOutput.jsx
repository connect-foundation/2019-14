import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import createDebug from "debug";
import { parse } from "ansicolor";

import { THEME } from "../../../../enums";
import { io } from "../../../../reducers/TerminalState";
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

const ReplOutput = () => {
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const { terminalState } = useContext(TerminalContext);
  const { outputTexts } = terminalState;

  useEffect(() => {
    if (io) {
      debug("enroll io's stdout event", io);
      io.on("stdout", (chunk) => {
        const decoder = new TextDecoder();
        const text = decoder.decode(chunk);
        debug("stdout text is", text);
        dispatchToTerminal(terminalAction.updateOutputText(text));
      });
    } else {
      debug("stdout io disabled");
    }
  }, []);

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

export default ReplOutput;
