exports.afterCleanData = function (e) {
  c = e;
};
exports.beforeCleanData = function (e) {
  d = e;
};
exports.cleanData = function (e) {
  return s.cleanData.call(this, e);
};
exports.cleanDataRecursive = function (e, t) {
  if (!i.default.isElementNode(e)) {
    return;
  }
  var n = e.getElementsByTagName("*");
  s.cleanData(n);
  if (t) {
    s.cleanData([e]);
  }
};
exports.data = function () {
  return s.data.apply(this, arguments);
};
exports.getDataStrategy = function () {
  return s;
};
exports.removeData = function (e, t) {
  return s.removeData.call(this, e, t);
};
exports.strategyChanging = exports.setDataStrategy = undefined;
var i = r(require("./73349.js"));
var o = r(require("./55994.js"));
var a = r(require("./83358.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var s;
var l = new WeakMap();
var u = new a.default();
exports.strategyChanging = u;
function d() {}
function c() {}
function h(e) {
  u.fire(e);
  var t = (s = e).cleanData;
  s.cleanData = function (e) {
    d(e);
    var n = t.call(this, e);
    c(e);
    return n;
  };
}
exports.setDataStrategy = h;
h({
  data: function () {
    var e = arguments[0];
    var t = arguments[1];
    var n = arguments[2];
    if (e) {
      var i = l.get(e);
      if (!i) {
        i = {};
        l.set(e, i);
      }
      if (t === undefined) {
        return i;
      } else if (arguments.length === 2) {
        return i[t];
      } else {
        i[t] = n;
        return n;
      }
    }
  },
  removeData: function (e, t) {
    if (e) {
      if (t === undefined) {
        l.delete(e);
      } else {
        var n = l.get(e);
        if (n) {
          delete n[t];
        }
      }
    }
  },
  cleanData: function (e) {
    for (var t = 0; t < e.length; t++) {
      o.default.off(e[t]);
      l.delete(e[t]);
    }
  }
});