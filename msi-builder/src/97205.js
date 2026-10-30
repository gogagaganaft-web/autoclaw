function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.isVerticalGroupingApplied = exports.isHorizontalGroupingApplied = exports.isGroupingByDate = exports.getKeyByGroup = exports.getKeyByDateAndGroup = exports.getIsGroupedAllDayPanel = exports.getGroupCellClasses = exports.addWidthToStyle = exports.addToStyles = exports.addHeightToStyle = undefined;
var o = require("./86237.js");
var a = require("./4799.js");
function r(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (i(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var o = n.call(e, t || "default");
        if (i(o) !== "object") {
          return o;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (i(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
function s() {
  return (s = Object.assign ? Object.assign.bind() : function (e) {
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
exports.getKeyByDateAndGroup = function (e, t) {
  var n = e.getTime();
  if (t) {
    return (n + t).toString();
  } else {
    return n.toString();
  }
};
exports.getKeyByGroup = function (e, t) {
  if (t && e) {
    return e.toString();
  } else {
    return "0";
  }
};
function l(e, t) {
  var n = t ?? {};
  var i = s({}, n);
  e.forEach(function (e) {
    var t = e.attr;
    var o = e.value;
    i[t] = o || n[t];
  });
  return i;
}
exports.addToStyles = l;
exports.addHeightToStyle = function (e, t) {
  var n = e ? `${e}px` : "";
  return l([{
    attr: "height",
    value: n
  }], t);
};
exports.addWidthToStyle = function (e, t) {
  var n = e ? `${e}px` : "";
  return l([{
    attr: "width",
    value: n
  }], t);
};
exports.getGroupCellClasses = function (e = false, t = false, n = "") {
  return (0, o.combineClasses)(r({
    "dx-scheduler-first-group-cell": e,
    "dx-scheduler-last-group-cell": t
  }, n, true));
};
exports.getIsGroupedAllDayPanel = function (e, t) {
  return e && t;
};
exports.isVerticalGroupingApplied = function (e, t) {
  return t === a.VERTICAL_GROUP_ORIENTATION && !!e.length;
};
function u(e, t) {
  return t === a.HORIZONTAL_GROUP_ORIENTATION && !!e.length;
}
exports.isHorizontalGroupingApplied = u;
exports.isGroupingByDate = function (e, t, n) {
  var i = u(e, t);
  return n && i;
};