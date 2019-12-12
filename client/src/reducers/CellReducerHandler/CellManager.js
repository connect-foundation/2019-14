import { uuid } from "uuidv4";
import { utils, uuidManager, getType } from "../../utils";
import { CELL_TAG } from "../../enums";
import { cellGenerator } from "../../components/editor/cells/CellGenerator";

const { splice } = utils;

function CellManager() {
  this.cells = [];
  this.texts = [];
  this.tags = [];
  this.options = [];
}

const TAG_MARKDOWN = {
  [CELL_TAG.DEFAULT]: "",
  [CELL_TAG.LIST.UL]: "- ",
  [CELL_TAG.LIST.OL]: "1. ",
  [CELL_TAG.LIST.LI]: "- ",
  [CELL_TAG.HEADING.H1]: "# ",
  [CELL_TAG.HEADING.H2]: "## ",
  [CELL_TAG.HEADING.H3]: "### ",
  [CELL_TAG.HEADING.H4]: "#### ",
  [CELL_TAG.HEADING.H5]: "##### ",
  [CELL_TAG.HEADING.H6]: "###### ",
  [CELL_TAG.BLOCKQUOTE]: "> ",
  [CELL_TAG.CODE]: "```",
  [CELL_TAG.TERMINAL]: "$$$",
};

const findMakdownByTag = (tag) => {
  const mdText = TAG_MARKDOWN[tag];
  return mdText;
};

CellManager.prototype.init = function() {
  this.cells = [];
  this.texts = [];
  this.tags = [];
  this.options = [];
};

CellManager.prototype.add = function(index, dataObj) {
  if (dataObj.cell !== undefined)
    this.cells = splice.add(this.cells, index, dataObj.cell);
  if (dataObj.text !== undefined)
    this.texts = splice.add(this.texts, index, dataObj.text);
  if (dataObj.tag !== undefined)
    this.tags = splice.add(this.tags, index, dataObj.tag);
};

CellManager.prototype.change = function(index, dataObj) {
  if (dataObj.cell !== undefined)
    this.cells = splice.change(this.cells, index, dataObj.cell);
  if (dataObj.text !== undefined)
    this.texts = splice.change(this.texts, index, dataObj.text);
  if (dataObj.tag !== undefined)
    this.tags = splice.change(this.tags, index, dataObj.tag);
};

CellManager.prototype.delete = function(index, flag) {
  if (flag.cell) this.cells = splice.delete(this.cells, index);
  if (flag.text) this.texts = splice.delete(this.texts, index);
  if (flag.tag) this.tags = splice.delete(this.tags, index);
};

CellManager.prototype.addOption = function(index, dataObj) {
  this.options[index] = dataObj;
};

CellManager.prototype.changeOption = function(index, dataObj) {
  this.options[index] = {
    ...this.options[index],
    ...dataObj,
  };
};

CellManager.prototype.deleteOneOption = function(index, key) {
  delete this.options[index][key];
};

CellManager.prototype.deleteOption = function(index) {
  delete this.options[index];
};

CellManager.prototype.pushArray = function(index, dataObj) {
  if (dataObj.cells !== undefined)
    this.cells = splice.pushArray(this.cells, index, dataObj.cells);
  if (dataObj.texts !== undefined)
    this.texts = splice.pushArray(this.texts, index, dataObj.texts);
  if (dataObj.tags !== undefined)
    this.tags = splice.pushArray(this.tags, index, dataObj.tags);
};

CellManager.prototype.popArray = function(start, end, flag) {
  if (flag.cell) this.cells = splice.popArray(this.cells, start, end);
  if (flag.text) this.texts = splice.popArray(this.texts, start, end);
  if (flag.tag) this.tags = splice.popArray(this.tags, start, end);
};

CellManager.prototype.createMarkdownDocument = function() {
  let document = "";
  for (let i = 0; i < this.texts.length; i += 1) {
    let mdText = null;
    if (this.tags[i] === "ol") {
      mdText = "".concat(this.options[i].start).concat(". ");
    } else {
      mdText = findMakdownByTag(this.tags[i]);
    }

    let text = mdText;
    const isCodeTag = this.tags[i] === "code";
    text += `${isCodeTag ? "\n" : ""}`;
    text += `${this.texts[i]}\n`;
    text += `${isCodeTag ? `${mdText}\n` : ""}`;
    document = document.concat(text);
  }
  return document;
};

CellManager.prototype.load = function(doc) {
  const array = doc.split("\n");
  this.init();
  uuidManager.init();

  let cellIndex = 0;
  for (let i = 0; i < array.length; i += 1) {
    const newCellUuid = uuid();
    uuidManager.push(newCellUuid);

    const { findPattern, matchingTag } = getType(array[i]);
    const tag = matchingTag || "p";
    const cell = cellGenerator[tag];
    this.cells.push(cell(newCellUuid));

    this.tags.push(tag);

    const isAreaTag = tag === "code" || tag === "terminal";
    if (isAreaTag) {
      let areaText = "";
      this.texts[cellIndex] = "";
      i += 1;
      const pattern = findPattern[0];
      while (array[i] !== pattern) {
        areaText = array[i].concat("\n");
        this.texts[cellIndex] = this.texts[cellIndex].concat(areaText);
        i += 1;
      }
    } else {
      let sliceStart = tag !== "p" ? findPattern.length : 0;
      sliceStart = tag === "ol" ? sliceStart + 2 : sliceStart;
      this.texts[cellIndex] = array[i].slice(sliceStart);
    }
    cellIndex += 1;
  }
};

export default CellManager;
