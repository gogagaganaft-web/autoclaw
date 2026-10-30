Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCellInHeaderRow = function (e) {
  return !!e.parent(`.${s.HEADER_ROW_CLASS}`).length;
};
exports.isDataRow = function (e) {
  return e && e.hasClass(s.DATA_ROW_CLASS);
};
exports.isDetailRow = function (e) {
  return e && e.hasClass(s.MASTER_DETAIL_ROW_CLASS);
};
exports.isEditorCell = function (e, t) {
  return !e._isRowEditMode() && t && !t.hasClass(s.COMMAND_SELECT_CLASS) && t.hasClass(r.EDITOR_CELL_CLASS);
};
exports.isElementDefined = function (e) {
  return (0, a.isDefined)(e) && e.length > 0;
};
exports.isFixedColumnIndexOffsetRequired = function (e, t) {
  if (e.option("rtlEnabled")) {
    return t.fixedPosition !== "right" && (!(0, a.isDefined)(t.command) || !!(0, a.isDefined)(t.fixedPosition));
  }
  return !!(0, a.isDefined)(t.fixedPosition) && t.fixedPosition !== "left";
};
exports.isGroupFooterRow = function (e) {
  return e && e.hasClass("dx-datagrid-group-footer");
};
exports.isGroupRow = function (e) {
  return e && e.hasClass(s.GROUP_ROW_CLASS);
};
exports.isMobile = function () {
  return o.default.current().deviceType !== "desktop";
};
exports.isNotFocusedRow = function (e) {
  return !e || e.hasClass(s.FREESPACE_ROW_CLASS) || e.hasClass(s.VIRTUAL_ROW_CLASS);
};
exports.shouldPreventScroll = function (e) {
  var t = e.getController("keyboardNavigation");
  return !!t._isVirtualScrolling() && e.option("focusedRowIndex") === t.getRowIndex();
};
var i;
var o = (i = require("./20530.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
var r = require("./72313.js");
var s = require("./67004.js");