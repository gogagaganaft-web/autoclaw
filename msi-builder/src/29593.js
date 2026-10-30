Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var i;
var o = (i = require("./38377.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./47617.js");
var r = require("./35922.js");
var s = require("./18438.js");
var l = require("./16454.js");
function u(e, t, n, i) {
  var o = 0;
  if (e < t) {
    for (; o < n.items.length; o++) {
      u(e + 1, t, n.items[o], i);
    }
  }
  if (e === t) {
    i(n);
  }
}
function d(e, t) {
  var n;
  if ("map" in e) {
    return e.map(t);
  }
  var i = new Array(e.length);
  for (n in e) {
    i[n] = t(e[n], n);
  }
  return i;
}
function c(e) {
  var t = (0, a.compileGetter)(e.selector);
  var n = !("skipEmptyValues" in e) || e.skipEmptyValues;
  var i = e.aggregator;
  if (typeof i == "string" && !(i = l.aggregators[i])) {
    throw s.errors.Error("E4001", e.aggregator);
  }
  return {
    selector: t,
    aggregator: i,
    skipEmptyValues: n
  };
}
var h = o.default.inherit({
  ctor: function (e) {
    this._data = e.data;
    this._groupLevel = e.groupLevel || 0;
    this._totalAggregates = d(e.totalAggregates || [], c);
    this._groupAggregates = d(e.groupAggregates || [], c);
    this._totals = [];
  },
  calculate: function () {
    if (this._totalAggregates.length) {
      this._calculateTotals(0, {
        items: this._data
      });
    }
    if (this._groupAggregates.length && this._groupLevel > 0) {
      this._calculateGroups({
        items: this._data
      });
    }
  },
  totalAggregates: function () {
    return this._totals;
  },
  _aggregate: function (e, t, n) {
    var i = t.items ? t.items.length : 0;
    for (var o = 0; o < e.length; o++) {
      if (e[o].aggregator !== l.aggregators.count) {
        for (var a = 0; a < i; a++) {
          this._accumulate(o, e[o], n, t.items[a]);
        }
      } else {
        n[o] = (n[o] || 0) + i;
      }
    }
  },
  _calculateTotals: function (e, t) {
    if (e === 0) {
      this._totals = this._seed(this._totalAggregates);
    }
    if (e === this._groupLevel) {
      this._aggregate(this._totalAggregates, t, this._totals);
    } else {
      for (var n = 0; n < t.items.length; n++) {
        this._calculateTotals(e + 1, t.items[n]);
      }
    }
    if (e === 0) {
      this._totals = this._finalize(this._totalAggregates, this._totals);
    }
  },
  _calculateGroups: function (e) {
    var t = this._groupLevel;
    var n = t + 1;
    var i = this._seed.bind(this, this._groupAggregates);
    var o = this._aggregate.bind(this, this._groupAggregates);
    var a = this._finalize.bind(this, this._groupAggregates);
    function r(e) {
      e.aggregates = i(n - 1);
      if (n === t) {
        o(e, e.aggregates);
      } else {
        u(n, t, e, function (t) {
          o(t, e.aggregates);
        });
      }
      e.aggregates = a(e.aggregates);
    }
    while (--n > 0) {
      u(0, n, e, r);
    }
  },
  _seed: function (e, t) {
    return d(e, function (e) {
      var n = e.aggregator;
      if ("seed" in n) {
        if ((0, r.isFunction)(n.seed)) {
          return n.seed(t);
        } else {
          return n.seed;
        }
      } else {
        return NaN;
      }
    });
  },
  _accumulate: function (e, t, n, i) {
    var o;
    var a = t.selector(i);
    var r = t.aggregator;
    if (!t.skipEmptyValues || (o = a) == o && o !== "" && o != null) {
      if (n[e] != n[e]) {
        n[e] = a;
      } else {
        n[e] = r.step(n[e], a);
      }
    }
  },
  _finalize: function (e, t) {
    return d(e, function (e, n) {
      var i = e.aggregator.finalize;
      if (i) {
        return i(t[n]);
      } else {
        return t[n];
      }
    });
  }
});
exports.default = h;