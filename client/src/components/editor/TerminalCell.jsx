import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { EVENT_TYPE, THEME } from "../../enums";
import { utils, handlerManager } from "../../utils";
import { terminalActionCreator as action } from "../../actions/TerminalAction";
import {
  TerminalStore,
  TerminalContext,
  TerminalDispatchContext,
} from "../../stores/TerminalStore";

const { splice } = utils;

const ReplInputWrapper = styled.p.attrs(() => ({
  contentEditable: true,
}))`
  height: 10px;
  padding: 10px;
  background: ${THEME.DARK_IVORY.THEME_COLOR_5};
`;

const ReplOutputWrapper = styled.p`
  height: 10px;
  background: blue;
`;

const TerminalWrapper = styled.div`
  background: red;
  width: 100px;
  height: 100px;
`;

const ReplInputComponent = ({ text }) => {
  return <ReplInputWrapper>{text}</ReplInputWrapper>;
};

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
  text: PropTypes.string,
};

const addHandlers = (focusHandler) => {
  handlerManager.initHandler();
  handlerManager.setHandler(EVENT_TYPE.ENTER, (e) =>
    focusHandler[EVENT_TYPE.ENTER](e)
  );
  handlerManager.setWindowKeydownEvent();
};

const ReplCell = ({ inputText, outputText, isActive, isLoading }) => {
  return (
    <>
      <ReplInputComponent text={inputText} isActive={isActive} />
      <ReplOutputComponent text={outputText} isLoading={isLoading} />
    </>
  );
};

ReplCell.propTypes = {
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

  return <ReplInputWrapper ref={ref} onInput={inputHandler} />;
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
    addHandlers(focusHandlers);
    setMovable(<MovableReplCell inputHandler={inputHandler} />);
  }, []);

  const renderRepls = () => {
    const repls = inputTexts.map((_, index) => {
      const componentKey = `repl/${index}`;
      return (
        <ReplCell
          key={componentKey}
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
