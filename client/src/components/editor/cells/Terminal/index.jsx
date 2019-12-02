import React, {
  useImperativeHandle,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import createDebug from "debug";

import { CELL_TAG, EVENT_TYPE, THEME } from "../../../../enums";
import { utils, handlerManager, request } from "../../../../utils";
import { terminalActionCreator as terminalAction } from "../../../../actions/TerminalAction";
import {
  TerminalContext,
  TerminalDispatchContext,
} from "../../../../stores/TerminalStore";
import { cellActionCreator as cellAction } from "../../../../actions/CellAction";
import { CellContext, CellDispatchContext } from "../../../../stores/CellStore";
import { setGenerator } from "../CellGenerator";

setGenerator("terminal", (uuid) => <TerminalCell cellUuid={uuid} />);

const debug = createDebug("boost:terminal-cell");

const { splice } = utils;

const ReplInputWrapper = styled.div`
  display: flex;

  height: 100%;

  padding: 15px;
  margin: 10px;

  background-color: ${THEME.VS_CODE.INNER_BOX};
`;

const ReplOutputWrapper = styled.div`
  height: 100%;

  padding: 15px;
  margin: 10px;

  background: ${THEME.VS_CODE.INNER_BOX};

  white-space: pre-wrap;
`;

const TerminalWrapper = styled.div`
  position: relative;

  display: flex;
  flex-flow: column;

  background: ${THEME.VS_CODE.SIDE_MENU};
  width: 100%;
`;

const ReplPrompt = styled.div`
  border-right: 5px solid #00fe3d;
  padding-right: 10px;
  width: 5rem;
`;

const EditorableReplInput = styled.div.attrs((props) => ({
  spellCheck: false,
  contentEditable: props.isEditorable || false,
  suppressContentEditableWarning: true,
}))`
  flex-grow: 99;
  margin-left: 20px;

  &:focus {
    outline: none;
    border: none;
  }
`;

const ReplInputComponent = React.forwardRef(
  ({ text, isEditorable, inputHandler }, ref) => {
    const inputRef = useRef();
    const prompt = "User $";

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (!inputRef || !inputRef.current) {
          return;
        }
        inputRef.current.focus();
      },
    }));

    return (
      <ReplInputWrapper>
        <ReplPrompt>{prompt}</ReplPrompt>
        <EditorableReplInput
          ref={inputRef}
          onInput={inputHandler}
          isEditorable={isEditorable}
        >
          {text}
        </EditorableReplInput>
      </ReplInputWrapper>
    );
  }
);

ReplInputWrapper.propTypes = {
  text: PropTypes.string,
};

ReplInputWrapper.defaultProps = {
  text: "",
};

const ReplOutputComponent = ({ text, isLoading }) => {
  return <ReplOutputWrapper>{text}</ReplOutputWrapper>;
};

ReplOutputWrapper.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

const addHandlersToManager = (cellIndex, focusHandlers) => {
  console.log("addhandler", cellIndex);
  handlerManager.attachKeydownEvent(
    window,
    focusHandlers,
    cellIndex,
    CELL_TAG.TERMINAL
  );
};

const ReplCell = ({
  cellIndex,
  inputText,
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
      <ReplInputComponent text={inputText} isActive={isActive} />
      <ReplOutputComponent text={outputText} isLoading={isLoading} />
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

const MovableReplCell = ({ initText, inputHandler }) => {
  const ref = useRef(null);

  useEffect(() => {
    const isComponentFocus = ref && ref.current;
    if (isComponentFocus) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <ReplInputComponent
      ref={ref}
      inputHandler={inputHandler}
      text={initText}
      isEditorable
    />
  );
};

MovableReplCell.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  initText: PropTypes.string.isRequired,
};

const ReplContainer = ({ cellIndex, isCellFocus }) => {
  const [movable, setMovable] = useState(null);
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const dispatchToCell = useContext(CellDispatchContext);
  const { terminalState } = useContext(TerminalContext);
  const {
    focusIndex,
    currentText,

    inputTexts,
    outputTexts,

    isActives,
    isLoadings,

    replCount,
  } = terminalState;

  const inputHandler = (e) => {
    const text = e.target.textContent;
    dispatchToTerminal(terminalAction.changeCurrentText(text));
  };

  const focusHandlers = {
    [EVENT_TYPE.ENTER]: (e) => {
      e.preventDefault();
      console.log("terminal enter");
      dispatchToTerminal(terminalAction.createNewRepl(replCount));
    },

    [EVENT_TYPE.ARROW_UP]: (e) => {
      e.preventDefault();
      const isFocusTop = focusIndex === 0;
      if (isFocusTop) {
        debug("Focus in top");
        dispatchToTerminal(terminalAction.focusOut());
        dispatchToCell(cellAction.focusPrev());
      } else {
        debug("Focus prev", focusIndex);
        dispatchToTerminal(terminalAction.focusPrev());
      }
    },

    [EVENT_TYPE.ARROW_DOWN]: (e) => {
      e.preventDefault();
      if (focusIndex === replCount) {
        debug("Focus Down Max");
      } else if (focusIndex >= 0 && focusIndex < replCount) {
        debug("Focus Down In Terminal");
        dispatchToTerminal(terminalAction.focusNext());
      }
    },
  };

  useEffect(() => {
    console.log("hello useEffect", focusIndex);
    if (isCellFocus) {
      addHandlersToManager(cellIndex, focusHandlers);
      setMovable(
        <MovableReplCell initText={currentText} inputHandler={inputHandler} />
      );
    }
  }, [focusIndex]);

  const renderRepls = () => {
    const repls = inputTexts.map((_, index) => {
      const componentKey = `repl/${index}`;
      return (
        <ReplCell
          key={componentKey}
          cellIndex={index}
          inputText={inputTexts[index]}
          outputText={outputTexts[index]}
          isActive={isActives[index]}
          isLoading={isLoadings[index]}
        />
      );
    });

    const isFirstRender = movable && replCount === 0;
    if (isFirstRender) {
      return movable;
    }
    if (!isCellFocus) {
      return repls;
    }
    return splice.addBefore(repls, focusIndex, movable);
  };

  return <>{renderRepls()}</>;
};

const TerminalCell = ({ cellUuid }) => {
  const { state } = useContext(CellContext);
  const dispatchToTerminal = useContext(TerminalDispatchContext);
  const { uuidManager, currentIndex } = state;
  const cellIndex = uuidManager.findIndex(cellUuid);

  const isCellFocus = cellIndex === currentIndex;
  if (isCellFocus) {
    console.log("hello focus in", currentIndex, cellIndex);
    dispatchToTerminal(terminalAction.focusIn());
  }

  return (
    <TerminalWrapper>
      <ReplContainer cellIndex={cellIndex} isCellFocus={isCellFocus} />
    </TerminalWrapper>
  );
};

TerminalCell.propTypes = {
  cellUuid: PropTypes.string.isRequired,
};

export default TerminalCell;
