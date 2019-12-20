import React from "react";
import styled from "styled-components";

const GrammerWrapper = styled.div`
  code > p {
    margin: 0;
  }
`;
const Grammer = () => {
  return (
    <>
      <h3 className="sub-title">Markdown Grammer</h3>
      <GrammerWrapper>
        <h3 id="custom-terminal">Terminal(Custom)</h3>
        <pre>
          <code>
            <p>$$$</p>
          </code>
        </pre>
        <p>
          <img
            src="https://user-images.githubusercontent.com/26639508/71147099-0a6d4600-226b-11ea-93a3-86c1fdecc73f.gif"
            alt="terminal"
          />
        </p>
        <h3 id="headings">Headings</h3>
        <pre>
          <code>
            # Heading 1
            <br />
            ## Heading 2
            <br />
            ### Heading 3
            <br />
            #### Heading 4
            <br />
            ##### Heading 5
            <br />
            ###### Heading 6
            <br />
          </code>
        </pre>
        <p>
          <img
            src="https://user-images.githubusercontent.com/26639508/71147100-0a6d4600-226b-11ea-89b2-77fb66a861df.gif"
            alt="Headings"
          />
        </p>
        <h3 id="unordered-list">Unordered List</h3>
        <p>
          <code>
            - Unordered List
            <br />
            + Unordered List
            <br />
            * Unordered List
            <br />
          </code>
        </p>
        <p>
          <img
            src="https://user-images.githubusercontent.com/26639508/71147107-0f31fa00-226b-11ea-90e3-8cc31c09bade.gif"
            alt="ul"
          />
        </p>
        <p>
          <b>Tip</b>
          : (Shift+)Tab을 눌러 깊이를 조정할 수 있습니다.
          <br />
        </p>
        <h3 id="ordered-list">Ordered List</h3>
        <pre>
          <p>
            1. Ordered List
            <br />
            2. Ordered List
            <br />
            3. Ordered List
            <br />
          </p>
        </pre>
        <p>
          <img
            src="https://user-images.githubusercontent.com/26639508/71147105-0f31fa00-226b-11ea-897e-5cb2038113fb.gif"
            alt="ol"
          />
        </p>
        <p>
          <strong>Tip</strong>
          : (Shift+)Tab을 눌러 깊이를 조정할 수 있습니다.
          <br />
        </p>
        <h3 id="quoting-text">Quoting text</h3>
        <pre>
          <code>&gt; Quote</code>
        </pre>
        <p>
          <img
            src="https://user-images.githubusercontent.com/26639508/71147110-10632700-226b-11ea-834d-9c6d164fe878.gif"
            alt="Quote"
          />
        </p>
        <h3 id="code">Code</h3>
        <pre>
          <code>```</code>
        </pre>
        <p>
          <img
            src="https://user-images.githubusercontent.com/26639508/71147109-0fca9080-226b-11ea-9e5a-c5b1f8efca1e.gif"
            alt="Code"
          />
        </p>
        <p>
          <strong>Warning</strong>
          : 각 언어의 코드 하이라이팅을 지원하지 않습니다.
          <br />
        </p>
      </GrammerWrapper>
    </>
  );
};

export default Grammer;
