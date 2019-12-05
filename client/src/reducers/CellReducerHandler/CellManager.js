import { utils } from "../../utils";

const { splice } = utils;

function CellManager() {
  this.cells = [];
  this.texts = [];
  this.tags = [];
}

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

CellManager.prototype.save = function() {};

CellManager.prototype.load = function() {};

export default CellManager;
