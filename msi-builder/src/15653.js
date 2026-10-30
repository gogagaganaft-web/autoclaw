exports.default = undefined;
var i = p(require("./68374.js"));
var o = p(require("./55994.js"));
var a = require("./35922.js");
var r = p(require("./26974.js"));
var s = require("./47617.js");
var l = p(require("./47810.js"));
var u = require("./13306.js");
var d = p(require("./20530.js"));
var c = require("./6415.js");
var h = require("./9234.js");
var f = require("./39611.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
require("./29837.js");
require("./34171.js");
require("./18859.js");
require("./78665.js");
require("./29589.js");
var g = r.default.isWrapped;
var m = function () {
  function e(e, t) {
    return (0, u.extend)(e, {
      readOnly: t.readOnly,
      placeholder: t.placeholder,
      inputAttr: {
        id: t.id
      },
      tabIndex: t.tabIndex
    }, t.editorOptions);
  }
  function t() {
    return l.default.mozilla || d.default.real().ios;
  }
  function n(n) {
    var r = {};
    var s = t();
    var l = n.sharedData || r;
    return e({
      placeholder: n.placeholder,
      width: n.width,
      value: n.value,
      onValueChanged: function (e) {
        var t = n.parentType === "filterRow" || n.parentType === "searchPanel";
        var i = e.event && (e.event.type === "input" || e.event.type === "keyup");
        function o(e, t) {
          if (n) {
            n.setValue(e.value, t);
          }
        }
        clearTimeout(r.valueChangeTimeout);
        if (i && t) {
          l.valueChangeTimeout = r.valueChangeTimeout = setTimeout(function () {
            o(e, r.valueChangeTimeout !== l.valueChangeTimeout);
          }, (0, a.isDefined)(n.updateValueTimeout) ? n.updateValueTimeout : 0);
        } else {
          o(e);
        }
      },
      onKeyDown: function (e) {
        if (s && (0, f.normalizeKeyName)(e.event) === "enter") {
          o.default.trigger((0, i.default)(e.component._input()), "change");
        }
      },
      valueChangeEvent: "change" + (n.parentType === "filterRow" ? " keyup input" : "")
    }, n);
  }
  function r(n) {
    n.editorName = "dxDateBox";
    n.editorOptions = e({
      value: n.value,
      onValueChanged: function (e) {
        n.setValue(e.value);
      },
      onKeyDown: function (e) {
        var n = e.component;
        var i = e.event;
        var o = n.option("useMaskBehavior");
        if ((t() || o) && (0, f.normalizeKeyName)(i) === "enter") {
          n.blur();
          n.focus();
        }
      },
      displayFormat: n.format,
      type: n.dataType,
      dateSerializationFormat: null,
      width: n.parentType === "filterBuilder" ? undefined : "auto"
    }, n);
  }
  function p(e) {
    var t;
    var i = n(e);
    var o = e.parentType === "searchPanel";
    if (e.editorType && e.editorType !== "dxTextBox") {
      i.value = e.value;
    } else {
      t = e.value;
      i.value = (0, a.isDefined)(t) ? t.toString() : "";
    }
    i.valueChangeEvent += o ? " keyup input search" : "";
    i.mode = i.mode || (o ? "search" : "text");
    e.editorName = "dxTextBox";
    e.editorOptions = i;
  }
  function m(e) {
    var t = n(e);
    t.value = (0, a.isDefined)(e.value) ? e.value : null;
    e.editorName = "dxNumberBox";
    e.editorOptions = t;
  }
  function _(t) {
    var n;
    var i;
    var o;
    var r = t.lookup;
    var l = t.parentType === "filterRow";
    if (r) {
      n = (0, s.compileGetter)(r.displayExpr);
      i = r.dataSource;
      if ((0, a.isFunction)(i) && !g(i)) {
        i = i(t.row || {});
        (function (e) {
          if (e.row && e.row.watch && e.parentType === "dataRow") {
            var t;
            var n = e.editorOptions || {};
            e.editorOptions = n;
            var i;
            var o = n.onInitialized;
            n.onInitialized = function (e) {
              if (o) {
                o.apply(this, arguments);
              }
              (t = e.component).on("disposing", a);
            };
            var a = e.row.watch(function () {
              return (i = e.lookup.dataSource(e.row)) && i.filter;
            }, function () {
              t.option("dataSource", i);
            }, function (t) {
              e.row = t;
            });
          }
        })(t);
      }
      if ((0, a.isObject)(i) || Array.isArray(i)) {
        i = (0, h.normalizeDataSourceOptions)(i);
        if (l) {
          o = i.postProcess;
          i.postProcess = function (e) {
            if (this.pageIndex() === 0) {
              (e = e.slice(0)).unshift(null);
            }
            if (o) {
              return o.call(this, e);
            } else {
              return e;
            }
          };
        }
      }
      var d = Boolean(r.allowClearing && !l);
      t.editorName = t.editorType ?? "dxSelectBox";
      t.editorOptions = e({
        searchEnabled: true,
        value: t.value,
        valueExpr: t.lookup.valueExpr,
        searchExpr: t.lookup.searchExpr || t.lookup.displayExpr,
        allowClearing: d,
        showClearButton: d,
        displayExpr: function (e) {
          if (e === null) {
            return t.showAllText;
          } else {
            return n(e);
          }
        },
        dataSource: i,
        onValueChanged: function (e) {
          var n = [e.value];
          if (!l) {
            n.push(e.component.option("text"));
          }
          t.setValue.apply(this, n);
        }
      }, t);
    }
  }
  function v(t) {
    t.editorName = "dxCheckBox";
    t.editorOptions = e({
      elementAttr: {
        id: t.id
      },
      value: (0, a.isDefined)(t.value) ? t.value : undefined,
      hoverStateEnabled: !t.readOnly,
      focusStateEnabled: !t.readOnly,
      activeStateEnabled: false,
      onValueChanged: function (e) {
        if (t.setValue) {
          t.setValue(e.value, e);
        }
      }
    }, t);
  }
  function y(t) {
    t.editorName = t.editorType;
    t.editorOptions = e({
      value: t.value,
      onValueChanged: function (e) {
        t.setValue(e.value);
      }
    }, t);
  }
  function b(e) {
    var t = {
      dxDateBox: r,
      dxCheckBox: v,
      dxNumberBox: m,
      dxTextBox: p
    };
    if (e.lookup) {
      _(e);
    } else if (e.editorType) {
      (t[e.editorType] ?? y)(e);
    } else {
      switch (e.dataType) {
        case "date":
        case "datetime":
          r(e);
          break;
        case "boolean":
          (function (e) {
            if (e.parentType === "filterRow" || e.parentType === "filterBuilder") {
              _((0, u.extend)(e, {
                lookup: {
                  displayExpr: function (t) {
                    if (t === true) {
                      return e.trueText || "true";
                    } else if (t === false) {
                      return e.falseText || "false";
                    } else {
                      return undefined;
                    }
                  },
                  dataSource: [true, false]
                }
              }));
            } else {
              v(e);
            }
          })(e);
          break;
        case "number":
          m(e);
          break;
        default:
          p(e);
      }
    }
  }
  return {
    createEditor: function (e, t) {
      t.cancel = false;
      t.editorElement = (0, c.getPublicElement)(e);
      if (!(0, a.isDefined)(t.tabIndex)) {
        t.tabIndex = this.option("tabIndex");
      }
      b(t);
      this.executeAction("onEditorPreparing", t);
      if (!t.cancel) {
        if (t.parentType === "dataRow" && !t.isOnForm && !(0, a.isDefined)(t.editorOptions.showValidationMark)) {
          t.editorOptions.showValidationMark = false;
        }
        (function (e, t) {
          var n = (0, i.default)(t.editorElement);
          if (t.editorName && t.editorOptions && n[t.editorName]) {
            if ((t.editorName === "dxCheckBox" || t.editorName === "dxSwitch") && !t.isOnForm) {
              n.addClass(e.addWidgetPrefix("checkbox-size"));
              n.parent().addClass("dx-editor-inline-block");
            }
            e._createComponent(n, t.editorName, t.editorOptions);
            if (t.editorName === "dxDateBox") {
              var o = n.dxDateBox("instance");
              var a = o._supportedKeys().enter;
              o.registerKeyHandler("enter", function (e) {
                if (o.option("opened")) {
                  a(e);
                }
                return true;
              });
            }
            if (t.editorName === "dxTextArea") {
              n.dxTextArea("instance").registerKeyHandler("enter", function (e) {
                if ((0, f.normalizeKeyName)(e) === "enter" && !e.ctrlKey && !e.shiftKey) {
                  e.stopPropagation();
                }
              });
            }
          }
        })(this, t);
        this.executeAction("onEditorPrepared", t);
      }
    }
  };
}();
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;