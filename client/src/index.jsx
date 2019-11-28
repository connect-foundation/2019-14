import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import EditorPage from "./pages/EditorPage";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 19px;
    color: #e5e5e6;

    margin: 0;
    padding: 0;
    box-sizing: "border-box";
    ul {
      margin: 0;
    }
    ol {
      margin: 0;
    }
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <EditorPage />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
