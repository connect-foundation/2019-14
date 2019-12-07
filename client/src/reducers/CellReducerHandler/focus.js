import { uuidManager } from "../../utils";

const prev = (currentIndex) => {
  const nextIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
  return nextIndex;
};

const next = (currentIndex, cellLength) => {
  const nextIndex =
    currentIndex < cellLength - 1 ? currentIndex + 1 : currentIndex;
  return nextIndex;
};

const move = (cellUuid, cellManager) => {
  const index = uuidManager.findIndex(cellUuid);
  const pos = cellManager.texts[index].length;
  const cursor = {
    start: pos,
    end: pos,
  };
  return {
    cursor,
    currentIndex: index,
  };
};

export default {
  prev,
  next,
  move,
};
