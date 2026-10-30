exports.hiddenFocus = function (e) {
  p = true;
  e.focus();
  p = false;
};
exports.registerKeyboardAction = function (e, t, n, r, s, u) {
  if (t.option("useLegacyKeyboardNavigation")) {
    return l.noop;
  }
  function d() {
    return (0, i.default)(t.element());
  }
  function c(n) {
    return function (e, t, n, i, o, r) {
      if (function (e, t, n) {
        var i = {
          event: t,
          handled: false
        };
        if (n) {
          n(i);
        } else {
          e._createActionByOption("onKeyDown")(i);
        }
        return i.handled;
      }(t, n.originalEvent, r)) {
        return;
      }
      var s = (0, a.normalizeKeyName)(n);
      if (s === "enter" || s === "space") {
        m(n.target, t);
        if (i) {
          i({
            event: n
          });
        }
      } else if (s === "tab") {
        o.addClass("dx-state-focused");
      } else {
        b(e, t, n);
      }
    }(e, t, n, s, d(), u);
  }
  function h() {
    f = true;
    d().removeClass("dx-state-focused");
  }
  function g() {
    if (!f && !p) {
      d().addClass("dx-state-focused");
    }
    f = false;
  }
  o.default.on(n, "keydown", r, c);
  o.default.on(n, "mousedown", r, h);
  o.default.on(n, "focusin", r, g);
  return function () {
    o.default.off(n, "keydown", r, c);
    o.default.off(n, "mousedown", r, h);
    o.default.off(n, "focusin", r, g);
  };
};
exports.restoreFocus = function (e) {
  if (!e.option("useLegacyKeyboardNavigation") && g) {
    var t = g.viewInstance;
    if (t) {
      var n = _(g.ariaLabel, t.element()).eq(g.index);
      g = null;
      o.default.trigger(n, "focus");
    }
  }
};
exports.saveFocusedElementInfo = m;
exports.selectView = b;
exports.setTabIndex = function (e, t) {
  if (!e.option("useLegacyKeyboardnavigation")) {
    t.attr("tabindex", e.option("tabindex") || 0);
  }
};
exports.subscribeVisibilityChange = function () {
  o.default.on(s.default.getDocument(), "visibilitychange", y);
};
exports.unsubscribeVisibilityChange = function () {
  o.default.off(s.default.getDocument(), "visibilitychange", y);
};
var i = u(require("./68374.js"));
var o = u(require("./55994.js"));
var a = require("./39611.js");
var r = require("./13306.js");
var s = u(require("./73349.js"));
var l = require("./20576.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = `.dx-datagrid-rowsview .dx-row > td`;
var c = `.dx-treelist-rowsview .dx-row > td`;
var h = {
  groupPanel: [".dx-datagrid-group-panel .dx-group-panel-item[tabindex]"],
  columnHeaders: [".dx-datagrid-headers .dx-header-row > td.dx-datagrid-action", ".dx-treelist-headers .dx-header-row > td.dx-treelist-action"],
  filterRow: [".dx-datagrid-headers .dx-datagrid-filter-row .dx-editor-cell .dx-texteditor-input", ".dx-treelist-headers .dx-treelist-filter-row .dx-editor-cell .dx-texteditor-input"],
  rowsView: [`.dx-row-focused`, `.dx-datagrid-rowsview .dx-row[tabindex]`, `${d}[tabindex]`, `${d}`, `.dx-treelist-rowsview .dx-row[tabindex]`, `${c}[tabindex]`, `${c}`],
  footer: [".dx-datagrid-total-footer .dx-datagrid-summary-item", ".dx-treelist-total-footer .dx-treelist-summary-item"],
  filterPanel: [".dx-datagrid-filter-panel .dx-icon-filter", ".dx-treelist-filter-panel .dx-icon-filter"],
  pager: [".dx-datagrid-pager [tabindex]", ".dx-treelist-pager [tabindex]"]
};
var f = false;
var p = false;
var g = null;
function m(e, t) {
  var n = (0, i.default)(e);
  var o = n.attr("aria-label");
  var a = _(o, t.element()).index(n);
  g = (0, r.extend)({}, {
    ariaLabel: o,
    index: a
  }, {
    viewInstance: t
  });
}
function _(e, t) {
  var n = (0, i.default)(t);
  if (e) {
    return n.find(`[aria-label="${e}"][tabindex]`);
  } else {
    return n.find("[tabindex]");
  }
}
function v(e, t) {
  var n = (t == null ? undefined : t.getRootNode()) || s.default.getDocument();
  for (var o in e) {
    var a = e[o];
    var r = (0, i.default)(n).find(a).first();
    if (r.length) {
      return r;
    }
  }
}
function y() {
  p = s.default.getDocument().visibilityState === "visible";
}
function b(e, t, n) {
  var i = (0, a.normalizeKeyName)(n);
  if (n.ctrlKey && (i === "upArrow" || i === "downArrow")) {
    for (var r = Object.keys(h), s = r.indexOf(e); s >= 0 && s < r.length;) {
      var l = r[s = i === "upArrow" ? --s : ++s];
      var u = v(h[l], n.target);
      if (u && u.length) {
        u.attr("tabindex", t.option("tabindex") || 0);
        o.default.trigger(u, "focus");
        u.removeClass("dx-cell-focus-disabled");
        break;
      }
    }
  }
}