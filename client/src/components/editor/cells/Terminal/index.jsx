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
import { EVENT_TYPE, THEME } from "../../../../enums";
import { utils, handlerManager, request } from "../../../../utils";
import { terminalActionCreator as action } from "../../../../actions/TerminalAction";
import {
  TerminalStore,
  TerminalContext,
  TerminalDispatchContext,
} from "../../../../stores/TerminalStore";

const debug = createDebug("boost:terminal-cell");

const { splice } = utils;

const ReplInputWrapper = styled.div`
  display: flex;

  height: 100%;

  padding: 15px;
  margin: 10px;

  background-color: ${THEME.DARK_TEMP.THEME_COLOR_4};
`;

const ReplOutputWrapper = styled.div`
  height: 100%;

  padding: 15px;
  margin: 10px;

  background: ${THEME.DARK_TEMP.THEME_COLOR_4};

  white-space: pre-wrap;
`;

const TerminalWrapper = styled.div`
  position: relative;

  display: flex;
  flex-flow: column;

  background: ${THEME.DARK.THEME_COLOR_2};
  width: 100%;
`;

const ReplPrompt = styled.div`
  border-right: 5px solid #e4aaaa;
  padding-right: 10px;
`;

const ReplInput = styled.div.attrs((props) => ({
  contentEditable: props.isEditorable || false,
}))`
  width: 100%;
  margin-left: 20px;
`;

const ReplInputComponent = React.forwardRef(
  ({ text, isEditorable, inputHandler }, ref) => {
    const inputRef = useRef();
    const prompt = "User";

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
        <ReplInput
          ref={inputRef}
          onInput={inputHandler}
          isEditorable={isEditorable}
        >
          {text}
        </ReplInput>
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

const addHandlersToManager = (focusHandlers) => {
  handlerManager.initHandler();
  handlerManager.setHandler(EVENT_TYPE.ENTER, (e) =>
    focusHandlers[EVENT_TYPE.ENTER](e)
  );
  handlerManager.setWindowKeydownEvent();
};

const ReplCell = ({
  cellIndex,
  inputText,
  outputText,
  isActive,
  isLoading,
}) => {
  const dispatch = useContext(TerminalDispatchContext);

  useEffect(() => {
    const updateOutputComponent = async () => {
      const containerName = "zen_liskov";
      const command = inputText;

      const { data, status } = await request.exec(containerName, command);

      debug("shell command response with", status, data);

      if (status === 200) {
        const { output } = data;
        dispatch(action.updateOutputText(cellIndex, output));
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

const MovableReplCell = ({ inputHandler }) => {
  const ref = useRef(null);

  useEffect(() => {
    const isComponentFocus = ref && ref.current;
    if (isComponentFocus) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <ReplInputComponent ref={ref} inputHandler={inputHandler} isEditorable />
  );
};

MovableReplCell.propTypes = {
  inputHandler: PropTypes.func.isRequired,
};

const ReplContainer = () => {
  const [movable, setMovable] = useState(null);
  const dispatchAsync = useContext(TerminalDispatchContext);
  const { terminalState } = useContext(TerminalContext);
  const {
    focusIndex,
    replCount,
    inputTexts,
    outputTexts,
    isActives,
    isLoadings,
  } = terminalState;

  const focusHandlers = {
    [EVENT_TYPE.ENTER]: (e) => {
      e.preventDefault();
      dispatchAsync(action.createNewRepl());
    },
  };

  const inputHandler = (e) => {
    const text = e.target.textContent;
    dispatchAsync(action.changeCurrentText(text));
  };

  useEffect(() => {
    addHandlersToManager(focusHandlers);
    setMovable(<MovableReplCell inputHandler={inputHandler} />);
  }, []);

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
    return splice.addBefore(repls, focusIndex, movable);
  };

  return <>{renderRepls()}</>;
};

const TerminalCell = ({ cellUuid }) => {
  return (
    <TerminalStore>
      <TerminalWrapper>
        <ReplContainer />
      </TerminalWrapper>
    </TerminalStore>
  );
};

TerminalCell.propTypes = {
  cellUuid: PropTypes.string.isRequired,
};

export default TerminalCell;
