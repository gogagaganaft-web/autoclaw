function n(e) {
  return (n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function i(e, t) {
  return (i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function o() {
  return (o = Object.assign ? Object.assign.bind() : function (e) {
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
function a(e, t) {
  for (var i = 0; i < t.length; i++) {
    var o = t[i];
    o.enumerable = o.enumerable || false;
    o.configurable = true;
    if ("value" in o) {
      o.writable = true;
    }
    Object.defineProperty(e, (a = o.key, r = undefined, r = function (e, t) {
      if (n(e) !== "object" || e === null) {
        return e;
      }
      var i = e[Symbol.toPrimitive];
      if (i !== undefined) {
        var o = i.call(e, t || "default");
        if (n(o) !== "object") {
          return o;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(a, "string"), n(r) === "symbol" ? r : String(r)), o);
  }
  var a;
  var r;
}
function r(e, t, n) {
  if (t) {
    a(e.prototype, t);
  }
  if (n) {
    a(e, n);
  }
  Object.defineProperty(e, "prototype", {
    writable: false
  });
  return e;
}
exports.getMaxAllowedPosition = exports.getGroupWidth = exports.getCellWidth = exports.getCellHeight = exports.getAllDayHeight = exports.PositionHelper = undefined;
function s(e) {
  var t = e.dateTableCellsMeta;
  var n = t == null ? undefined : t.length;
  if (!n) {
    return {
      width: 0,
      height: 0
    };
  }
  var i = t[n > 1 ? 1 : 0][0];
  return {
    width: i.width,
    height: i.height
  };
}
function l(e) {
  return s(e).height;
}
exports.getCellHeight = l;
function u(e) {
  return s(e).width;
}
exports.getCellWidth = u;
function d(e, t, n) {
  if (!e) {
    return 0;
  }
  if (t) {
    var i = n.dateTableCellsMeta;
    if (i == null ? undefined : i.length) {
      return i[0][0].height;
    } else {
      return 0;
    }
  }
  var o = n.allDayPanelCellsMeta;
  if (o != null && o.length) {
    return o[0].height;
  } else {
    return 0;
  }
}
exports.getAllDayHeight = d;
function c(e, t, n, i) {
  return function (e, t, n, i) {
    var o = i.dateTableCellsMeta[0];
    if (!o) {
      return 0;
    }
    var a = o[t.getLastGroupCellPosition(e).columnIndex];
    if (a) {
      if (n) {
        return a.left;
      } else {
        return a.left + a.width;
      }
    } else {
      return 0;
    }
  }(e || 0, t, n, i);
}
exports.getMaxAllowedPosition = c;
exports.getGroupWidth = function (e, t, n) {
  var i = n.isVirtualScrolling;
  var o = n.rtlEnabled;
  var a = n.DOMMetaData;
  var r = u(a);
  var s = t.getCellCount(n) * r;
  if (i) {
    s = t.groupedDataMap.dateTableGroupedMap[e][0].length * r;
  }
  var l = c(e, t, o, a);
  var d = l[e];
  if (d) {
    s = o ? d - l[e + 1] : e === 0 ? d : d - l[e - 1];
  }
  return s;
};
var h = function () {
  function e(e) {
    this.options = e;
    this.groupStrategy = this.options.isVerticalGrouping ? new f(this.options) : new p(this.options);
  }
  var t = e.prototype;
  t.getHorizontalMax = function (e) {
    var t = this;
    function n(e) {
      return c(e, t.viewDataProvider, t.rtlEnabled, t.DOMMetaData);
    }
    if (this.isGroupedByDate) {
      var i = this.viewDataProvider.getViewPortGroupCount();
      return Math.max(n(e), n(i - 1));
    }
    return n(e);
  };
  t.getResizableStep = function () {
    var e = u(this.DOMMetaData);
    if (this.isGroupedByDate) {
      return this.groupCount * e;
    } else {
      return e;
    }
  };
  t.getVerticalMax = function (e) {
    return this.groupStrategy.getVerticalMax(e);
  };
  t.getOffsetByAllDayPanel = function (e) {
    return this.groupStrategy.getOffsetByAllDayPanel(e);
  };
  t.getGroupTop = function (e) {
    return this.groupStrategy.getGroupTop(e);
  };
  r(e, [{
    key: "viewDataProvider",
    get: function () {
      return this.options.viewDataProvider;
    }
  }, {
    key: "rtlEnabled",
    get: function () {
      return this.options.rtlEnabled;
    }
  }, {
    key: "isGroupedByDate",
    get: function () {
      return this.options.isGroupedByDate;
    }
  }, {
    key: "groupCount",
    get: function () {
      return this.options.groupCount;
    }
  }, {
    key: "DOMMetaData",
    get: function () {
      return this.options.getDOMMetaDataCallback();
    }
  }]);
  return e;
}();
exports.PositionHelper = h;
var f = function () {
  function e(e) {
    this.options = e;
  }
  var t = e.prototype;
  t.getOffsetByAllDayPanel = function (e) {
    var t = e.groupIndex;
    var n = e.supportAllDayRow;
    var i = e.showAllDayPanel;
    var o = 0;
    if (n && i) {
      o = d(i, true, this.DOMMetaData) * (t + 1);
    }
    return o;
  };
  t.getVerticalMax = function (e) {
    var t = this._getMaxAllowedVerticalPosition(o({}, e, {
      viewDataProvider: this.viewDataProvider,
      rtlEnabled: this.rtlEnabled,
      DOMMetaData: this.DOMMetaData
    }));
    return t += this.getOffsetByAllDayPanel(e);
  };
  t.getGroupTop = function (e) {
    var t = e.groupIndex;
    var n = e.showAllDayPanel;
    var i = e.isGroupedAllDayPanel;
    var o = this.viewDataProvider.getRowCountInGroup(t);
    return this._getMaxAllowedVerticalPosition({
      groupIndex: t,
      viewDataProvider: this.viewDataProvider,
      showAllDayPanel: n,
      isGroupedAllDayPanel: i,
      isVerticalGrouping: true,
      DOMMetaData: this.DOMMetaData
    }) - l(this.DOMMetaData) * o;
  };
  t._getAllDayHeight = function (e) {
    return d(e, true, this.DOMMetaData);
  };
  t._getMaxAllowedVerticalPosition = function (e) {
    var t = e.groupIndex;
    var n = e.showAllDayPanel;
    var i = e.isGroupedAllDayPanel;
    var o = this.viewDataProvider.getLastGroupCellPosition(t).rowIndex;
    var a = this.DOMMetaData.dateTableCellsMeta[o];
    if (!a) {
      return 0;
    }
    var r = a[0].top + a[0].height;
    if (i) {
      r -= (t + 1) * this._getAllDayHeight(n);
    }
    return r;
  };
  r(e, [{
    key: "viewDataProvider",
    get: function () {
      return this.options.viewDataProvider;
    }
  }, {
    key: "isGroupedByDate",
    get: function () {
      return this.options.isGroupedByDate;
    }
  }, {
    key: "rtlEnabled",
    get: function () {
      return this.options.rtlEnabled;
    }
  }, {
    key: "groupCount",
    get: function () {
      return this.options.groupCount;
    }
  }, {
    key: "DOMMetaData",
    get: function () {
      return this.options.getDOMMetaDataCallback();
    }
  }]);
  return e;
}();
var p = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  i(t, n);
  var r = a.prototype;
  r.getOffsetByAllDayPanel = function (e) {
    return 0;
  };
  r.getVerticalMax = function (e) {
    var t = e.isVirtualScrolling;
    var n = e.groupIndex;
    var i = t ? n : 0;
    return this._getMaxAllowedVerticalPosition(o({}, e, {
      groupIndex: i
    }));
  };
  r.getGroupTop = function (e) {
    return 0;
  };
  r._getAllDayHeight = function (e) {
    return d(e, false, this.DOMMetaData);
  };
  return a;
}(f);