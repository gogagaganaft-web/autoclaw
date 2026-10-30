Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PivotGridExport = exports.ExportController = exports.DataProvider = undefined;
var i = f(require("./38377.js"));
var o = require("./62754.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./37518.js");
var l = require("./35922.js");
var u = require("./58201.js");
var d = f(require("./30343.js"));
var c = f(require("./18016.js"));
var h = require("./1229.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return g(e);
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
      return g(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return g(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function g(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
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
  exportTo: function () {
    var e = this._createActionByOption("onExporting");
    var t = {
      rtlEnabled: this.option("rtlEnabled"),
      fileName: "PivotGrid",
      cancel: false
    };
    if ((0, l.isFunction)(e)) {
      e(t);
    }
  },
  _getLength: function (e) {
    var t;
    var n = e[0].length;
    var i = 0;
    for (t = 0; t < n; t += 1) {
      i += e[0][t].colspan || 1;
    }
    return i;
  },
  _correctCellsInfoItemLengths: function (e, t) {
    for (var n = 0; n < e.length; n += 1) {
      while (e[n].length < t) {
        e[n].push({});
      }
    }
    return e;
  },
  _calculateCellInfoItemLength: function (e) {
    var t = 0;
    for (var n = 0; n < e.length; n += 1) {
      t += (0, l.isDefined)(e[n].colspan) ? e[n].colspan : 1;
    }
    return t;
  },
  _getEmptyCell: function () {
    return {
      text: "",
      value: undefined,
      colspan: 1,
      rowspan: 1
    };
  },
  _getAllItems: function (e, t, n) {
    var i;
    var o;
    var r = n;
    var u = this._getLength(t);
    var d = e.length;
    if (e.length > 0 && e[0].length > 0 && n.length > 0 && n[0].length === 0) {
      var c = this._calculateCellInfoItemLength(e[0]);
      if (c > 0) {
        r = this._correctCellsInfoItemLengths(n, c);
      }
    }
    if (r.length === 0) {
      for (var f = t.length, p = e.map(function (e) {
          return e.filter(function (e) {
            return !e.expanded;
          }).length;
        }).reduce(function (e, t) {
          return e + t;
        }, 0), g = 0; g < f; g += 1) {
        r[g] = [];
        for (var m = 0; m < p; m += 1) {
          r[g][m] = this._getEmptyCell();
        }
      }
    }
    var _ = e.concat(r);
    for (o = 0; o < t.length; o += 1) {
      for (i = t[o].length - 1; i >= 0; i -= 1) {
        if (!(0, l.isDefined)(_[o + d])) {
          _[o + d] = [];
        }
        _[o + d].splice(0, 0, (0, a.extend)({}, t[o][i]));
      }
    }
    _[0].splice(0, 0, (0, a.extend)({}, this._getEmptyCell(), {
      alignment: (0, s.getDefaultAlignment)(this._options.rtlEnabled),
      colspan: u,
      rowspan: d
    }));
    return (0, h.prepareItems)(_, this._getEmptyCell());
  },
  getDataProvider: function () {
    return new v(this);
  }
};
exports.ExportController = _;
var v = i.default.inherit({
  ctor: function (e) {
    this._exportController = e;
  },
  ready: function () {
    this._initOptions();
    var e = this._options;
    return (0, o.when)(e.items).done(function (t) {
      var n = t[t[0][0].rowspan - 1];
      (0, r.each)(n, function (e, t) {
        t.width = 100;
      });
      e.columns = n;
      e.items = t;
    });
  },
  _initOptions: function () {
    var e = this._exportController;
    var t = e._dataController;
    var n = new o.Deferred();
    t.beginLoading();
    setTimeout(function () {
      var i = (0, a.extend)(true, [], t.getColumnsInfo(true));
      var o = (0, a.extend)(true, [], t.getRowsInfo(true));
      var r = t.getCellsInfo(true);
      n.resolve(e._getAllItems(i, o, r));
      t.endLoading();
    });
    this._options = {
      items: n,
      rtlEnabled: e.option("rtlEnabled"),
      dataFields: e.getDataSource().getAreaFields("data"),
      rowsArea: e._rowsArea,
      columnsArea: e._columnsArea
    };
  },
  getColumns: function () {
    return this._options.columns;
  },
  getColumnsWidths: function () {
    var e = this._options.columnsArea;
    var t = this._options.rowsArea;
    var n = this._options.columns;
    if (!(0, u.hasWindow)() || e.option("scrolling.mode") === "virtual" || e.element().is(":hidden")) {
      return n.map(function () {
        return 100;
      });
    } else {
      return t.getColumnsWidth().concat(e.getColumnsWidth());
    }
  },
  getRowsCount: function () {
    return this._options.items.length;
  },
  getGroupLevel: function () {
    return 0;
  },
  getCellMerging: function (e, t) {
    var n = this._options.items;
    var i = n[e] && n[e][t];
    if (i) {
      return {
        colspan: i.colspan - 1,
        rowspan: i.rowspan - 1
      };
    } else {
      return {
        colspan: 0,
        rowspan: 0
      };
    }
  },
  getFrozenArea: function () {
    return {
      x: this.getRowAreaColCount(),
      y: this.getColumnAreaRowCount()
    };
  },
  getCellType: function (e, t) {
    var n = this.getStyles()[this.getStyleId(e, t)];
    return n && n.dataType || "string";
  },
  getCellData: function (e, t, n) {
    var i = {};
    var o = this._options.items;
    var a = o[e] && o[e][t] || {};
    if (n) {
      i.cellSourceData = a;
      var r = this._tryGetAreaName(a, e, t);
      if (r) {
        i.cellSourceData.area = r;
      }
      i.cellSourceData.rowIndex = e;
      i.cellSourceData.columnIndex = t;
    }
    if (this.getCellType(e, t) === "string") {
      i.value = a.text;
    } else {
      i.value = a.value;
    }
    if (i.cellSourceData && i.cellSourceData.isWhiteSpace) {
      i.value = "";
    }
    return i;
  },
  _tryGetAreaName: function (e, t, n) {
    if (this.isColumnAreaCell(t, n)) {
      return "column";
    } else if (this.isRowAreaCell(t, n)) {
      return "row";
    } else if ((0, l.isDefined)(e.dataIndex)) {
      return "data";
    } else {
      return undefined;
    }
  },
  isRowAreaCell: function (e, t) {
    return e >= this.getColumnAreaRowCount() && t < this.getRowAreaColCount();
  },
  isColumnAreaCell: function (e, t) {
    return t >= this.getRowAreaColCount() && e < this.getColumnAreaRowCount();
  },
  getColumnAreaRowCount: function () {
    return this._options.items[0][0].rowspan;
  },
  getRowAreaColCount: function () {
    return this._options.items[0][0].colspan;
  },
  getHeaderStyles: function () {
    return [{
      alignment: "center",
      dataType: "string"
    }, {
      alignment: (0, s.getDefaultAlignment)(this._options.rtlEnabled),
      dataType: "string"
    }];
  },
  getDataFieldStyles: function () {
    var e = this;
    var t = this._options.dataFields;
    var n = {
      alignment: this._options.rtlEnabled ? "left" : "right"
    };
    var i = [];
    if (t.length) {
      t.forEach(function (t) {
        i.push(m(m({}, n), {
          format: t.format,
          dataType: e.getCellDataType(t)
        }));
      });
      return i;
    } else {
      return [n];
    }
  },
  getStyles: function () {
    this._styles ||= [].concat(p(this.getHeaderStyles()), p(this.getDataFieldStyles()));
    return this._styles;
  },
  getCellDataType: function (e) {
    if (e && e.customizeText) {
      return "string";
    }
    if (e.dataType) {
      return e.dataType;
    }
    if (e.format) {
      if (c.default.parse(d.default.format(1, e.format)) === 1) {
        return "number";
      }
      if (d.default.format(new Date(), e.format)) {
        return "date";
      }
    }
    return "string";
  },
  getStyleId: function (e, t) {
    var n = this._options.items;
    var i = n[e] && n[e][t] || {};
    if (t === 0 && e === 0 || this.isColumnAreaCell(e, t)) {
      return 0;
    } else if (this.isRowAreaCell(e, t)) {
      return 1;
    } else {
      return this.getHeaderStyles().length + (i.dataIndex || 0);
    }
  }
});
exports.DataProvider = v;
var y = {
  DEFAUL_COLUMN_WIDTH: 100
};
exports.PivotGridExport = y;
var b = {
  ExportController: _,
  PivotGridExport: y,
  DataProvider: v
};
exports.default = b;