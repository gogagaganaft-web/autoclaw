Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getButtonIndex = exports.forEachFormItems = exports.createFailureHandler = undefined;
exports.getButtonName = a;
exports.getEditorType = exports.getEditingTexts = undefined;
exports.isEditable = function (e) {
  return e && (e.is("input") || e.is("textarea"));
};
exports.isEditingOrShowEditorAlwaysDataCell = exports.isEditingCell = undefined;
var i = require("./35922.js");
exports.createFailureHandler = function (e) {
  return function (t) {
    var n = t instanceof Error ? t : new Error(t && String(t) || "Unknown error");
    e.reject(n);
  };
};
function o(e, t) {
  return t.isEditing || e && t.column.allowEditing;
}
exports.isEditingCell = o;
exports.isEditingOrShowEditorAlwaysDataCell = function (e, t) {
  var n = !!t.column.command;
  var i = o(e, t);
  var a = !n && (i || t.column.showEditorAlways);
  return t.rowType === "data" && a;
};
exports.getEditingTexts = function (e) {
  var t = e.component.option("editing.texts") || {};
  return {
    save: t.saveRowChanges,
    cancel: t.cancelRowChanges,
    edit: t.editRow,
    undelete: t.undeleteRow,
    delete: t.deleteRow,
    add: t.addRowToNode
  };
};
function a(e) {
  if ((0, i.isObject)(e)) {
    return e.name;
  } else {
    return e;
  }
}
exports.getButtonIndex = function (e, t) {
  var n = -1;
  e.some(function (e, i) {
    if (a(e) === t) {
      n = i;
      return true;
    }
  });
  return n;
};
exports.getEditorType = function (e) {
  var n = e.column;
  if (e.isCustomEditorType) {
    return e.editorType;
  } else {
    return n.formItem?.editorType;
  }
};
exports.forEachFormItems = function e(t, n) {
  t.forEach(function (t) {
    if (t.items || t.tabs) {
      e(t.items || t.tabs, n);
    } else {
      n(t);
    }
  });
};