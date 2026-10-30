exports.concatPaths = undefined;
exports.convertToLayoutManagerOptions = function (e) {
  var t = e.form;
  var n = e.$formElement;
  var i = e.formOptions;
  var a = e.items;
  var r = e.validationGroup;
  var s = e.extendedLayoutManagerOptions;
  var l = e.onFieldDataChanged;
  var u = e.onContentReady;
  var d = e.onDisposing;
  var c = e.onFieldItemRendered;
  var h = {
    form: t,
    items: a,
    $formElement: n,
    validationGroup: r,
    onFieldDataChanged: l,
    onContentReady: u,
    onDisposing: d,
    onFieldItemRendered: c,
    validationBoundary: i.scrollingEnabled ? n : undefined,
    scrollingEnabled: i.scrollingEnabled,
    showRequiredMark: i.showRequiredMark,
    showOptionalMark: i.showOptionalMark,
    requiredMark: i.requiredMark,
    optionalMark: i.optionalMark,
    requiredMessage: i.requiredMessage,
    screenByWidth: i.screenByWidth,
    layoutData: i.formData,
    labelLocation: i.labelLocation,
    customizeItem: i.customizeItem,
    minColWidth: i.minColWidth,
    showColonAfterLabel: i.showColonAfterLabel,
    onEditorEnterKey: i.onEditorEnterKey,
    labelMode: i.labelMode
  };
  return (0, o.extend)(h, {
    isRoot: s.isRoot,
    colCount: s.colCount,
    alignItemLabels: s.alignItemLabels,
    cssItemClass: s.cssItemClass,
    colCountByScreen: s.colCountByScreen,
    onLayoutChanged: s.onLayoutChanged,
    width: s.width
  });
};
exports.tryGetTabPath = exports.isFullPathContainsTabs = exports.isEqualToDataFieldOrNameOrTitleOrCaption = exports.getTextWithoutSpaces = exports.getOptionNameFromFullName = exports.getItemPath = exports.getFullOptionName = exports.createItemPathByIndex = undefined;
var i = require("./35922.js");
var o = require("./13306.js");
function a(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return r(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return r(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return r(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function r(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function s(e, t) {
  return `${t ? "tabs" : "items"}[${e}]`;
}
exports.createItemPathByIndex = s;
function l(e, t) {
  if ((0, i.isDefined)(e) && (0, i.isDefined)(t)) {
    return `${e}.${t}`;
  } else {
    return e || t;
  }
}
exports.concatPaths = l;
function u(e) {
  if (e) {
    return e.replace(/\s/g, "");
  } else {
    return undefined;
  }
}
exports.getTextWithoutSpaces = u;
exports.isEqualToDataFieldOrNameOrTitleOrCaption = function (e, t) {
  return !!e && (e.dataField === t || e.name === t || u(e.title) === t || e.itemType === "group" && u(e.caption) === t);
};
exports.getFullOptionName = function (e, t) {
  return `${e}.${t}`;
};
exports.getOptionNameFromFullName = function (e) {
  var t = e.split(".");
  return t[t.length - 1].replace(/\[\d+]/, "");
};
exports.tryGetTabPath = function (e) {
  var t = e.split(".");
  var n = a(t);
  for (var i = t.length - 1; i >= 0; i--) {
    if (d(t[i])) {
      return n.join(".");
    }
    n.splice(i, 1);
  }
  return "";
};
function d(e) {
  return e.indexOf("tabs") > -1;
}
exports.isFullPathContainsTabs = d;
exports.getItemPath = function e(t, n, i) {
  var o = t.indexOf(n);
  if (o > -1) {
    return s(o, i);
  }
  for (var a = 0; a < t.length; a++) {
    var r = t[a];
    var u = r.tabs || r.items;
    if (u) {
      var d = e(u, n, r.tabs);
      if (d) {
        return l(s(a, i), d);
      }
    }
  }
};