exports.Export = undefined;
var i;
var o = require("./35922.js");
var a = require("./13306.js");
var r = require("./30646.js");
var s = require("./65322.js");
var l = require("./41269.js");
var u = require("./27504.js");
var d = require("./22775.js");
var c = require("./66867.js");
var h = require("./79262.js");
var f = (i = require("./28109.js")) && i.__esModule ? i : {
  default: i
};
var p = require("./5332.js");
var g = require("./58201.js");
function m() {
  return (m = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var _ = {
  getFullOptions: function (e) {
    var t = e.jsPDFDocument;
    var n = (0, a.extend)({}, e);
    if (!(0, o.isDefined)(n.topLeft)) {
      n.topLeft = {
        x: 0,
        y: 0
      };
    }
    if (!(0, o.isDefined)(n.indent)) {
      n.indent = 0;
    }
    if (!(0, o.isDefined)(n.repeatHeaders)) {
      n.repeatHeaders = true;
    }
    if (!(0, o.isDefined)(n.margin)) {
      n.margin = (0, h.toPdfUnit)(t, 40);
    }
    n.margin = (0, r.normalizeBoundaryValue)(n.margin);
    if (!Array.isArray(n.columnWidths)) {
      n.columnWidths = [];
    }
    if (!(0, o.isDefined)(n.loadPanel)) {
      n.loadPanel = {};
    }
    if (!(0, o.isDefined)(n.loadPanel.enabled)) {
      n.loadPanel.enabled = true;
    }
    if (!(0, o.isDefined)(n.loadPanel.text)) {
      n.loadPanel.text = f.default.format("dxDataGrid-exporting");
    }
    return n;
  },
  export: function (e) {
    var t;
    var n;
    var i = e.jsPDFDocument;
    var a = e.component;
    var f = e.selectedRowsOnly;
    var _ = e.loadPanel;
    var v = ((t = a._getInternalInstance) === null || t === undefined ? undefined : t.call(a)) || a;
    var y = v.option("loadPanel") && v.option("loadPanel").enabled;
    if (y) {
      a.option("loadPanel.enabled", false);
    }
    if (_.enabled && (0, g.hasWindow)()) {
      var b = a.getView("rowsView");
      (n = new p.ExportLoadPanel(a, b.element(), b.element().parent(), _)).show();
    }
    var x = a.getDataProvider(f);
    return new Promise(function (t) {
      x.ready().done(function () {
        var n;
        var f;
        var p = (0, u.generateRowsInfo)(i, x, a, (n = e.rowOptions) === null || n === undefined || (f = n.headerStyles) === null || f === undefined ? undefined : f.backgroundColor);
        if (e.customizeCell) {
          p.forEach(function (t) {
            return t.cells.forEach(function (t) {
              return e.customizeCell(t);
            });
          });
        }
        (0, r.normalizeRowsInfo)(p);
        (0, s.initializeCellsWidth)(i, x, p, e);
        (0, s.resizeFirstColumnByIndentLevel)(p, e);
        (0, s.applyColSpans)(p);
        (0, s.calculateHeights)(i, p, e);
        (0, s.applyRowSpans)(p);
        (0, l.updateRowsAndCellsHeights)(i, p);
        (0, s.calculateCoordinates)(i, p, e);
        (0, s.applyBordersConfig)(p);
        (0, h.applyWordWrap)(i, p);
        var g = (0, c.getDocumentStyles)(i);
        var _ = !!a.option("rtlEnabled");
        var v = (0, d.splitByPages)(i, p, e, function (e) {
          var n = e.sourceRect;
          var a = e.leftRect;
          var r = e.rightRect;
          var s = {};
          var l = {};
          if (n.sourceCellInfo.text?.length > 0) {
            if (_) {
              var u = i.getTextWidth(n.sourceCellInfo.text) > a.w;
              var d = !(0, o.isDefined)(n.sourceCellInfo.horizontalAlign) || n.sourceCellInfo.horizontalAlign === "right";
              if (u || !d) {
                var p;
                var g;
                if (n.sourceCellInfo?.horizontalAlign === "right") {
                  g = (p = n.sourceCellInfo._textLeftOffset ?? 0) + a.w;
                } else if (n.sourceCellInfo?.horizontalAlign === "center") {
                  p = (g = n.x + n.w - (r.x + r.w) + n.sourceCellInfo._rect.w / 2 - a.w / 2) - r.w;
                } else if (n.sourceCellInfo?.horizontalAlign === "left") {
                  p = (g = n.x + n.w - (r.x + r.w)) - r.w;
                }
                s = m({}, {
                  _textLeftOffset: p
                });
                l = m({}, {
                  _textLeftOffset: g
                });
              } else {
                l = m({}, {
                  text: ""
                });
              }
            } else {
              var y = i.getTextWidth(n.sourceCellInfo.text) > a.w;
              var b = !(0, o.isDefined)(n.sourceCellInfo.horizontalAlign) || n.sourceCellInfo.horizontalAlign === "left";
              if (y || !b) {
                var S;
                var k;
                if (n.sourceCellInfo?.horizontalAlign === "left") {
                  k = (S = n.sourceCellInfo._textLeftOffset ?? 0) - a.w;
                } else if (n.sourceCellInfo?.horizontalAlign === "center") {
                  var T = n.sourceCellInfo._textLeftOffset ?? 0;
                  S = T + (n.x + n.w / 2) - (a.x + a.w / 2);
                  k = T + (n.x + n.w / 2) - (r.x + r.w / 2);
                } else if (n.sourceCellInfo?.horizontalAlign === "right") {
                  S = n.x + n.w - (a.x + a.w);
                  k = n.x + n.w - (r.x + r.w);
                }
                s = m({}, {
                  _textLeftOffset: S
                });
                l = m({}, {
                  _textLeftOffset: k
                });
              } else {
                l = m({}, {
                  text: ""
                });
              }
            }
          }
          a.sourceCellInfo = m({}, n.sourceCellInfo, {
            debugSourceCellInfo: n.sourceCellInfo
          }, s);
          r.sourceCellInfo = m({}, n.sourceCellInfo, {
            debugSourceCellInfo: n.sourceCellInfo
          }, l);
        }, function (e) {
          var n = e.sourceRect;
          var o = e.topRect;
          var a = e.bottomRect;
          var r = {};
          var s = {};
          if (n.sourceCellInfo.text?.length > 0) {
            var u = i.getTextDimensions(n.sourceCellInfo.text).h > o.h;
            var d = n.sourceCellInfo?.verticalAlign === "top";
            if (u || !d) {
              var p;
              var g;
              if (n.sourceCellInfo?.verticalAlign === "top") {
                g = (p = n.sourceCellInfo._textTopOffset ?? 0) - o.h;
              } else if (n.sourceCellInfo?.verticalAlign === "middle") {
                var y = n.sourceCellInfo._textTopOffset ?? 0;
                p = y + (n.y + n.h / 2) - (o.y + o.h / 2);
                g = y + (n.y + n.h / 2) - (a.y + a.h / 2);
              } else if (n.sourceCellInfo?.verticalAlign === "bottom") {
                p = n.y + n.h - (o.y + o.h);
                g = n.y + n.h - (a.y + a.h);
              }
              r = m({}, {
                _textTopOffset: p
              });
              s = m({}, {
                _textTopOffset: g
              });
            } else {
              s = m({}, {
                text: ""
              });
            }
          }
          o.sourceCellInfo = m({}, n.sourceCellInfo, {
            debugSourceCellInfo: n.sourceCellInfo
          }, r);
          a.sourceCellInfo = m({}, n.sourceCellInfo, {
            debugSourceCellInfo: n.sourceCellInfo
          }, s);
        });
        if (_) {
          (0, h.applyRtl)(i, v, e);
        }
        v.forEach(function (t, n) {
          if (n > 0) {
            (0, c.addNewPage)(i);
          }
          (0, c.drawCellsContent)(i, e.customDrawCell, t, g);
          (0, c.drawCellsLines)(i, t, g);
          if ((0, o.isDefined)(t) && t.length === 0) {
            var a = (0, s.calculateTableSize)(i, t, e);
            var r = (0, u.getBaseTableStyle)();
            (0, c.drawGridLines)(i, a, r, g);
          }
        });
        (0, c.setDocumentStyles)(i, g);
        t();
      }).always(function () {
        if (y) {
          a.option("loadPanel.enabled", y);
        }
        if (_.enabled && (0, g.hasWindow)()) {
          n.dispose();
        }
      });
    });
  }
};
exports.Export = _;