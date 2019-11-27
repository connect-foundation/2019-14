import { PLACEHOLDER } from "../enums";

const useCellState = (state, cellUuid) => {
  const { texts, tags, uuidManager } = state;

  const index = uuidManager.findIndex(cellUuid);

  if (index < 0) {
    // TODO: attach debug
    return null;
  }

  const tag = tags[index];
  const placeholder = PLACEHOLDER[tag];
  const text = texts[index];

  return {
    index,
    tag,
    text,
    placeholder,
  };
};

export default useCellState;
