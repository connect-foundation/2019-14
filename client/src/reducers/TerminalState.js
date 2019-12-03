import { utils } from "../utils";

const { splice } = utils;

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

  setIds(cellUuid, cellIndex) {
    this.cellUuid = cellUuid;
  }

  copySelf() {
    return new TerminalState(this);
  }

  appendNewRepl() {
    this.inputTexts = [...this.inputTexts, this.currentText];
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

  updateOutput(index, outputText) {
    this.isLoadings = splice.change(this.isLoadings, index, false);
    this.isActives = splice.change(this.isActives, index, true);
    this.outputTexts = splice.change(this.outputTexts, index, outputText);
  }

  replaceReplTo(index = this.focusIndex) {
    const toBeInput = this.currentText;
    // repl input을 movable repl로 변경한다.
    this.currentText = this.inputTexts[index];

    // movable repl의 데이터를 repl 데이터로 저장한다
    this.inputTexts = splice.change(this.inputTexts, index, toBeInput);
    this.isActives = splice.change(this.isActives, index, false);

    this.outputTexts = splice.change(this.outputTexts, index, "");
    this.isLoadings = splice.change(this.isLoadings, index, true);

    this.replCount = this.inputTexts.length;
  }

  changeCurrent(text) {
    this.currentText = text;
  }

  focusIn() {
    this.focusIndex = this.replCount;
    this.currentText = "";
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

  // ///////////////////
  /* private funtions */
  // ///////////////////

  updateCurrentOutput(index) {
    this.outputTexts = splice.addBefore(this.outputTexts, index, "");

    const upperLoadings = this.isLoadings.slice(0, index);
    const belowLoadings = this.isLoadings.slice(index).map(() => true);

    this.isLoadings = [...upperLoadings, true, ...belowLoadings];
  }

  updateCurrentInput(index) {
    this.inputTexts = splice.addBefore(
      this.inputTexts,
      index,
      this.currentText
    );

    this.currentText = "";

    const upperActives = this.isActives.slice(0, index);
    const belowActives = this.isActives.slice(index).map(() => false);

    this.isActives = [...upperActives, false, ...belowActives];
  }
}

export default TerminalState;
