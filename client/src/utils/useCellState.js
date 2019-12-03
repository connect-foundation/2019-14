import { PLACEHOLDER } from "../enums";
import uuidManager from "./UuidManager";

const useCellState = (state, cellUuid) => {
  const { currentIndex, texts, tags } = state;

  const cellIndex = uuidManager.findIndex(cellUuid);

  if (cellIndex < 0) {
    // TODO: attach debug
    return null;
  }

  const tag = tags[cellIndex];
  const placeholder = PLACEHOLDER[tag];
  const text = texts[cellIndex];

  return {
    currentIndex,
    cellIndex,
    tag,
    placeholder,
    text,
  };
};

export default useCellState;
