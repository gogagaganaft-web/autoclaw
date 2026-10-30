exports.resetActiveElement = exports.replaceWith = exports.normalizeTemplateElement = exports.isElementInDom = exports.insertBefore = exports.extractTemplateMarkup = exports.createTextElementHiddenCopy = exports.contains = exports.closestCommonParent = exports.clipboardText = exports.clearSelection = undefined;
var i = l(require("./73349.js"));
var o = l(require("./68374.js"));
var a = require("./95479.js");
var r = require("./35922.js");
var s = require("./58201.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = (0, s.getWindow)();
exports.resetActiveElement = function () {
  var e;
  var t = i.default.getActiveElement();
  if (t && t !== i.default.getBody()) {
    if ((e = t.blur) !== null && e !== undefined) {
      e.call(t);
    }
  }
};
exports.clearSelection = function () {
  var e = u.getSelection();
  if (e && e.type !== "Caret") {
    if (e.empty) {
      e.empty();
    } else if (e.removeAllRanges) {
      try {
        e.removeAllRanges();
      } catch (e) {}
    }
  }
};
exports.closestCommonParent = function (e, t) {
  var n = (0, o.default)(e);
  var i = (0, o.default)(t);
  if (n[0] === i[0]) {
    return n[0];
  }
  var a = n.parents();
  var r = i.parents();
  for (var s = -Math.min(a.length, r.length); s < 0; s++) {
    if (a.get(s) === r.get(s)) {
      return a.get(s);
    }
  }
};
exports.extractTemplateMarkup = function (e) {
  var t = (e = (0, o.default)(e)).length && e.filter(function () {
    var e = (0, o.default)(this);
    return e.is("script[type]") && e.attr("type").indexOf("script") < 0;
  });
  if (t.length) {
    return t.eq(0).html();
  } else {
    return (e = (0, o.default)("<div>").append(e)).html();
  }
};
exports.normalizeTemplateElement = function e(t) {
  var n = (0, r.isDefined)(t) && (t.nodeType || (0, r.isRenderer)(t)) ? (0, o.default)(t) : (0, o.default)("<div>").html(t).contents();
  if (n.length === 1) {
    if (n.is("script")) {
      n = e(n.html().trim());
    } else if (n.is("table")) {
      n = n.children("tbody").contents();
    }
  }
  return n;
};
exports.clipboardText = function (e, t) {
  var n = e.originalEvent && e.originalEvent.clipboardData || u.clipboardData;
  if (!t) {
    return n && n.getData("Text");
  }
  if (n) {
    n.setData("Text", t);
  }
};
exports.contains = function e(t, n) {
  return !!n && ((0, r.isWindow)(t) ? e(t.document, n) : t.contains(n) || e(t, function (e) {
    if (e.getRootNode) {
      var t = e.getRootNode().host;
      if (!(0, r.isString)(t)) {
        return t;
      }
    }
  }(n)));
};
exports.createTextElementHiddenCopy = function (e, t, n) {
  var i = u.getComputedStyle((0, o.default)(e).get(0));
  var a = n && n.includePaddings;
  return (0, o.default)("<div>").text(t).css({
    fontStyle: i.fontStyle,
    fontVariant: i.fontVariant,
    fontWeight: i.fontWeight,
    fontSize: i.fontSize,
    fontFamily: i.fontFamily,
    letterSpacing: i.letterSpacing,
    border: i.border,
    paddingTop: a ? i.paddingTop : "",
    paddingRight: a ? i.paddingRight : "",
    paddingBottom: a ? i.paddingBottom : "",
    paddingLeft: a ? i.paddingLeft : "",
    visibility: "hidden",
    whiteSpace: "pre",
    position: "absolute",
    float: "left"
  });
};
function d(e, t) {
  if (t) {
    i.default.insertElement(e.parentNode, t, e);
  }
  return e;
}
exports.insertBefore = d;
exports.replaceWith = function (e, t) {
  if (t && t[0]) {
    if (t.is(e)) {
      return e;
    } else {
      (0, a.each)(t, function (t, n) {
        d(e[0], n);
      });
      e.remove();
      return t;
    }
  }
};
exports.isElementInDom = function (e) {
  var t = e == null ? undefined : e.get(0);
  var n = t == null ? undefined : t.getRootNode().host;
  return !!(0, o.default)(n || t).closest((0, s.getWindow)().document).length;
};