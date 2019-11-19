import React from "react";
import ReactDOM from "react-dom";
import EditorPage from "./pages/EditorPage";
import EditorHeader from "./components/editor/header/EditorHeader";

function App() {
  return (
    <>
      <EditorPage />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
