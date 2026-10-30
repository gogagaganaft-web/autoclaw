exports.normalizeStoreLoadOptionAccessorArguments = exports.normalizeLoadResult = exports.normalizeDataSourceOptions = exports.mapDataRespectingGrouping = exports.isPending = exports.CANCELED_TOKEN = undefined;
var i = h(require("./37208.js"));
var o = h(require("./67403.js"));
var a = h(require("./26562.js"));
var r = require("./95479.js");
var s = h(require("./88036.js"));
var l = require("./13306.js");
var u = require("./35922.js");
var d = require("./16454.js");
var c = ["items"];
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function f() {
  return (f = Object.assign ? Object.assign.bind() : function (e) {
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
function p(e, t) {
  if (e == null) {
    return {};
  }
  var n;
  var i;
  var o = function (e, t) {
    if (e == null) {
      return {};
    }
    var n;
    var i;
    var o = {};
    var a = Object.keys(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        o[n] = e[n];
      }
    }
    return o;
  }(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        if (Object.prototype.propertyIsEnumerable.call(e, n)) {
          o[n] = e[n];
        }
      }
    }
  }
  return o;
}
exports.CANCELED_TOKEN = "canceled";
exports.isPending = function (e) {
  return e.state() === "pending";
};
exports.normalizeStoreLoadOptionAccessorArguments = function (e) {
  switch (e.length) {
    case 0:
      return;
    case 1:
      return e[0];
  }
  return [].slice.call(e);
};
function g(e, t, n) {
  return (0, r.map)(e, function (e) {
    e.items;
    return f({}, p(e, c), {
      items: m(e.items, t - 1, n)
    });
  });
}
function m(e, t, n) {
  if (Array.isArray(e)) {
    if (t) {
      return g(e, t, n);
    } else {
      return (0, r.map)(e, n);
    }
  } else {
    return e;
  }
}
exports.mapDataRespectingGrouping = function (e, t, n) {
  var i = n ? (0, d.normalizeSortingInfo)(n).length : 0;
  return m(e, i, t);
};
exports.normalizeLoadResult = function (e, t) {
  var n;
  if ((n = e) !== null && n !== undefined && n.data) {
    t = e;
    e = e.data;
  }
  if (!Array.isArray(e)) {
    e = [e];
  }
  return {
    data: e,
    extra: t
  };
};
function _(e, t) {
  return new s.default({
    load: function () {
      return i.default.sendRequest({
        url: e,
        dataType: "json"
      });
    },
    loadMode: t == null ? undefined : t.fromUrlLoadMode
  });
}
exports.normalizeDataSourceOptions = function (e, t) {
  var n;
  var i;
  var d;
  if (typeof e == "string") {
    e = {
      paginate: false,
      store: _(e, t)
    };
  }
  if (e === undefined) {
    e = [];
  }
  if ((e = Array.isArray(e) || e instanceof o.default ? {
    store: e
  } : (0, l.extend)({}, e)).store === undefined) {
    e.store = [];
  }
  n = e.store;
  if ("load" in e) {
    n = function (e) {
      var t = {};
      (0, r.each)(["useDefaultSearch", "key", "load", "loadMode", "cacheRawData", "byKey", "lookup", "totalCount", "insert", "update", "remove"], function () {
        t[this] = e[this];
        delete e[this];
      });
      return new s.default(t);
    }(e);
  } else if (Array.isArray(n)) {
    n = new a.default(n);
  } else if ((0, u.isPlainObject)(n)) {
    i = (0, l.extend)({}, n);
    d = i.type;
    delete i.type;
    n = o.default.create(d, i);
  }
  e.store = n;
  return e;
};