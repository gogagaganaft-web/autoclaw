exports.createEventTrigger = function (e, t) {
  var n;
  var i = {};
  (0, r.each)(e, function (e, t) {
    if (t.name) {
      o(e);
    }
  });
  a.change = function (t) {
    var i = e[t];
    if (i) {
      (n = n || {})[t] = i;
    }
    return !!i;
  };
  a.applyChanges = function () {
    if (n) {
      (0, r.each)(n, function (e, t) {
        o(t.newName || e);
      });
      n = null;
    }
  };
  a.dispose = function () {
    e = t = i = null;
  };
  return a;
  function o(n) {
    var o = e[n];
    i[o.name] = t(n, o.actionSettings);
  }
  function a(e, t, n) {
    i[e](t);
    if (n) {
      n();
    }
  }
};
exports.createIncidentOccurred = undefined;
exports.createResizeHandler = function (e, t, n) {
  var i;
  a = n;
  function o(e, t) {
    var n = function (e, t) {
      var n;
      function i() {
        clearTimeout(n);
        n = setTimeout(e, 100);
      }
      return {
        handler: i,
        dispose: function () {
          clearTimeout(n);
          t(i);
        }
      };
    }(a, t);
    var i = n.handler;
    var o = n.dispose;
    e(i);
    return o;
  }
  var a;
  if ((0, u.normalizeEnum)(t) === "windowonly") {
    i = o(function (e) {
      return s.default.add(e);
    }, function (e) {
      return s.default.remove(e);
    });
  } else if (t === true) {
    i = o(function (t) {
      return l.default.observe(e, t);
    }, function () {
      return l.default.unobserve(e);
    });
  }
  return i;
};
var i = require("./36739.js");
var o = require("./68752.js");
var a = d(require("./80726.js"));
var r = require("./95479.js");
var s = d(require("./55814.js"));
var l = d(require("./91784.js"));
var u = require("./19157.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = a.default.ERROR_MESSAGES;
exports.createIncidentOccurred = function (e, t) {
  return function (n, a) {
    t("incidentOccurred", {
      target: {
        id: n,
        type: n[0] === "E" ? "error" : "warning",
        args: a,
        text: o.format.apply(null, [c[n]].concat(a || [])),
        widget: e,
        version: i.version
      }
    });
  };
};