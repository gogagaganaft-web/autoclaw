exports.default = undefined;
var i;
var o = (i = require("./38377.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
var r = require("./95479.js");
var s = require("./47617.js");
var l = require("./62754.js");
var u = require("./18438.js");
var d = require("./16454.js");
var c = o.default.inherit({
  toArray: function () {
    var e = [];
    for (this.reset(); this.next();) {
      e.push(this.current());
    }
    return e;
  },
  countable: function () {
    return false;
  }
});
var h = c.inherit({
  ctor: function (e) {
    this.array = e;
    this.index = -1;
  },
  next: function () {
    return this.index + 1 < this.array.length && (this.index++, true);
  },
  current: function () {
    return this.array[this.index];
  },
  reset: function () {
    this.index = -1;
  },
  toArray: function () {
    return this.array.slice(0);
  },
  countable: function () {
    return true;
  },
  count: function () {
    return this.array.length;
  }
});
var f = c.inherit({
  ctor: function (e) {
    this.iter = e;
  },
  next: function () {
    return this.iter.next();
  },
  current: function () {
    return this.iter.current();
  },
  reset: function () {
    return this.iter.reset();
  }
});
var p = f.inherit({
  ctor: function (e, t) {
    this.callBase(e);
    this.index = -1;
    this.mapper = t;
  },
  current: function () {
    return this.mapper(this.callBase(), this.index);
  },
  next: function () {
    var e = this.callBase();
    if (e) {
      this.index++;
    }
    return e;
  }
});
var g = c.inherit({
  ctor: function (e, t, n, i) {
    this.langParams = e.langParams;
    if (!(e instanceof p)) {
      (e = new p(e, this._wrap)).langParams = this.langParams;
    }
    this.iter = e;
    this.rules = [{
      getter: t,
      desc: n,
      compare: i,
      langParams: this.langParams
    }];
  },
  thenBy: function (e, t, n) {
    var i = new g(this.sortedIter || this.iter, e, t, n);
    if (!this.sortedIter) {
      i.rules = this.rules.concat(i.rules);
    }
    return i;
  },
  next: function () {
    this._ensureSorted();
    return this.sortedIter.next();
  },
  current: function () {
    this._ensureSorted();
    return this.sortedIter.current();
  },
  reset: function () {
    delete this.sortedIter;
  },
  countable: function () {
    return this.sortedIter || this.iter.countable();
  },
  count: function () {
    if (this.sortedIter) {
      return this.sortedIter.count();
    } else {
      return this.iter.count();
    }
  },
  _ensureSorted: function () {
    var e = this;
    if (!e.sortedIter) {
      (0, r.each)(e.rules, function () {
        this.getter = (0, s.compileGetter)(this.getter);
      });
      e.sortedIter = new p(new h(this.iter.toArray().sort(function (t, n) {
        return e._compare(t, n);
      })), e._unwrap);
    }
  },
  _wrap: function (e, t) {
    return {
      index: t,
      value: e
    };
  },
  _unwrap: function (e) {
    return e.value;
  },
  _getDefaultCompare: function (e) {
    return function (t, n) {
      return function (e, t, n) {
        if ((0, a.isString)(e) && (0, a.isString)(t) && (n != null && n.locale || n != null && n.collatorOptions)) {
          return new Intl.Collator((n == null ? undefined : n.locale) || undefined, (n == null ? undefined : n.collatorOptions) || undefined).compare(e, t);
        } else {
          e = (0, s.toComparable)(e, false, n);
          t = (0, s.toComparable)(t, false, n);
          if (e === null && t !== null) {
            return -1;
          } else if (e !== null && t === null || e === undefined && t !== undefined) {
            return 1;
          } else if (e !== undefined && t === undefined || e < t) {
            return -1;
          } else if (e > t) {
            return 1;
          } else {
            return 0;
          }
        }
      }(t, n, e);
    };
  },
  _compare: function (e, t) {
    var n = e.index;
    var i = t.index;
    if ((e = e.value) === (t = t.value)) {
      return n - i;
    }
    for (var o = 0, a = this.rules.length; o < a; o++) {
      var r = this.rules[o];
      var s = r.getter(e);
      var l = r.getter(t);
      var u = (r.compare || this._getDefaultCompare(r.langParams))(s, l);
      if (u) {
        if (r.desc) {
          return -u;
        } else {
          return u;
        }
      }
    }
    return n - i;
  }
});
var m = function () {
  var e = {};
  function t(t) {
    return (0, s.toComparable)(t, false, e);
  }
  function n(t) {
    var n;
    if ((0, a.isDefined)(t)) {
      if ((n = e) !== null && n !== undefined && n.locale) {
        return t.toLocaleString(e.locale);
      } else {
        return t.toString();
      }
    } else {
      return "";
    }
  }
  function i(e, n, i) {
    return function (o) {
      o = t(e(o));
      var a = function (e) {
        return e === "" || e === 0 || e === false;
      }(n) ? o === n : o == n;
      if (i) {
        a = !a;
      }
      return a;
    };
  }
  return function (o, l) {
    e = l || {};
    if ((0, a.isFunction)(o)) {
      return o;
    } else if ((0, d.isGroupCriterion)(o)) {
      return function (t) {
        var n = [];
        var i = false;
        var o = false;
        (0, r.each)(t, function () {
          if (Array.isArray(this) || (0, a.isFunction)(this)) {
            if (n.length > 1 && i !== o) {
              throw new u.errors.Error("E4019");
            }
            n.push(m(this, e));
            i = o;
            o = true;
          } else {
            o = (0, d.isConjunctiveOperator)(this);
          }
        });
        return function (e) {
          var t = i;
          for (var o = 0; o < n.length; o++) {
            if (n[o](e) !== i) {
              t = !i;
              break;
            }
          }
          return t;
        };
      }(o);
    } else if ((0, d.isUnaryOperation)(o)) {
      return function (t) {
        var n = t[0];
        var i = m(t[1], e);
        if (n === "!") {
          return function (e) {
            return !i(e);
          };
        }
        throw u.errors.Error("E4003", n);
      }(o);
    } else {
      return function (e) {
        e = (0, d.normalizeBinaryCriterion)(e);
        var o = (0, s.compileGetter)(e[0]);
        var a = e[1];
        var r = e[2];
        r = t(r);
        function l(e, n) {
          e = t(o(e));
          return (r != null && e != null || r === e) && n(e, r);
        }
        switch (a.toLowerCase()) {
          case "=":
            return i(o, r);
          case "<>":
            return i(o, r, true);
          case ">":
            return function (e) {
              return l(e, function (e, t) {
                return e > t;
              });
            };
          case "<":
            return function (e) {
              return l(e, function (e, t) {
                return e < t;
              });
            };
          case ">=":
            return function (e) {
              return l(e, function (e, t) {
                return e >= t;
              });
            };
          case "<=":
            return function (e) {
              return l(e, function (e, t) {
                return e <= t;
              });
            };
          case "startswith":
            return function (e) {
              return t(n(o(e))).indexOf(r) === 0;
            };
          case "endswith":
            return function (e) {
              var i = t(n(o(e)));
              var a = n(r);
              if (i.length < a.length) {
                return false;
              }
              var s = i.lastIndexOf(r);
              return s !== -1 && s === i.length - r.length;
            };
          case "contains":
            return function (e) {
              return t(n(o(e))).indexOf(r) > -1;
            };
          case "notcontains":
            return function (e) {
              return t(n(o(e))).indexOf(r) === -1;
            };
        }
        throw u.errors.Error("E4003", a);
      }(o);
    }
  };
}();
var _ = f.inherit({
  ctor: function (e, t) {
    this.callBase(e);
    this.langParams = e.langParams;
    this.criteria = m(t, this.langParams);
  },
  next: function () {
    while (this.iter.next()) {
      if (this.criteria(this.current())) {
        return true;
      }
    }
    return false;
  }
});
var v = c.inherit({
  ctor: function (e, t) {
    this.iter = e;
    this.getter = t;
  },
  next: function () {
    this._ensureGrouped();
    return this.groupedIter.next();
  },
  current: function () {
    this._ensureGrouped();
    return this.groupedIter.current();
  },
  reset: function () {
    delete this.groupedIter;
  },
  countable: function () {
    return !!this.groupedIter;
  },
  count: function () {
    return this.groupedIter.count();
  },
  _ensureGrouped: function () {
    if (!this.groupedIter) {
      var e = {};
      var t = [];
      var n = this.iter;
      var i = (0, s.compileGetter)(this.getter);
      for (n.reset(); n.next();) {
        var o = n.current();
        var a = i(o);
        if (a in e) {
          e[a].push(o);
        } else {
          e[a] = [o];
          t.push(a);
        }
      }
      this.groupedIter = new h((0, r.map)(t, function (t) {
        return {
          key: t,
          items: e[t]
        };
      }));
    }
  }
});
var y = f.inherit({
  ctor: function (e, t) {
    this.callBase(e);
    this.getter = (0, s.compileGetter)(t);
  },
  current: function () {
    return this.getter(this.callBase());
  },
  countable: function () {
    return this.iter.countable();
  },
  count: function () {
    return this.iter.count();
  }
});
var b = f.inherit({
  ctor: function (e, t, n) {
    this.callBase(e);
    this.skip = Math.max(0, t);
    this.take = Math.max(0, n);
    this.pos = 0;
  },
  next: function () {
    if (this.pos >= this.skip + this.take) {
      return false;
    }
    while (this.pos < this.skip && this.iter.next()) {
      this.pos++;
    }
    this.pos++;
    return this.iter.next();
  },
  reset: function () {
    this.callBase();
    this.pos = 0;
  },
  countable: function () {
    return this.iter.countable();
  },
  count: function () {
    return Math.min(this.iter.count() - this.skip, this.take);
  }
});
var x = function e(t, n) {
  n = n || {};
  if (!(t instanceof c)) {
    t = new h(t);
  }
  if (n.langParams) {
    t.langParams = n.langParams;
  }
  function i(e) {
    var t = n.errorHandler;
    if (t) {
      t(e);
    }
    (0, u.handleError)(e);
  }
  function o(e) {
    var n = new l.Deferred().fail(i);
    var o = e.step;
    var a = e.finalize;
    try {
      t.reset();
      var r = "seed" in e ? e.seed : t.next() ? t.current() : NaN;
      while (t.next()) {
        r = o(r, t.current());
      }
      n.resolve(a ? a(r) : r);
    } catch (e) {
      n.reject(e);
    }
    return n.promise();
  }
  function r(e) {
    return o(d.aggregators[e]);
  }
  function f(e) {
    if (!(0, a.isFunction)(e) && !Array.isArray(e)) {
      e = [].slice.call(arguments);
    }
    return m(new y(t, e));
  }
  function p(e) {
    return f((0, s.compileGetter)(e));
  }
  function m(t) {
    return e(t, n);
  }
  return {
    toArray: function () {
      return t.toArray();
    },
    enumerate: function () {
      var e = new l.Deferred().fail(i);
      try {
        e.resolve(t.toArray());
      } catch (t) {
        e.reject(t);
      }
      return e.promise();
    },
    setLangParams: function (e) {
      t.langParams = e;
    },
    sortBy: function (e, n, i) {
      return m(new g(t, e, n, i));
    },
    thenBy: function (e, n, i) {
      if (t instanceof g) {
        return m(t.thenBy(e, n, i));
      }
      throw u.errors.Error("E4004");
    },
    filter: function (e) {
      if (!Array.isArray(e)) {
        e = [].slice.call(arguments);
      }
      return m(new _(t, e));
    },
    slice: function (e, n = Number.MAX_VALUE) {
      return m(new b(t, e, n));
    },
    select: f,
    groupBy: function (e) {
      return m(new v(t, e));
    },
    aggregate: function (e, t, n) {
      return o(arguments.length < 2 ? {
        step: arguments[0]
      } : {
        seed: e,
        step: t,
        finalize: n
      });
    },
    count: function () {
      if (t.countable()) {
        var e = new l.Deferred().fail(i);
        try {
          e.resolve(t.count());
        } catch (t) {
          e.reject(t);
        }
        return e.promise();
      }
      return r("count");
    },
    sum: function (e) {
      if (e) {
        return p(e).sum();
      } else {
        return r("sum");
      }
    },
    min: function (e) {
      if (e) {
        return p(e).min();
      } else {
        return r("min");
      }
    },
    max: function (e) {
      if (e) {
        return p(e).max();
      } else {
        return r("max");
      }
    },
    avg: function (e) {
      if (e) {
        return p(e).avg();
      } else {
        return r("avg");
      }
    }
  };
};
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;