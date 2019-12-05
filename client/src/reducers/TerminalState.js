import { utils } from "../utils";

const { splice } = utils;

class TerminalState {
  constructor(
    other = {
      inputTexts: [],
      stdinTexts: [],
      isActives: [],
      outputTexts: [],
      isLoadings: [],
    }
  ) {
    this.cellUuid = other.cellUuid || "";

    this.focusIndex = other.focusIndex || 0;
    this.currentText = other.currentText || "";
    this.currentStdin = other.currentStdin || "";

    this.inputTexts = [...other.inputTexts];
    this.stdinTexts = [...other.stdinTexts];
    this.isActives = [...other.isActives];

    this.outputTexts = [...other.outputTexts];
    this.isLoadings = [...other.isLoadings];

    this.replCount = other.replCount || 0;
  }

  setIds(cellUuid) {
    this.cellUuid = cellUuid;
  }

  copySelf() {
    return new TerminalState(this);
  }

  appendNewRepl() {
    this.inputTexts = [...this.inputTexts, this.currentText];
    this.currentText = "";

    this.stdinTexts = [...this.stdinTexts, this.currentStdin];
    this.currentStdin = "";

    this.isActives = [...this.isActives, false];

    this.outputTexts = [...this.outputTexts, ""];
    this.isLoadings = [...this.isLoadings, true];

    this.replCount += 1;
  }

  insertReplTo(index = this.focusIndex) {
    this.updateCurrentInput(index);
    this.updateCurrentOutput(index);
    this.replCount += 1;
  }

  evalAllOutput() {
    this.isLoadings = this.isLoadings.map(() => true);
    this.isActives = this.isActives.map(() => false);
    this.outputTexts = this.outputTexts.map(() => "");
  }

  updateOutput(index, outputText) {
    this.isLoadings = splice.change(this.isLoadings, index, false);
    this.isActives = splice.change(this.isActives, index, true);
    this.outputTexts = splice.change(this.outputTexts, index, outputText);
  }

  deleteRepl(index = this.focusIndex) {
    // repl input을 movable repl로 변경한다.
    this.currentText = this.inputTexts[index];
    this.currentStdin = this.stdinTexts[index];

    this.inputTexts = splice.delete(this.inputTexts, index);
    this.stdinTexts = splice.delete(this.stdinTexts, index);
    this.isActives = splice.delete(this.isActives, index);

    this.outputTexts = splice.delete(this.outputTexts, index);
    this.isLoadings = splice.delete(this.isLoadings, index);

    this.replCount = this.inputTexts.length;
  }

  replaceReplTo(index = this.focusIndex) {
    const toBeInput = this.currentText;
    const toBeStdin = this.currentStdin;

    // repl input을 movable repl로 변경한다.
    this.currentText = this.inputTexts[index];
    this.currentStdin = this.stdinTexts[index];

    // movable repl의 데이터를 repl 데이터로 저장한다
    this.inputTexts = splice.change(this.inputTexts, index, toBeInput);
    this.stdinTexts = splice.change(this.stdinTexts, index, toBeStdin);
    this.isActives = splice.change(this.isActives, index, false);

    this.outputTexts = splice.change(this.outputTexts, index, "");
    this.isLoadings = splice.change(this.isLoadings, index, true);

    this.replCount = this.inputTexts.length;
  }

  changeCurrentText(text) {
    this.currentText = text;
  }

  changeCurrentStdin(text) {
    this.currentStdin = text;
  }

  focusIn() {
    this.focusIndex = this.replCount;
    this.currentText = "";
    this.currentStdin = "";
    this.replCount = this.inputTexts.length;
  }

  focusPrev() {
    this.focusIndex -= 1;
    return this.focusIndex;
  }

  focusNext() {
    this.focusIndex += 1;
    return this.focusIndex;
  }

  focusBottom() {
    this.focusIndex = this.replCount;
    return this.focusIndex;
  }

  updateCurrentOutput(index) {
    this.outputTexts = splice.addBefore(this.outputTexts, index, "");

    this.isLoadings = splice.addBefore(this.isLoadings, index, true);
  }

  updateCurrentInput(index) {
    this.inputTexts = splice.addBefore(
      this.inputTexts,
      index,
      this.currentText
    );

    this.currentText = "";

    this.stdinTexts = splice.addBefore(
      this.stdinTexts,
      index,
      this.currentStdin
    );

    this.currentStdin = "";

    this.isActives = splice.addBefore(this.isActives, index, false);
  }
}

export default TerminalState;
