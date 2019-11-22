import React, { useState } from "react";
import styled from "styled-components";

import MARKDOWN_REGEXP from "../../utils/index";

/**
 * @todo keys 파싱 부분 정규표현식으로 변경
 */
const stateAttr = {
  [MARKDOWN_REGEXP.H1]: { type: "h1", placeholder: "Heading 1" },
  "##": { type: "h2", placeholder: "Heading 2" },
  "###": { type: "h3", placeholder: "Heading 3" },
  "####": { type: "h4", placeholder: "Heading 4" },
  "#####": { type: "h5", placeholder: "Heading 5" },
  "######": { type: "h6", placeholder: "Heading 6" },

  "-": { type: "ul", placeholder: "Unordered List" },
  "*": { type: "ul", placeholder: "Unordered List" },
  "+": { type: "ul", placeholder: "Unordered List" },

  "1.": { type: "ol", placeholder: "Ordered List" },

  ">": { type: "blockquote", placeholder: "Quote" }
};

/**
 * 마크다운 스타일 버전 2
 * 각 마크다운 문법에 적용되는 태그 사용 후 각 contentEditable 속성 사용
 *
 * @pros overflow시 자동으로 줄바꿈 적용, 각 default 속성을 찾아 디자인 작업 생략 가능
 * @cons div 혹은 p 등 태그 설정 기준 모호, placeholder 적용을 가상 클래스 및 가상 엘리먼트로 구현 필요(복잡성 증가)
 */
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

  border-left: ${props => (props.isQuote ? "0.25rem solid silver" : null)};
  padding-left: ${props => (props.isQuote ? "0.5rem" : null)};
`;

const EditorInput = () => {
  const [state, setState] = useState({
    value: "",
    type: "",
    placeholder: ""
  });

  const onInput = ev => {
    setState({ ...state, value: ev.target.textContent });
  };

  const onKeyPress = ev => {
    const { key } = ev;

    switch (key) {
      case " ":
        if (!state.type) setState({ ...state, ...stateAttr[state.value] });
        break;
      case "Enter":
        break;
    }
  };

  const isList = state.type === "ul" || state.type === "ol";
  const isQuote = state.type === "blockquote";

  let renderTarget = (
    <MarkdownWrapper
      as={state.type}
      isQuote={isQuote}
      placeholder={state.placeholder}
      contentEditable={true}
      onInput={onInput}
      onKeyPress={onKeyPress}
    />
  );

  if (isList) {
    renderTarget = (
      <MarkdownWrapper as={state.type}>
        <MarkdownWrapper
          as="li"
          placeholder={state.placeholder}
          contentEditable={true}
          onInput={onInput}
          onKeyPress={onKeyPress}
        />
      </MarkdownWrapper>
    );
  }

  return renderTarget;
};

export default EditorInput;
