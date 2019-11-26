import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import EditorPage from "./pages/EditorPage";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
        margin: 0;
        padding: 0;
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
