exports.TABLE_OPERATIONS = undefined;
exports.getAutoSizedElements = function (e, t = "horizontal") {
  var n = [];
  var i = t === "horizontal";
  var a = i ? l(e) : u(e);
  a.each(function (e, t) {
    var a = (0, o.default)(t);
    if (a.get(0).style[i ? "width" : "height"] === "") {
      n.push(a);
    }
  });
  return n;
};
exports.getColumnElements = l;
exports.getLineElements = function (e, t, n = "horizontal") {
  if (n === "horizontal") {
    return u(e, t);
  } else {
    return l(e, t);
  }
};
exports.getRowElements = u;
exports.getTableFormats = function (e) {
  var t = e.getModule("table");
  if (t != null && t.tableFormats) {
    return t.tableFormats();
  } else {
    return s;
  }
};
exports.getTableOperationHandler = function (e, t) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) {
    i[o - 2] = arguments[o];
  }
  return function () {
    var n = e.getModule("table");
    if (n) {
      e.focus();
      return n[t].apply(n, i);
    }
  };
};
exports.hasEmbedContent = function (e, t) {
  return !!t && e.quill.getText(t).length < t.length;
};
exports.setLineElementsFormat = function (e, t) {
  var n = t.elements;
  var i = t.property;
  var o = t.value;
  var s = e.quill.getModule("table").tableBlots;
  var l = `cell${(0, r.camelize)(i, true)}`;
  (0, a.each)(n, function (t, n) {
    var i;
    var a = e.quill.scroll.find(n);
    if (!s.includes(a.statics.blotName)) {
      var r = a.descendant(function (e) {
        return s.includes(e.statics.blotName);
      });
      a = r ? r[0] : null;
    }
    if ((i = a) !== null && i !== undefined) {
      i.format(l, o + "px");
    }
  });
};
exports.unfixTableWidth = function (e, t) {
  var n = t.tableBlot;
  var i = t.quill;
  (n ?? i.scroll.find(e.get(0))).format("tableWidth", "initial");
};
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./95479.js");
var r = require("./78008.js");
var s = ["table", "tableHeaderCell"];
function l(e, t = 0) {
  return e.find("tr").eq(t).find("th, td");
}
function u(e, t = 0) {
  return e.find(`th:nth-child(${1 + t}), td:nth-child(${1 + t})`);
}
exports.TABLE_OPERATIONS = ["insertTable", "insertHeaderRow", "insertRowAbove", "insertRowBelow", "insertColumnLeft", "insertColumnRight", "deleteColumn", "deleteRow", "deleteTable", "cellProperties", "tableProperties"];