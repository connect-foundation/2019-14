/**
 * 마크다운 스타일 버전 1
 * input(textarea) 태그 사용 후 각 마크다운 문법에 맞는 스타일링
 *
 * @pros placeholder 속성, 사용자의 입력을 받는 부분으로 태그 의미 적합
 * @cons input 태그의 경우 overflow시 줄바꿈이 되지 않음
 *       textarea 태그의 경우 크롬에서 scroll이 아닌 visible로 값을 설정해도 스크롤로 적용
 *       scrollHeight와 함께 height를 적용하며 구현하는 방법 필요(복잡성 증가)
 */
const HEADING_ATTRIBUTE = {
  diplay: "block",
  fontWeight: "bold"
};

const MARKDOWN_ATTRIBUTE = {
  [MARKDOWN_TYPE.DEFAULT]: {
    placeholder: "",
    fontSize: "medium",
    marginTopBottom: "0"
  },

  [MARKDOWN_TYPE.H1]: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 1",
    fontSize: "2em",
    marginTopBottom: "0.67em"
  },
  [MARKDOWN_TYPE.H2]: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 2",
    fontSize: "1.5em",
    marginTopBottom: "0.83em"
  },
  [MARKDOWN_TYPE.H3]: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 3",
    fontSize: "1.17em",
    marginTopBottom: "1em"
  },
  [MARKDOWN_TYPE.H4]: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 4",
    fontSize: "1em",
    marginTopBottom: "1.33em"
  },
  [MARKDOWN_TYPE.H5]: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 5",
    fontSize: ".83em",
    marginTopBottom: "1.67em"
  },
  [MARKDOWN_TYPE.H6]: {
    ...HEADING_ATTRIBUTE,
    placeholder: "Heading 6",
    fontSize: ".67em",
    marginTopBottom: "2.33em"
  }
};

const Input = styled.input`
  display: block;
  font-weight: bold;
  width: 100%;
  border: transparent;
  outline: transparent;
  display: ${props => MARKDOWN_ATTRIBUTE[props.type].display};
  font-weight: ${props => MARKDOWN_ATTRIBUTE[props.type].fontWeight};
  font-size: ${props => MARKDOWN_ATTRIBUTE[props.type].fontSize};
  margin-top: ${props => MARKDOWN_ATTRIBUTE[props.type].marginTopBottom};
  margin-bottom: ${props => MARKDOWN_ATTRIBUTE[props.type].marginTopBottom}};
`;
