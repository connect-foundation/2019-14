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
      // sshd
      const containerId = "9fe4650b9ae5";
      // ubuntu default
      // const containerId = "d5d08093284f";
      const command = inputText;
      const stdin = stdinText;

      // const response = null;
      // if (stdin.length > 0) {
      //  response = await request.execPending(containerId, command, stdin);
      // } else {
      //  response = await request.exec(containerId, command);
      // }

      // const { data, status } = response;

      const { status, data } = await request.execSsh(command, stdin);

      debug("shell command response with", status, data);

      if (status === 200) {
        const output = data.stdout;
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
      <ReplInput text={inputText} isActive={isActive} isEditorable={false} />
      <StdinInput text={stdinText} isActive={isActive} isEditorable={false} />
      <ReplOutput text={outputText} isLoading={isLoading} />
    </>
  );
};

ReplCell.propTypes = {
  cellIndex: PropTypes.number.isRequired,
  inputText: PropTypes.string,
  stdinText: PropTypes.string,
  outputText: PropTypes.string,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
};

ReplCell.defaultProps = {
  inputText: "default inputText",
  stdinText: "default stdinText",
  outputText: "default outputText",
  isActive: true,
  isLoading: false,
};

export default ReplCell;
