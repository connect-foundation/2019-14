class TerminalState {
  constructor(
    other = {
      inputTexts: [],
      isActives: [],
      outputTexts: [],
      isLoadings: [],
    }
  ) {
    this.cellUuid = other.cellUuid || "";

    this.focusIndex = other.focusIndex || 0;
    this.currentText = other.currentText || "";

    this.inputTexts = [...other.inputTexts];
    this.isActives = [...other.isActives];

    this.outputTexts = [...other.outputTexts];
    this.isLoadings = [...other.isLoadings];

    this.replCount = other.replCount || 0;
  }

  copySelf() {
    return new TerminalState(this);
  }

  updateOutput(outputText) {
    this.outputTexts.push(outputText);
    this.replCount = this.outputTexts.length;
  }

  changeCurrentText(text) {
    this.currentText = text;
  }

  focusIn() {
    this.focusIndex = this.replCount;
    this.replCount = this.outputTexts.length;
  }
}

export default TerminalState;
