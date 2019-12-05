import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import createDebug from "debug";

import { request } from "../../../../utils";
import { TerminalDispatchContext } from "../../../../stores/TerminalStore";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import ReplInput from "./ReplInput";
import StdinInput from "./StdinInput";
import ReplOutput from "./ReplOutput";

const debug = createDebug("boost:component:repl-cell");

const ReplCell = ({
  cellIndex,
  inputText,
  stdinText,
  outputText,
  isActive,
  isLoading,
}) => {
  const dispatchToTerminal = useContext(TerminalDispatchContext);

  useEffect(() => {
    const updateOutputComponent = async () => {
      const containerName = "zen_liskov";
      const command = inputText;

      const { data, status } = await request.exec(containerName, command);

      debug("shell command response with", status, data);

      if (status === 200) {
        const { output } = data;
        dispatchToTerminal(terminalAction.updateOutputText(cellIndex, output));
      }
    };

    const isStartFetching = !isActive && isLoading;
    if (isStartFetching) {
      updateOutputComponent();
    }
  }, [isLoading]);

  return (
    <>
      <ReplInput text={inputText} isActive={isActive} />
      <StdinInput text={stdinText} isActive={isActive} isEditorable={false} />
      <ReplOutput text={outputText} isLoading={isLoading} />
    </>
  );
};

ReplCell.propTypes = {
  cellIndex: PropTypes.number.isRequired,
  inputText: PropTypes.string,
  outputText: PropTypes.string,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
};

ReplCell.defaultProps = {
  inputText: "default inputText",
  outputText: "default outputText",
  isActive: true,
  isLoading: false,
};

export default ReplCell;
