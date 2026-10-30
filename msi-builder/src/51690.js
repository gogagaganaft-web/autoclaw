exports.default = undefined;
var i = s(require("./96687.js"));
var o = s(require("./17381.js"));
var a = s(require("./61189.js"));
var r = require("./60810.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e) {
  var t;
  var n;
  var i = e.offsets;
  var o = e.offsetIndices;
  var a = e.untils;
  return {
    offsetList: i.split("|").map(function (e) {
      return parseInt(e);
    }),
    offsetIndexList: o.split("").map(function (e) {
      return parseInt(e);
    }),
    dateList: (n = a, n.split("|").map(function (e) {
      if (e === "Infinity") {
        return null;
      } else {
        return parseInt(e, 36) * 1000;
      }
    })).map((t = 0, function (e) {
      return t += e;
    }))
  };
}
var u = new (function () {
  function e() {
    this.map = new Map();
  }
  e.prototype.tryGet = function (e) {
    if (!this.map.get(e)) {
      var t = d.getTimezoneById(e);
      if (!t) {
        return false;
      }
      var n = l(t);
      this.map.set(e, n);
    }
    return this.map.get(e);
  };
  return e;
}())();
var d = {
  _tzCache: u,
  _timeZones: a.default.zones,
  getDisplayedTimeZones: function (e) {
    var t = this;
    var n = this._timeZones.map(function (n) {
      var i = l(n);
      var o = t.getUtcOffset(i, e);
      return {
        offset: o,
        title: `(GMT ${t.formatOffset(o)}) ${t.formatId(n.id)}`,
        id: n.id
      };
    });
    return (0, i.default)(n).sortBy("offset").toArray();
  },
  formatOffset: function (e) {
    var t = Math.floor(e);
    var n = e - t;
    return ((0, r.sign)(e) >= 0 ? "+" : "-") + `0${Math.abs(t)}`.slice(-2) + (n > 0 ? `:${n * 60}` : ":00");
  },
  formatId: function (e) {
    return e.split("/").join(" - ").split("_").join(" ");
  },
  getTimezoneById: function (e) {
    if (e) {
      for (var t = this._timeZones, n = 0; n < t.length; n++) {
        if (t[n].id === e) {
          return t[n];
        }
      }
      o.default.log("W0009", e);
    }
  },
  getTimeZoneOffsetById: function (e, t) {
    var n = u.tryGet(e);
    if (n) {
      return this.getUtcOffset(n, t);
    } else {
      return undefined;
    }
  },
  getTimeZoneDeclarationTuple: function (e, t) {
    var n = u.tryGet(e);
    if (n) {
      return this.getTimeZoneDeclarationTupleCore(n, t);
    } else {
      return [];
    }
  },
  getTimeZoneDeclarationTupleCore: function (e, t) {
    var n = e.offsetList;
    var i = e.offsetIndexList;
    for (var o = e.dateList, a = [], r = 0; r < o.length; r++) {
      var s = o[r];
      var l = new Date(s).getFullYear();
      if (l === t) {
        var u = n[i[r + 1]];
        a.push({
          date: s,
          offset: -u / 60
        });
      }
      if (l > t) {
        break;
      }
    }
    return a;
  },
  getUtcOffset: function (e, t) {
    var n = e.offsetList;
    var i = e.offsetIndexList;
    for (var o = e.dateList, a = o.length - 1 - 1; a >= 0 && t < o[a];) {
      a--;
    }
    var r = n[i[a + 1]];
    return -r / 60 || r;
  }
};
var c = d;
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;