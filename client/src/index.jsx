import React from "react";
import ReactDOM from "react-dom";
import EditorPage from "./pages/EditorPage";
import EditorHeader from "./components/editor/EditorHeader";

function App() {
  return (
    <div>
      <EditorPage>
        <EditorHeader />
      </EditorPage>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
