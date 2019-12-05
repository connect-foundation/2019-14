import { uuid } from "uuidv4";
import { utils } from "../../utils";
import { CELL_TAG } from "../../enums";
import { cellGenerator } from "../../components/editor/cells/CellGenerator";

const { splice } = utils;

function CellManager() {
  this.cells = [];
  this.texts = [];
  this.tags = [];
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
  [CELL_TAG.TERMINAL]: "$$$ ",
};

const findMakdownByTag = (tag) => {
  const mdText = TAG_MARKDOWN[tag];
  return mdText;
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
    const mdText = findMakdownByTag(this.tags[i]);
    const text = `${mdText}${this.texts[i]}\n`;
    document = document.concat(text);
  }
  return document;
};

CellManager.prototype.save = function() {};

CellManager.prototype.load = function(doc) {
  const array = doc.split("\n");
  const cell = cellGenerator.p;
  this.cells = [];
  this.tags = [];
  this.texts = array.reduce((acc, val) => {
    this.cells.push(cell(uuid()));
    this.tags.push("p");
    acc.push(val);
    return acc;
  }, []);
};

export default CellManager;
