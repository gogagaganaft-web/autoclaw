exports.default = undefined;
var n = {
  maxOfArray: function (e, t) {
    var n = 0;
    function i(e) {
      return e;
    }
    if (t) {
      i = t;
    }
    for (var o = 0; o < e.length; o++) {
      if (i(e[o]) > n) {
        n = i(e[o]);
      }
    }
    return n;
  }
};
function i(e) {
  var t = [];
  e.forEach(function (e) {
    if (t.indexOf(e[0]) === -1) {
      t.push(e[0]);
    }
    if (t.indexOf(e[1]) === -1) {
      t.push(e[1]);
    }
  });
  return t;
}
function o(e, t) {
  var n = [];
  e.forEach(function (e) {
    if (e[0] === t && n.indexOf(e[1]) === -1) {
      n.push(e[1]);
    }
  });
  return n;
}
function a(e, t) {
  var n = [];
  e.forEach(function (e) {
    if (e[1] === t && n.indexOf(e[0]) === -1) {
      n.push(e[0]);
    }
  });
  return n;
}
var r = {
  struct: {
    _hasCycle: false,
    _sortedList: [],
    hasCycle: function (e) {
      var t = this;
      this._hasCycle = false;
      this._sortedList = [];
      var n = {};
      var o = i(e);
      o.forEach(function (e) {
        n[e] = {
          color: "white"
        };
      });
      o.forEach(function (i) {
        if (n[i].color === "white") {
          t._depthFirstSearch(e, n, i);
        }
      });
      this._sortedList.reverse();
      return this._hasCycle;
    },
    _depthFirstSearch: function (e, t, n) {
      t[n].color = "gray";
      for (var i = o(e, n), r = 0; r < i.length; r++) {
        if (t[i[r]].color === "white") {
          this._depthFirstSearch(e, t, i[r]);
        } else if (t[i[r]].color === "gray") {
          this._hasCycle = true;
        }
      }
      this._sortedList.push({
        name: n,
        lp: null,
        incoming: a(e, n),
        outgoing: o(e, n)
      });
      t[n].color = "black";
    },
    computeLongestPaths: function (e) {
      var t = this._sortedList;
      t.forEach(function (i) {
        var o = a(e, i.name);
        if (o.length === 0) {
          i.lp = 0;
        } else {
          var r = [];
          o.forEach(function (e) {
            r.push(t.filter(function (t) {
              return t.name === e;
            })[0].lp);
          });
          i.lp = n.maxOfArray(r) + 1;
        }
      });
      return this._sortedList;
    }
  },
  routines: n,
  getVertices: i,
  getAdjacentVertices: o,
  getReverseAdjacentVertices: a
};
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;