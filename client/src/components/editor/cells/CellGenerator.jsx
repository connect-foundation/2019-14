const cellGenerator = {};

const setGenerator = (tag, cellGenerateCallback) => {
  cellGenerator[tag] = cellGenerateCallback;
};

export { cellGenerator, setGenerator };
