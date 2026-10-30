exports.Deferred = function () {
  return new l();
};
exports.fromPromise = u;
exports.setStrategy = function (e) {
  l = e.Deferred;
  d = e.when;
};
exports.when = function () {
  return d.apply(this, arguments);
};
var i;
var o = require("./35922.js");
var a = require("./13306.js");
var r = (i = require("./44504.js")) && i.__esModule ? i : {
  default: i
};
var s = [{
  method: "resolve",
  handler: "done",
  state: "resolved"
}, {
  method: "reject",
  handler: "fail",
  state: "rejected"
}, {
  method: "notify",
  handler: "progress"
}];
function l() {
  var e = this;
  this._state = "pending";
  this._promise = {};
  s.forEach(function (t) {
    var n = t.method;
    this[n + "Callbacks"] = (0, r.default)();
    this[n] = function () {
      return this[n + "With"](this._promise, arguments);
    }.bind(this);
    this._promise[t.handler] = function (t) {
      if (!t) {
        return this;
      }
      var i = e[n + "Callbacks"];
      if (i.fired()) {
        t.apply(e[n + "Context"], e[n + "Args"]);
      } else {
        i.add(function (e, n) {
          t.apply(e, n);
        }.bind(this));
      }
      return this;
    };
  }.bind(this));
  this._promise.always = function (e) {
    return this.done(e).fail(e);
  };
  this._promise.catch = function (e) {
    return this.then(null, e);
  };
  this._promise.then = function (e, t) {
    var n = new l();
    ["done", "fail"].forEach(function (i) {
      var a = i === "done" ? e : t;
      this[i](function () {
        if (a) {
          var e = a && a.apply(this, arguments);
          if ((0, o.isDeferred)(e)) {
            e.done(n.resolve).fail(n.reject);
          } else if ((0, o.isPromise)(e)) {
            e.then(n.resolve, n.reject);
          } else {
            n.resolve.apply(this, (0, o.isDefined)(e) ? [e] : arguments);
          }
        } else {
          n[i === "done" ? "resolve" : "reject"].apply(this, arguments);
        }
      });
    }.bind(this));
    return n.promise();
  };
  this._promise.state = function () {
    return e._state;
  };
  this._promise.promise = function (t) {
    if (t) {
      return (0, a.extend)(t, e._promise);
    } else {
      return e._promise;
    }
  };
  this._promise.promise(this);
}
function u(e, t) {
  if ((0, o.isDeferred)(e)) {
    return e;
  }
  if ((0, o.isPromise)(e)) {
    var n = new l();
    e.then(function () {
      n.resolveWith.apply(n, [t].concat([[].slice.call(arguments)]));
    }, function () {
      n.rejectWith.apply(n, [t].concat([[].slice.call(arguments)]));
    });
    return n;
  }
  return new l().resolveWith(t, [e]);
}
s.forEach(function (e) {
  var t = e.method;
  var n = e.state;
  l.prototype[t + "With"] = function (e, i) {
    var o = this[t + "Callbacks"];
    if (this.state() === "pending") {
      this[t + "Args"] = i;
      this[t + "Context"] = e;
      if (n) {
        this._state = n;
      }
      o.fire(e, i);
    }
    return this;
  };
});
function d() {
  if (arguments.length === 1) {
    return u(arguments[0]);
  }
  for (var e = [].slice.call(arguments), t = [], n = 0, i = new l(), a = function (o) {
      return function (a) {
        t[o] = this;
        e[o] = arguments.length > 1 ? [].slice.call(arguments) : a;
        if (++n === e.length) {
          i.resolveWith(t, e);
        }
      };
    }, r = 0; r < e.length; r++) {
    if ((0, o.isDeferred)(e[r])) {
      e[r].promise().done(a(r)).fail(i.reject);
    } else {
      n++;
    }
  }
  if (n === e.length) {
    i.resolveWith(t, e);
  }
  return i.promise();
}