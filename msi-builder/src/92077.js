exports.ICON_MAP = undefined;
exports.applyFormat = S;
exports.getDefaultClickHandler = P;
exports.getFormatHandlers = function (e) {
  return {
    clear: function (t) {
      var n;
      var i = t.event;
      var o = e.quill.getSelection();
      if (o) {
        e.saveValueChangeEvent(i);
        e.quill.removeFormat(o);
        if ((n = A(e)) !== null && n !== undefined) {
          n.updateFormatWidgets();
        }
      }
    },
    link: D(e),
    image: I(e, e.editorInstance.option("imageUpload")),
    color: E(e, "color"),
    background: E(e, "background"),
    orderedList: O(e, "list", "ordered"),
    bulletList: O(e, "list", "bullet"),
    alignLeft: O(e, "align", "left"),
    alignCenter: O(e, "align", "center"),
    alignRight: O(e, "align", "right"),
    alignJustify: O(e, "align", "justify"),
    codeBlock: P(e, "code-block"),
    undo: function (t) {
      var n = t.event;
      e.saveValueChangeEvent(n);
      e.quill.history.undo();
    },
    redo: function (t) {
      var n = t.event;
      e.saveValueChangeEvent(n);
      e.quill.history.redo();
    },
    increaseIndent: function (t) {
      var n = t.event;
      S(e, ["indent", "+1", "user"], n);
    },
    decreaseIndent: function (t) {
      var n = t.event;
      S(e, ["indent", "-1", "user"], n);
    },
    superscript: O(e, "script", "super"),
    subscript: O(e, "script", "sub"),
    insertTable: M(e),
    insertHeaderRow: (0, a.getTableOperationHandler)(e.quill, "insertHeaderRow"),
    insertRowAbove: (0, a.getTableOperationHandler)(e.quill, "insertRowAbove"),
    insertRowBelow: (0, a.getTableOperationHandler)(e.quill, "insertRowBelow"),
    insertColumnLeft: (0, a.getTableOperationHandler)(e.quill, "insertColumnLeft"),
    insertColumnRight: (0, a.getTableOperationHandler)(e.quill, "insertColumnRight"),
    deleteColumn: (0, a.getTableOperationHandler)(e.quill, "deleteColumn"),
    deleteRow: (0, a.getTableOperationHandler)(e.quill, "deleteRow"),
    deleteTable: (0, a.getTableOperationHandler)(e.quill, "deleteTable"),
    cellProperties: C(e, "cell"),
    tableProperties: C(e, "table")
  };
};
var i = m(require("./68374.js"));
var o = m(require("./28109.js"));
var a = require("./28822.js");
var r = require("./35922.js");
var s = require("./95479.js");
var l = m(require("./17737.js"));
var u = m(require("./28236.js"));
var d = m(require("./4278.js"));
var c = m(require("./4741.js"));
var h = require("./58664.js");
var f = require("./10046.js");
var p = require("./58201.js");
var g = require("./60148.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function _(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return b(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || y(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function v(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || y(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function y(e, t) {
  if (e) {
    if (typeof e == "string") {
      return b(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return b(e, t);
    } else {
      return undefined;
    }
  }
}
function b(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var x = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];
function w(e, t) {
  var n = t.contentTemplate;
  var i = t.title;
  var o = t.minHeight;
  var a = t.minWidth;
  var r = t.maxWidth;
  e.formDialogOption({
    contentTemplate: n,
    title: i,
    minHeight: o ?? 0,
    minWidth: a ?? 0,
    maxWidth: r ?? "none"
  });
}
function C(e, t) {
  return function (n) {
    var a;
    if ((a = n) === null || a === undefined || !a.length) {
      n = (0, i.default)(function (e, t) {
        var n = e.quill.getModule("table").getTable();
        if (t === "table") {
          return n[0].domNode;
        } else {
          return n[2].domNode;
        }
      }(e, t));
    }
    var s;
    var u = v(e.quill.getModule("table").getTable() ?? [], 2);
    var d = u[0];
    var f = u[1];
    var g = e.quill.getFormat(e.editorInstance.getSelection(true));
    var m = function (e) {
      if (e === "cell") {
        return B;
      } else {
        return R;
      }
    }(t)(e, {
      $element: n,
      formats: g,
      tableBlot: d,
      rowBlot: f
    });
    var _ = e.editorInstance._formDialog._popup.option();
    var y = {
      contentTemplate: _.contentTemplate,
      title: _.title,
      minHeight: _.minHeight,
      minWidth: _.minWidth,
      maxWidth: _.maxWidth
    };
    e.editorInstance.formDialogOption({
      contentTemplate: function (t) {
        var n = (0, i.default)("<div>").appendTo(t);
        var o = (0, i.default)("<div>").appendTo(n);
        e.editorInstance._createComponent(o, l.default, m.formOptions);
        e.editorInstance._createComponent(n, c.default, {});
        s = o.dxForm("instance");
        return n;
      },
      title: o.default.format(`dxHtmlEditor-${t}Properties`),
      minHeight: 400,
      minWidth: Math.min(800, (0, h.getWidth)((0, p.getWindow)()) * 0.9 - 1),
      maxWidth: (0, h.getWidth)((0, p.getWindow)()) * 0.9
    });
    var b = e.editorInstance.showFormDialog();
    b.done(function (t, n) {
      e.saveValueChangeEvent(n);
      m.applyHandler(s);
      w(e.editorInstance, y);
    });
    b.fail(function () {
      e.quill.focus();
      w(e.editorInstance, y);
    });
  };
}
function S(e, t, n) {
  var i;
  e.saveValueChangeEvent(n);
  (i = e.quill).format.apply(i, _(t));
}
function k(e) {
  if (Array.isArray(e)) {
    return e[0];
  } else {
    return e;
  }
}
function D(e) {
  return function () {
    e.quill.focus();
    var n = e.quill.getSelection();
    var i = n ? e.quill.getFormat() : {};
    var r = i.link !== undefined && n?.length === 0;
    var s = i.link || "";
    if (r) {
      var l = function (e, t) {
        var n;
        var i;
        var o = (0, g.getQuill)().import("formats/link");
        var a = v(e.quill.scroll.descendant(o, t.index), 2);
        n = a[0];
        i = a[1];
        if (!n && t.length === 0) {
          var r = v(e.quill.scroll.descendant(o, t.index - 1), 2);
          n = r[0];
          i = r[1];
          if (n) {
            i += 1;
          }
        }
        if (n) {
          return {
            index: t.index - i,
            length: n.length()
          };
        } else {
          return null;
        }
      }(e, n);
      if (l) {
        n = l;
      } else {
        s = "";
      }
    }
    var u = (0, a.hasEmbedContent)(e, n);
    var d = {
      href: s,
      text: n && !u ? e.quill.getText(n) : "",
      target: !Object.prototype.hasOwnProperty.call(i, "target") || !!i.target
    };
    e.editorInstance.formDialogOption("title", o.default.format("dxHtmlEditor-dialogLinkCaption"));
    var c = e.editorInstance.showFormDialog({
      formData: d,
      items: T(u)
    });
    c.done(function (t, i) {
      if (n && !u) {
        var o = t.text || t.href;
        var a = n;
        var r = a.index;
        var s = a.length;
        t.text = undefined;
        e.saveValueChangeEvent(i);
        if (s) {
          e.quill.deleteText(r, s, "silent");
        }
        e.quill.insertText(r, o, "link", t, "user");
        e.quill.setSelection(r + o.length, 0, "user");
      } else {
        t.text = n || t.text ? t.text : t.href;
        S(e, ["link", t, "user"], i);
      }
    });
    c.fail(function () {
      e.quill.focus();
    });
  };
}
function I(e, t) {
  var n = new f.ImageUploader(e, t);
  return function () {
    n.render();
  };
}
function T(e) {
  return [{
    dataField: "href",
    label: {
      text: o.default.format("dxHtmlEditor-dialogLinkUrlField")
    }
  }, {
    dataField: "text",
    label: {
      text: o.default.format("dxHtmlEditor-dialogLinkTextField")
    },
    visible: !e
  }, {
    dataField: "target",
    editorType: "dxCheckBox",
    editorOptions: {
      text: o.default.format("dxHtmlEditor-dialogLinkTargetField")
    },
    cssClass: "dx-formdialog-field-target",
    label: {
      visible: false
    }
  }];
}
function E(e, t) {
  return function () {
    var n = e.quill.getFormat();
    var i = t === "color" ? "dxHtmlEditor-dialogColorCaption" : "dxHtmlEditor-dialogBackgroundCaption";
    e.editorInstance.formDialogOption("title", o.default.format(i));
    var a = e.editorInstance.showFormDialog({
      formData: n,
      items: [{
        dataField: t,
        editorType: "dxColorView",
        editorOptions: {
          focusStateEnabled: false
        },
        label: {
          visible: false
        }
      }]
    });
    a.done(function (n, i) {
      S(e, [t, n[t], "user"], i);
    });
    a.fail(function () {
      e.quill.focus();
    });
  };
}
function O(e, t, n) {
  return function (i) {
    var o;
    var a = i.event;
    var r = e.quill.getFormat()[t] !== n && n;
    S(e, [t, r, "user"], a);
    if ((o = A(e)) !== null && o !== undefined) {
      o.updateFormatWidgets(true);
    }
  };
}
function A(e) {
  if (e._updateFormatWidget) {
    return e;
  } else {
    return e.quill.getModule("toolbar");
  }
}
function P(e, t) {
  return function (n) {
    var i;
    var o = n.event;
    var a = e.quill.getFormat();
    var s = a[t];
    var l = !((0, r.isBoolean)(s) ? s : (0, r.isDefined)(s));
    S(e, [t, l, "user"], o);
    if ((i = A(e)) !== null && i !== undefined) {
      i._updateFormatWidget(t, l, a);
    }
  };
}
function M(e) {
  return function () {
    var t = e.quill.getFormat();
    if (e._tableFormats.some(function (e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    })) {
      e.quill.focus();
    } else {
      e.editorInstance.formDialogOption("title", o.default.format("dxHtmlEditor-dialogInsertTableCaption"));
      e.editorInstance.showFormDialog({
        formData: {
          rows: 1,
          columns: 1
        },
        items: [{
          dataField: "columns",
          editorType: "dxNumberBox",
          editorOptions: {
            min: 1
          },
          label: {
            text: o.default.format("dxHtmlEditor-dialogInsertTableRowsField")
          }
        }, {
          dataField: "rows",
          editorType: "dxNumberBox",
          editorOptions: {
            min: 1
          },
          label: {
            text: o.default.format("dxHtmlEditor-dialogInsertTableColumnsField")
          }
        }]
      }).done(function (t, n) {
        e.quill.focus();
        var i = e.quill.getModule("table");
        if (i) {
          e.saveValueChangeEvent(n);
          var o = t.columns;
          var a = t.rows;
          i.insertTable(o, a);
        }
      }).always(function () {
        e.quill.focus();
      });
    }
  };
}
function R(e, t) {
  var n;
  var l;
  var c;
  var f = t.$element;
  var g = t.formats;
  var m = t.tableBlot;
  var _ = (0, p.getWindow)();
  var v = f;
  var y = e.editorInstance;
  var b = parseInt(g.tableWidth) || (0, h.getOuterWidth)(v);
  var w = _.getComputedStyle(v.get(0));
  var C = w.textAlign === "start" ? "left" : w.textAlign;
  return {
    formOptions: {
      colCount: 2,
      formData: {
        width: b,
        height: (0, r.isDefined)(g.tableHeight) ? parseInt(g.tableHeight) : (0, h.getOuterHeight)(v),
        backgroundColor: g.tableBackgroundColor || w.backgroundColor,
        borderStyle: g.tableBorderStyle || w.borderTopStyle,
        borderColor: g.tableBorderColor || w.borderTopColor,
        borderWidth: parseInt((0, r.isDefined)(g.tableBorderWidth) ? g.tableBorderWidth : w.borderTopWidth),
        alignment: g.tableAlign || C
      },
      items: [{
        itemType: "group",
        caption: o.default.format("dxHtmlEditor-border"),
        colCountByScreen: {
          xs: 2
        },
        colCount: 2,
        items: [{
          dataField: "borderStyle",
          label: {
            text: o.default.format("dxHtmlEditor-style")
          },
          editorType: "dxSelectBox",
          editorOptions: {
            items: x,
            placeholder: "Select style"
          }
        }, {
          dataField: "borderWidth",
          label: {
            text: o.default.format("dxHtmlEditor-borderWidth")
          },
          editorOptions: {
            placeholder: o.default.format("dxHtmlEditor-pixels")
          }
        }, {
          itemType: "simple",
          dataField: "borderColor",
          label: {
            text: o.default.format("dxHtmlEditor-borderColor")
          },
          colSpan: 2,
          template: function (e) {
            var t = (0, i.default)("<div>");
            y._createComponent(t, d.default, {
              editAlphaChannel: true,
              value: e.component.option("formData").borderColor,
              onInitialized: function (e) {
                l = e.component;
              }
            });
            return t;
          }
        }]
      }, {
        itemType: "group",
        caption: o.default.format("dxHtmlEditor-dimensions"),
        colCountByScreen: {
          xs: 2
        },
        colCount: 2,
        items: [{
          dataField: "width",
          label: {
            text: o.default.format("dxHtmlEditor-width")
          },
          editorOptions: {
            min: 0,
            placeholder: o.default.format("dxHtmlEditor-pixels")
          }
        }, {
          dataField: "height",
          label: {
            text: o.default.format("dxHtmlEditor-height")
          },
          editorOptions: {
            min: 0,
            placeholder: o.default.format("dxHtmlEditor-pixels")
          }
        }]
      }, {
        itemType: "group",
        caption: o.default.format("dxHtmlEditor-tableBackground"),
        items: [{
          itemType: "simple",
          dataField: "backgroundColor",
          label: {
            text: o.default.format("dxHtmlEditor-borderColor")
          },
          template: function (e) {
            var t = (0, i.default)("<div>");
            y._createComponent(t, d.default, {
              editAlphaChannel: true,
              value: e.component.option("formData").backgroundColor,
              onInitialized: function (e) {
                c = e.component;
              }
            });
            return t;
          }
        }]
      }, {
        itemType: "group",
        caption: o.default.format("dxHtmlEditor-alignment"),
        items: [{
          itemType: "simple",
          label: {
            text: o.default.format("dxHtmlEditor-horizontal")
          },
          template: function () {
            var e = (0, i.default)("<div>");
            y._createComponent(e, u.default, {
              items: [{
                value: "left",
                icon: "alignleft"
              }, {
                value: "center",
                icon: "aligncenter"
              }, {
                value: "right",
                icon: "alignright"
              }, {
                value: "justify",
                icon: "alignjustify"
              }],
              keyExpr: "value",
              selectedItemKeys: [C],
              onInitialized: function (e) {
                n = e.component;
              }
            });
            return e;
          }
        }]
      }],
      showColonAfterLabel: true,
      labelLocation: "top",
      minColWidth: 400
    },
    applyHandler: function (t) {
      var o = t.option("formData");
      var u = o.width === b ? undefined : o.width;
      var d = o.height;
      (function (e, t) {
        var n = t.$table;
        var o = t.newHeight;
        var l = t.newWidth;
        var u = t.tableBlot;
        if ((0, r.isDefined)(l)) {
          if ((0, a.getAutoSizedElements)(n).length > 0) {
            e.editorInstance.format("tableWidth", l + "px");
          } else {
            var d = (0, a.getColumnElements)(n);
            var c = (0, h.getOuterWidth)(n);
            (0, a.unfixTableWidth)(n, {
              tableBlot: u
            });
            (0, s.each)(d, function (t, o) {
              var r = (0, i.default)(o);
              var s = l / c * (0, h.getOuterWidth)(r);
              var u = (0, a.getLineElements)(n, r.index(), "horizontal");
              (0, a.setLineElementsFormat)(e, {
                elements: u,
                property: "width",
                value: s
              });
            });
          }
        }
        var f = (0, a.getAutoSizedElements)(n, "vertical");
        if ((f == null ? undefined : f.length) > 0) {
          u.format("tableHeight", o + "px");
        } else {
          var p = (0, a.getRowElements)(n);
          var g = (0, h.getOuterHeight)(n);
          (0, s.each)(p, function (t, r) {
            var s = (0, i.default)(r);
            var l = o / g * (0, h.getOuterHeight)(s);
            var u = (0, a.getLineElements)(n, t, "vertical");
            (0, a.setLineElementsFormat)(e, {
              elements: u,
              property: "height",
              value: l
            });
          });
        }
      })(e, {
        $table: v,
        newHeight: d,
        newWidth: u,
        tableBlot: m
      });
      e.editorInstance.format("tableBorderStyle", o.borderStyle);
      e.editorInstance.format("tableBorderWidth", o.borderWidth + "px");
      e.editorInstance.format("tableBorderColor", l.option("value"));
      e.editorInstance.format("tableBackgroundColor", c.option("value"));
      e.editorInstance.format("tableTextAlign", n.option("selectedItemKeys")[0]);
    }
  };
}
function B(e, t) {
  var n;
  var s;
  var l;
  var c;
  var f = t.$element;
  var g = t.formats;
  var m = t.tableBlot;
  var _ = t.rowBlot;
  var v = (0, p.getWindow)();
  var y = f;
  var b = (0, r.isDefined)(g.cellWidth) ? parseInt(g.cellWidth) : (0, h.getOuterWidth)(y);
  var w = e.editorInstance;
  var C = v.getComputedStyle(y.get(0));
  var S = C.textAlign === "start" ? "left" : C.textAlign;
  return {
    formOptions: {
      colCount: 2,
      formData: {
        width: b,
        height: (0, r.isDefined)(g.cellHeight) ? parseInt(g.cellHeight) : (0, h.getOuterHeight)(y),
        backgroundColor: k(g.cellBackgroundColor) || C.backgroundColor,
        borderStyle: g.cellBorderStyle || C.borderTopStyle,
        borderColor: k(g.cellBorderColor) || C.borderTopColor,
        borderWidth: parseInt((0, r.isDefined)(g.cellBorderWidth) ? g.cellBorderWidth : C.borderTopWidth),
        alignment: g.cellTextAlign || S,
        verticalAlignment: g.cellVerticalAlign || C.verticalAlign,
        verticalPadding: parseInt((0, r.isDefined)(g.cellPaddingTop) ? g.cellPaddingTop : C.paddingTop),
        horizontalPadding: parseInt((0, r.isDefined)(g.cellPaddingLeft) ? g.cellPaddingLeft : C.paddingLeft)
      },
      items: [{
        itemType: "group",
        caption: o.default.format("dxHtmlEditor-border"),
        colCountByScreen: {
          xs: 2
        },
        colCount: 2,
        items: [{
          dataField: "borderStyle",
          label: {
            text: o.default.format("dxHtmlEditor-style")
          },
          editorType: "dxSelectBox",
          editorOptions: {
            items: x
          }
        }, {
          dataField: "borderWidth",
          label: {
            text: o.default.format("dxHtmlEditor-borderWidth")
          },
          editorOptions: {
            placeholder: o.default.format("dxHtmlEditor-pixels")
          }
        }, {
          itemType: "simple",
          dataField: "borderColor",
          colSpan: 2,
          label: {
            text: o.default.format("dxHtmlEditor-borderColor")
          },
          template: function (e) {
            var t = (0, i.default)("<div>");
            w._createComponent(t, d.default, {
              editAlphaChannel: true,
              value: e.component.option("formData").borderColor,
              onInitialized: function (e) {
                l = e.component;
              }
            });
            return t;
          }
        }]
      }, {
        itemType: "group",
        caption: o.default.format("dxHtmlEditor-dimensions"),
        colCount: 2,
        colCountByScreen: {
          xs: 2
        },
        items: [{
          dataField: "width",
          label: {
            text: o.default.format("dxHtmlEditor-width")
          },
          editorOptions: {
            min: 0,
            placeholder: o.default.format("dxHtmlEditor-pixels")
          }
        }, {
          dataField: "height",
          label: {
            text: o.default.format("dxHtmlEditor-height")
          },
          editorOptions: {
            min: 0,
            placeholder: o.default.format("dxHtmlEditor-pixels")
          }
        }, {
          dataField: "verticalPadding",
          label: {
            text: o.default.format("dxHtmlEditor-paddingVertical")
          },
          editorOptions: {
            placeholder: o.default.format("dxHtmlEditor-pixels")
          }
        }, {
          label: {
            text: o.default.format("dxHtmlEditor-paddingHorizontal")
          },
          dataField: "horizontalPadding",
          editorOptions: {
            placeholder: o.default.format("dxHtmlEditor-pixels")
          }
        }]
      }, {
        itemType: "group",
        caption: o.default.format("dxHtmlEditor-tableBackground"),
        items: [{
          itemType: "simple",
          dataField: "backgroundColor",
          label: {
            text: o.default.format("dxHtmlEditor-borderColor")
          },
          template: function (e) {
            var t = (0, i.default)("<div>");
            w._createComponent(t, d.default, {
              editAlphaChannel: true,
              value: e.component.option("formData").backgroundColor,
              onInitialized: function (e) {
                c = e.component;
              }
            });
            return t;
          }
        }]
      }, {
        itemType: "group",
        caption: o.default.format("dxHtmlEditor-alignment"),
        colCount: 2,
        items: [{
          itemType: "simple",
          label: {
            text: o.default.format("dxHtmlEditor-horizontal")
          },
          template: function () {
            var e = (0, i.default)("<div>");
            w._createComponent(e, u.default, {
              items: [{
                value: "left",
                icon: "alignleft"
              }, {
                value: "center",
                icon: "aligncenter"
              }, {
                value: "right",
                icon: "alignright"
              }, {
                value: "justify",
                icon: "alignjustify"
              }],
              keyExpr: "value",
              selectedItemKeys: [S],
              onInitialized: function (e) {
                n = e.component;
              }
            });
            return e;
          }
        }, {
          itemType: "simple",
          label: {
            text: o.default.format("dxHtmlEditor-vertical")
          },
          template: function () {
            var e = (0, i.default)("<div>");
            w._createComponent(e, u.default, {
              items: [{
                value: "top",
                icon: "verticalaligntop"
              }, {
                value: "middle",
                icon: "verticalaligncenter"
              }, {
                value: "bottom",
                icon: "verticalalignbottom"
              }],
              keyExpr: "value",
              selectedItemKeys: [C.verticalAlign],
              onInitialized: function (e) {
                s = e.component;
              }
            });
            return e;
          }
        }]
      }],
      showColonAfterLabel: true,
      labelLocation: "top",
      minColWidth: 400
    },
    applyHandler: function (t) {
      var o = t.option("formData");
      var u = o.width === parseInt(b) ? undefined : o.width;
      var d = o.height;
      (function (e, t) {
        var n = t.$cell;
        var o = t.newHeight;
        var s = t.newWidth;
        var l = t.tableBlot;
        var u = t.rowBlot;
        var d = (0, i.default)(n.closest("table"));
        if ((0, r.isDefined)(s)) {
          var c = (0, i.default)(n).index();
          var f = (0, a.getLineElements)(d, c);
          var p = s - (0, h.getOuterWidth)(n);
          var g = (0, h.getOuterWidth)(d);
          if (s > g) {
            (0, a.unfixTableWidth)(d, {
              tableBlot: l
            });
          }
          (0, a.setLineElementsFormat)(e, {
            elements: f,
            property: "width",
            value: s
          });
          var m = n.next();
          if ((0, a.getAutoSizedElements)(d).length === 0) {
            (0, a.unfixTableWidth)(d, {
              tableBlot: l
            });
            if (m.length === 1) {
              f = (0, a.getLineElements)(d, c + 1);
              var _ = (0, h.getOuterWidth)(f.eq(0)) - p;
              (0, a.setLineElementsFormat)(e, {
                elements: f,
                property: "width",
                value: Math.max(_, 0)
              });
            } else if (n.prev().length === 1) {
              f = (0, a.getLineElements)(d, c - 1);
              var v = (0, h.getOuterWidth)(f.eq(0)) - p;
              (0, a.setLineElementsFormat)(e, {
                elements: f,
                property: "width",
                value: Math.max(v, 0)
              });
            }
          }
        }
        u.children.forEach(function (e) {
          e.format("cellHeight", o + "px");
        });
        if ((0, a.getAutoSizedElements)(d, "vertical").length === 0) {
          d.css("height", "auto");
        }
      })(e, {
        $cell: y,
        newHeight: d,
        newWidth: u,
        tableBlot: m,
        rowBlot: _
      });
      e.editorInstance.format("cellBorderWidth", o.borderWidth + "px");
      e.editorInstance.format("cellBorderColor", l.option("value"));
      e.editorInstance.format("cellBorderStyle", o.borderStyle);
      e.editorInstance.format("cellBackgroundColor", c.option("value"));
      e.editorInstance.format("cellTextAlign", n.option("selectedItemKeys")[0]);
      e.editorInstance.format("cellVerticalAlign", s.option("selectedItemKeys")[0]);
      e.editorInstance.format("cellPaddingLeft", o.horizontalPadding + "px");
      e.editorInstance.format("cellPaddingRight", o.horizontalPadding + "px");
      e.editorInstance.format("cellPaddingTop", o.verticalPadding + "px");
      e.editorInstance.format("cellPaddingBottom", o.verticalPadding + "px");
    }
  };
}
exports.ICON_MAP = {
  insertHeaderRow: "header",
  clear: "clearformat"
};