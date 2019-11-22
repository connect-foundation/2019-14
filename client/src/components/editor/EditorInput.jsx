import React, { useContext } from "react";
import styled from "styled-components";
import { CellContext, CellDispatchContext } from "../../stores/CellStore";
import { cellActionCreator } from "../../actions/CellAction";

/**
 * @todo 리팩토링 예정
 * - 이 파일을 부모로 올리고 attr과 wrapper같은걸 분리 예정
 */

const stateAttr = {
  "#": { type: "h1", placeholder: "Heading 1" },
  "##": { type: "h2", placeholder: "Heading 2" },
  "###": { type: "h3", placeholder: "Heading 3" },
  "####": { type: "h4", placeholder: "Heading 4" },
  "#####": { type: "h5", placeholder: "Heading 5" },
  "######": { type: "h6", placeholder: "Heading 6" },

  "-": { type: "ul", placeholder: "Unordered List" },
  "*": { type: "ul", placeholder: "Unordered List" },
  "+": { type: "ul", placeholder: "Unordered List" },

  "1.": { type: "ol", placeholder: "Ordered List" },

  ">": { type: "blockquote", placeholder: "Quote" },
};

const MarkdownWrapper = styled.div`
  border: none;

  &:empty {
    &::before {
      content: attr(placeholder);
      color: silver;
    }
  }

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: text;
  }

  border-left: ${(props) => {
    if (props.isQuote) return "0.25rem solid silver";
    return null;
  }}
  padding-left: ${(props) => {
    if (props.isQuote) return "0.5rem";
    return null;
  }};
`;

const useCellState = () => {
  const { state } = useContext(CellContext);
  return state;
};

const useCellDispatch = () => {
  const cellDispatch = useContext(CellDispatchContext);
  return cellDispatch;
};

const EditorInput = ({ onKeyDown, onFocus, inputRef }) => {
  const cellDispatch = useCellDispatch();
  const cellState = useCellState();
  // const text = cellState.texts[cellIndex];

  // const [state, setState] = useState({
  //   value: text,
  //   type: "",
  //   placeholder: "",
  // });

  const onInput = (ev) => {
    const { textContent } = ev.target;

    cellDispatch(cellActionCreator.input(textContent));
  };

  const onKeyPress = (ev) => {
    // const { key } = ev;
    // if (key === " ") {
    //   if (!state.type)
    //     setState({
    //       ...state,
    //       ...stateAttr[text],
    //     });
    // }
  };

  // const isQuote = state.type === "blockquote";

  // if (state.type === "ul" || state.type === "ol") {
  //   return (
  //     <MarkdownWrapper as={state.type}>
  //       <MarkdownWrapper
  //         as="li"
  //         placeholder={state.placeholder}
  //         contentEditable
  //         onInput={onInput}
  //         onKeyPress={onKeyPress}
  //         onKeyDown={onKeyDown}
  //         onFocus={onFocus}
  //         ref={inputRef || null}
  //       />
  //     </MarkdownWrapper>
  //   );
  // }
  return (
    <MarkdownWrapper
      // as={state.type}
      // isQuote={isQuote}
      // placeholder={state.placeholder}
      contentEditable
      onInput={onInput}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      ref={inputRef || null}
    />
  );
};

export default EditorInput;
