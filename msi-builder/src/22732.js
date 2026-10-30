Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyUserState = exports.addExpandColumn = undefined;
exports.assignColumns = P;
exports.isCustomCommandColumn = exports.isColumnFixed = exports.getValueDataType = exports.getSerializationFormat = exports.getRowCount = exports.getParentBandColumns = exports.getFixedPosition = exports.getDataColumns = exports.getCustomizeTextByDataType = exports.getColumnIndexByVisibleIndex = exports.getColumnFullPath = exports.getColumnByIndexes = exports.getChildrenByBandColumn = exports.getAlignmentByDataType = exports.fireOptionChanged = exports.fireColumnsChanged = exports.findColumn = exports.digitsCount = exports.defaultSetCellValue = exports.customizeTextForBooleanDataType = exports.createColumnsFromOptions = exports.createColumnsFromDataSource = exports.createColumn = exports.convertOwnerBandToColumnReference = exports.columnOptionCore = exports.calculateColspan = undefined;
exports.isSortOrderValid = L;
exports.updateSortOrderWhenGrouping = exports.updateSerializers = exports.updateIndexes = exports.updateColumnVisibleIndexes = exports.updateColumnSortIndexes = exports.updateColumnIndexes = exports.updateColumnGroupIndexes = exports.updateColumnChanges = exports.strictParseNumber = exports.sortColumns = exports.setFilterOperationsAsDefaultValues = exports.resetColumnsCache = exports.resetBandColumnsCache = exports.processExpandColumns = exports.processBandColumns = exports.numberToString = exports.moveColumnToGroup = exports.mergeColumns = undefined;
var i = require("./89386.js");
var o = require("./20576.js");
var a = require("./47617.js");
var r = m(require("./69434.js"));
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./48013.js");
var d = require("./37518.js");
var c = require("./35922.js");
var h = m(require("./26974.js"));
var f = m(require("./18016.js"));
var p = m(require("./60082.js"));
var g = require("./54057.js");
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
  e.filterOperations = e.defaultFilterOperations;
}
exports.setFilterOperationsAsDefaultValues = _;
var v = 1;
function y(e, t, n, i) {
  var o = {};
  if (t) {
    if ((0, c.isString)(t)) {
      t = {
        dataField: t
      };
    }
    e.setName(t);
    var a = {};
    if (t.command) {
      a = (0, u.deepExtendArraySafe)(o, t);
    } else {
      o = e.getCommonSettings(t);
      if (n && n.name && n.dataField) {
        t = (0, s.extend)({}, t, {
          dataField: n.dataField
        });
      }
      var r = e._createCalculatedColumnOptions(t, i);
      if (!t.type) {
        a = {
          headerId: `dx-col-${v++}`
        };
      }
      a = (0, u.deepExtendArraySafe)(a, g.DEFAULT_COLUMN_OPTIONS);
      (0, u.deepExtendArraySafe)(a, o);
      (0, u.deepExtendArraySafe)(a, r);
      (0, u.deepExtendArraySafe)(a, t);
      (0, u.deepExtendArraySafe)(a, {
        selector: null
      });
    }
    if (t.filterOperations === t.defaultFilterOperations) {
      _(a);
    }
    return a;
  }
}
exports.createColumn = y;
var b = function e(t, n, i) {
  var o = [];
  if (n) {
    (0, l.each)(n, function (n, a) {
      var r = t._columnsUserState && E(a, t._columnsUserState[n]) && t._columnsUserState[n];
      var s = y(t, a, r, i);
      if (s) {
        if (i) {
          s.ownerBand = i;
        }
        o.push(s);
        if (s.columns) {
          o = o.concat(e(t, s.columns, s));
          delete s.columns;
          s.hasColumns = true;
        }
      }
    });
  }
  return o;
};
exports.createColumnsFromOptions = b;
function x(e, t) {
  var n = [];
  for (var i = t[e]; i;) {
    n.unshift(i);
    i = t[e = i.index];
  }
  return n;
}
exports.getParentBandColumns = x;
exports.getChildrenByBandColumn = function e(t, n, i) {
  var o = [];
  var a = n[t];
  if (a) {
    for (var r = 0; r < a.length; r++) {
      var s = a[r];
      if (!(0, c.isDefined)(s.groupIndex) || !!s.showWhenGrouped) {
        o.push(s);
        if (i && s.isBand) {
          o = o.concat(e(s.index, n, i));
        }
      }
    }
  }
  return o;
};
exports.getColumnByIndexes = function (e, t) {
  var n;
  var i;
  function o(e) {
    var t = n ? n.index : undefined;
    return e.ownerBand === t;
  }
  if (e.getBandColumnsCache().isPlain) {
    n = e._columns[t[0]];
  } else {
    i = e._columns.filter(o);
    for (var a = 0; a < t.length; a++) {
      if (n = i[t[a]]) {
        i = e._columns.filter(o);
      }
    }
  }
  return n;
};
function w(e, t) {
  var n;
  var i = [];
  var o = e.getBandColumnsCache();
  function a(e) {
    return e.ownerBand === t.ownerBand;
  }
  if (o.isPlain) {
    var r = e._columns.indexOf(t);
    if (r >= 0) {
      i = [`columns[${r}]`];
    }
  } else {
    for (n = e._columns.filter(a); n.length && n.indexOf(t) !== -1;) {
      i.unshift(`columns[${n.indexOf(t)}]`);
      n = (t = o.columnParentByIndex[t.index]) ? e._columns.filter(a) : [];
    }
  }
  return i.join(".");
}
exports.getColumnFullPath = w;
var C = function e(t, n) {
  var i = 0;
  var o = t.getChildrenByBandColumn(n, true);
  (0, l.each)(o, function (n, o) {
    if (o.isBand) {
      o.colspan = o.colspan || e(t, o.index);
      i += o.colspan || 1;
    } else {
      i += 1;
    }
  });
  return i;
};
exports.calculateColspan = C;
exports.processBandColumns = function (e, t, n) {
  var i;
  for (var o = 0; o < t.length; o++) {
    var a = t[o];
    if (a.visible || a.command) {
      if (a.isBand) {
        a.colspan = a.colspan || C(e, a.index);
      }
      if (!a.isBand || !a.colspan) {
        i = e.getRowCount();
        if (!a.command && (!(0, c.isDefined)(a.groupIndex) || !!a.showWhenGrouped)) {
          i -= x(a.index, n.columnParentByIndex).length;
        }
        if (i > 1) {
          a.rowspan = i;
        }
      }
    }
  }
};
exports.getValueDataType = function (e) {
  var t = (0, c.type)(e);
  if (t !== "string" && t !== "boolean" && t !== "number" && t !== "date" && t !== "object") {
    t = undefined;
  }
  return t;
};
exports.getSerializationFormat = function (e, t) {
  switch (e) {
    case "date":
    case "datetime":
      return r.default.getDateSerializationFormat(t);
    case "number":
      if ((0, c.isString)(t)) {
        return "string";
      }
      if ((0, c.isNumeric)(t)) {
        return null;
      }
  }
};
exports.updateSerializers = function (e, t) {
  if (!e.deserializeValue) {
    if (p.default.isDateType(t)) {
      e.deserializeValue = function (e) {
        return r.default.deserializeDate(e);
      };
      e.serializeValue = function (e) {
        if ((0, c.isString)(e)) {
          return e;
        } else {
          return r.default.serializeDate(e, this.serializationFormat);
        }
      };
    }
    if (t === "number") {
      e.deserializeValue = function (e) {
        var t = parseFloat(e);
        if (isNaN(t)) {
          return e;
        } else {
          return t;
        }
      };
      e.serializeValue = function (e, t) {
        if (t === "filter") {
          return e;
        } else if ((0, c.isDefined)(e) && this.serializationFormat === "string") {
          return e.toString();
        } else {
          return e;
        }
      };
    }
  }
};
exports.getAlignmentByDataType = function (e, t) {
  switch (e) {
    case "number":
      return "right";
    case "boolean":
      return "center";
    default:
      return (0, d.getDefaultAlignment)(t);
  }
};
function S(e) {
  if (e.value === true) {
    return this.trueText || "true";
  } else if (e.value === false) {
    return this.falseText || "false";
  } else {
    return e.valueText || "";
  }
}
exports.customizeTextForBooleanDataType = S;
exports.getCustomizeTextByDataType = function (e) {
  if (e === "boolean") {
    return S;
  }
};
exports.createColumnsFromDataSource = function (e, t) {
  var n;
  for (var i = e._getFirstItems(t), o = {}, a = [], r = 0; r < i.length; r++) {
    if (i[r]) {
      for (n in i[r]) {
        if (!(0, c.isFunction)(i[r][n]) || !!h.default.isWrapped(i[r][n])) {
          o[n] = true;
        }
      }
    }
  }
  for (n in o) {
    if (n.indexOf("__") !== 0) {
      var s = y(e, n);
      a.push(s);
    }
  }
  return a;
};
function k(e) {
  (0, l.each)(e._columns, function (e, t) {
    t.index = e;
  });
  (0, l.each)(e._columns, function (e, t) {
    if ((0, c.isObject)(t.ownerBand)) {
      t.ownerBand = t.ownerBand.index;
    }
  });
  (0, l.each)(e._commandColumns, function (e, t) {
    t.index = -(e + 1);
  });
}
exports.updateColumnIndexes = k;
function D(e, t) {
  (0, i.normalizeIndexes)(e._columns, "groupIndex", t, function (e) {
    var t = e.grouped;
    delete e.grouped;
    return t;
  });
}
exports.updateColumnGroupIndexes = D;
function I(e, t) {
  (0, l.each)(e._columns, function (e, t) {
    if ((0, c.isDefined)(t.sortIndex) && !L(t.sortOrder)) {
      delete t.sortIndex;
    }
  });
  (0, i.normalizeIndexes)(e._columns, "sortIndex", t, function (e) {
    return !(0, c.isDefined)(e.groupIndex) && L(e.sortOrder);
  });
}
exports.updateColumnSortIndexes = I;
function T(e, t) {
  var n;
  var o = [];
  var a = e.getBandColumnsCache();
  var r = [];
  for (var s = e._columns.filter(function (e) {
      return !e.command;
    }), l = 0; l < s.length; l++) {
    n = s[l];
    if (x(l, a.columnParentByIndex).length) {
      r.push(n);
    } else {
      o.push(n);
    }
  }
  (0, i.normalizeIndexes)(r, "visibleIndex", t);
  (0, i.normalizeIndexes)(o, "visibleIndex", t);
}
exports.updateColumnVisibleIndexes = T;
exports.getColumnIndexByVisibleIndex = function (e, t, n) {
  var i;
  var o = (0, c.isObject)(t) ? t.rowIndex : null;
  var a = n === g.GROUP_LOCATION ? e.getGroupColumns() : n === g.COLUMN_CHOOSER_LOCATION ? e.getChooserColumns() : e.getVisibleColumns(o);
  t = (0, c.isObject)(t) ? t.columnIndex : t;
  if ((i = a[t]) && i.type === g.GROUP_COMMAND_COLUMN_NAME) {
    i = e._columns.filter(function (e) {
      return i.type === e.type;
    })[0] || i;
  }
  if (i && (0, c.isDefined)(i.index)) {
    return i.index;
  } else {
    return -1;
  }
};
function E(e, t) {
  return e && t && t.name === (e.name || e.dataField) && (t.dataField === e.dataField || e.name);
}
exports.moveColumnToGroup = function (e, t, n) {
  var i;
  var o = e.getGroupColumns();
  if (n >= 0) {
    for (i = 0; i < o.length; i++) {
      if (o[i].groupIndex >= n) {
        o[i].groupIndex++;
      }
    }
  } else {
    n = 0;
    i = 0;
    for (; i < o.length; i++) {
      n = Math.max(n, o[i].groupIndex + 1);
    }
  }
  return n;
};
exports.applyUserState = function (e) {
  var t;
  var n;
  var i;
  var o = e._columnsUserState;
  var a = e._ignoreColumnOptionNames || [];
  var r = e._columns;
  var s = {};
  var l = [];
  var u = true;
  var d = [];
  function h(e, t) {
    if (t) {
      for (var n = 0; n < g.USER_STATE_FIELD_NAMES.length; n++) {
        var i = g.USER_STATE_FIELD_NAMES[n];
        if (!a.includes(i)) {
          if (i === "dataType") {
            e[i] = e[i] || t[i];
          } else if (g.USER_STATE_FIELD_NAMES_15_1.includes(i)) {
            if (i in t) {
              e[i] = t[i];
            }
          } else {
            if (i === "selectedFilterOperation" && t[i]) {
              e.defaultSelectedFilterOperation = e[i] || null;
            }
            e[i] = t[i];
          }
        }
      }
    }
  }
  function f(e, t) {
    var n = t.name || t.dataField;
    var i = s[n] || 0;
    for (var o = 0; o < e.length; o++) {
      if (E(t, e[o])) {
        if (!i) {
          s[n] = s[n] || 0;
          s[n]++;
          return o;
        }
        i--;
      }
    }
    return -1;
  }
  if (o) {
    for (i = 0; i < r.length; i++) {
      n = f(o, r[i]);
      u = u && n >= 0;
      d.push(n);
    }
    for (i = 0; i < r.length; i++) {
      t = r[i];
      n = d[i];
      if (e._hasUserState || u) {
        h(t, o[n]);
      }
      if (n >= 0 && (0, c.isDefined)(o[n].initialIndex)) {
        l[n] = t;
      } else {
        l.push(t);
      }
    }
    var p = false;
    for (i = 0; i < o.length; i++) {
      var m = o[i];
      if (m.added && f(r, m) < 0) {
        h(t = y(e, m.added), m);
        l.push(t);
        if (m.added.columns) {
          p = true;
        }
      }
    }
    if (p) {
      k(e);
      l = b(e, l);
    }
    P(e, l);
  }
};
function O(e, t) {
  k(e);
  D(e, t);
  I(e, t);
  F(e);
  T(e, t);
}
exports.updateIndexes = O;
function A(e) {
  e.resetColumnsCache();
}
function P(e, t) {
  e._previousColumns = e._columns;
  e._columns = t;
  A(e);
  e.updateColumnDataTypes();
}
exports.resetColumnsCache = A;
function M(e, t, n, i) {
  var o;
  var a = e._columnChanges || {
    optionNames: {
      length: 0
    },
    changeTypes: {
      length: 0
    },
    columnIndex: i
  };
  n = (n = n || "all").split(".")[0];
  var r = a.changeTypes;
  if (t && !r[t]) {
    r[t] = true;
    r.length++;
  }
  var s = a.optionNames;
  if (n && !s[n]) {
    s[n] = true;
    s.length++;
  }
  if (i === undefined || i !== a.columnIndex) {
    if ((0, c.isDefined)(i)) {
      if ((o = a.columnIndices) === null || o === undefined) {
        a.columnIndices = [a.columnIndex];
      }
      a.columnIndices.push(i);
    }
    delete a.columnIndex;
  }
  e._columnChanges = a;
  A(e);
}
exports.updateColumnChanges = M;
exports.fireColumnsChanged = function (e) {
  var t;
  var n = e.option("onColumnsChanging");
  var i = e._columnChanges;
  var o = ["dataField", "lookup", "dataType", "columns"];
  if (e.isInitialized() && !e._updateLockCount && i) {
    if (n) {
      e._updateLockCount++;
      n((0, s.extend)({
        component: e.component
      }, i));
      e._updateLockCount--;
    }
    e._columnChanges = undefined;
    if ((t = i.optionNames) && o.some(function (e) {
      return t[e];
    })) {
      e._reinitAfterLookupChanges = i == null ? undefined : i.optionNames.lookup;
      e.reinit();
      e._reinitAfterLookupChanges = undefined;
    } else {
      e.columnsChanged.fire(i);
    }
  }
};
function R(e, t, n, i) {
  if (n >= 0) {
    if (!(i >= 0)) {
      t.lastSortOrder = t.sortOrder;
    }
  } else {
    var o = e.option("sorting.mode");
    var a = t.lastSortOrder;
    if (o === "single") {
      if (e._columns.some(function (e) {
        return e !== t && (0, c.isDefined)(e.sortIndex);
      })) {
        a = undefined;
      }
    }
    t.sortOrder = a;
  }
}
exports.updateSortOrderWhenGrouping = R;
function B(e, t) {
  var n = t.value;
  var i = t.optionName;
  var o = t.prevValue;
  var a = t.fullOptionName;
  var r = `${a}.${i}`;
  if (!g.IGNORE_COLUMN_OPTION_NAMES[i] && e._skipProcessingColumnsChange !== r) {
    e._skipProcessingColumnsChange = r;
    e.component._notifyOptionChanged(r, n, o);
    e._skipProcessingColumnsChange = false;
  }
}
exports.fireOptionChanged = B;
function L(e) {
  return e === "asc" || e === "desc";
}
exports.columnOptionCore = function (e, t, n, i, r) {
  var s;
  var l;
  var u;
  var d = (0, a.compileGetter)(n);
  var h = t.index;
  if (arguments.length === 3) {
    return d(t, {
      functionsAsIs: true
    });
  }
  var f = d(t, {
    functionsAsIs: true
  });
  if (!(0, o.equalByValue)(f, i, {
    maxDepth: 5
  })) {
    if (n === "groupIndex" || n === "calculateGroupValue") {
      l = "grouping";
      R(e, t, i, f);
    } else {
      l = n === "sortIndex" || n === "sortOrder" || n === "calculateSortValue" ? "sorting" : "columns";
    }
    var p = (0, a.compileSetter)(n);
    p(t, i, {
      functionsAsIs: true
    });
    var m = w(e, t);
    if (g.COLUMN_INDEX_OPTIONS[n]) {
      O(e, t);
      i = d(t);
    }
    if (n === "name" || n === "allowEditing") {
      e._checkColumns();
    }
    if (!(0, c.isDefined)(f) && !(0, c.isDefined)(i) && n.indexOf("buffer") !== 0) {
      r = true;
    }
    if (r) {
      A(e);
    } else {
      if (!g.USER_STATE_FIELD_NAMES.includes(n) && n !== "visibleWidth") {
        s = e.option("columns");
        u = e.getColumnByPath(m, s);
        if ((0, c.isString)(u)) {
          u = s[h] = {
            dataField: u
          };
        }
        if (u && E(u, t)) {
          p(u, i, {
            functionsAsIs: true
          });
        }
      }
      M(e, l, n, h);
    }
    if (m) {
      B(e, {
        fullOptionName: m,
        optionName: n,
        value: i,
        prevValue: f
      });
    }
  }
};
exports.addExpandColumn = function (e) {
  var t = e._getExpandColumnOptions();
  e.addCommandColumn(t);
};
exports.defaultSetCellValue = function (e, t) {
  if (this.dataField) {
    var n = this.dataField.split(".");
    var i = n.length - 1;
    if (this.serializeValue) {
      t = this.serializeValue(t);
    }
    for (var o = 0; o < i; o++) {
      var a = n[o];
      e = e[a] = e[a] || {};
    }
    e[n[i]] = t;
  }
};
exports.getDataColumns = function e(t, n, i) {
  var o = [];
  if (t[n = n || 0]) {
    (0, l.each)(t[n], function (a, r) {
      if (r.ownerBand === i || r.type === g.GROUP_COMMAND_COLUMN_NAME) {
        if (r.isBand && r.colspan) {
          o.push.apply(o, e(t, n + 1, r.index));
        } else if (!r.command || n < 1) {
          o.push(r);
        }
      }
    });
  }
  return o;
};
exports.getRowCount = function (e) {
  var t = 1;
  var n = e.getBandColumnsCache().columnParentByIndex;
  e._columns.forEach(function (e) {
    var i = x(e.index, n);
    var o = i.filter(function (e) {
      return !e.visible;
    });
    if (e.visible && !o.length) {
      t = Math.max(t, i.length + 1);
    }
  });
  return t;
};
function V(e, t) {
  return !!e._columns.filter(function (e) {
    return e.type === t.type;
  }).length;
}
exports.isCustomCommandColumn = V;
exports.getFixedPosition = function (e, t) {
  var n = e.option("rtlEnabled");
  if (t.command && !V(e, t) || !t.fixedPosition) {
    if (n) {
      return "right";
    } else {
      return "left";
    }
  } else {
    return t.fixedPosition;
  }
};
exports.processExpandColumns = function (e, t, n, i) {
  var o;
  var a = this.getRowCount();
  var r = e[i] && e[i].rowspan;
  var u = t.filter(function (e) {
    return e.type === n;
  });
  e.forEach(function (t, i) {
    if (t.type === n) {
      o = i;
      r = e[i + 1] ? e[i + 1].rowspan : a;
    }
  });
  if (r > 1) {
    u = (0, l.map)(u, function (e) {
      return (0, s.extend)({}, e, {
        rowspan: r
      });
    });
  }
  u.unshift.apply(u, (0, c.isDefined)(o) ? [o, 1] : [i, 0]);
  e.splice.apply(e, u);
  return r || 1;
};
exports.digitsCount = function (e) {
  var t;
  for (t = 0; e > 1; t++) {
    e /= 10;
  }
  return t;
};
exports.numberToString = function (e, t) {
  for (var n = e ? e.toString() : "0"; n.length < t;) {
    n = `0${n}`;
  }
  return n;
};
exports.mergeColumns = function (e, t, n, i) {
  var o;
  var a;
  var r = t.slice().map(function (e) {
    return (0, s.extend)({}, e);
  });
  var l = e._isColumnFixing();
  var u = n.slice().map(function (e) {
    return (0, s.extend)({
      fixed: l
    }, e);
  });
  var d = function (e) {
    return n.reduce(function (t, n, o) {
      var a = i && e.type === g.GROUP_COMMAND_COLUMN_NAME ? "expand" : e.type;
      if (n.type === a || n.command === e.command) {
        return o;
      } else {
        return t;
      }
    }, -1);
  };
  var c = function (e) {
    return e.command !== n[a].command;
  };
  for (var h = 0; h < t.length; h++) {
    o = t[h];
    if ((a = o && (o.type || o.command) ? d(o) : -1) >= 0) {
      if (i) {
        r[h] = (0, s.extend)({
          fixed: l
        }, n[a], o);
        if (o.type !== g.GROUP_COMMAND_COLUMN_NAME) {
          u = u.filter(c);
        }
      } else {
        var f = {
          visibleIndex: o.visibleIndex,
          index: o.index,
          headerId: o.headerId,
          allowFixing: o.groupIndex === 0,
          allowReordering: o.groupIndex === 0,
          groupIndex: o.groupIndex
        };
        r[h] = (0, s.extend)({}, o, n[a], o.type === g.GROUP_COMMAND_COLUMN_NAME && f);
      }
    }
  }
  if (t.length && i && u.length) {
    r = r.concat(u);
  }
  return r;
};
exports.isColumnFixed = function (e, t) {
  if ((0, c.isDefined)(t.fixed) || !t.type) {
    return t.fixed;
  } else {
    return e._isColumnFixing();
  }
};
exports.convertOwnerBandToColumnReference = function (e) {
  e.forEach(function (t) {
    if ((0, c.isDefined)(t.ownerBand)) {
      t.ownerBand = e[t.ownerBand];
    }
  });
};
function F(e) {
  e._bandColumnsCache = undefined;
}
exports.resetBandColumnsCache = F;
exports.findColumn = function (e, t) {
  var n;
  var i = (0, c.isString)(t) && t.substr(0, t.indexOf(":"));
  if (t !== undefined) {
    if (i) {
      t = t.substr(i.length + 1);
    }
    if (i) {
      n = e.filter(function (e) {
        return `${e[i]}` === t;
      })[0];
    } else {
      ["index", "name", "dataField", "caption"].some(function (i) {
        return !!(n = e.filter(function (e) {
          return e[i] === t;
        })[0]);
      });
    }
    return n;
  }
};
exports.sortColumns = function (e, t) {
  if (t !== "asc" && t !== "desc") {
    return e;
  }
  var n = t === "asc" ? 1 : -1;
  e.sort(function (e, t) {
    var i = e.caption || "";
    var o = t.caption || "";
    return n * i.localeCompare(o);
  });
  return e;
};
exports.strictParseNumber = function (e, t) {
  var n = f.default.parse(e);
  if ((0, c.isNumeric)(n)) {
    var i = f.default.format(n, t);
    var o = f.default.format(n, "decimal");
    if (i === e || o === e) {
      return n;
    }
  }
};