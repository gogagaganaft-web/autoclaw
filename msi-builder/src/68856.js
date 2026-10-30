exports.layout = undefined;
var i = a(require("./65538.js"));
var o = a(require("./86547.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var r = {
  _weightPerPixel: null,
  _getCascadeIdx: function (e, t) {
    var n = t.filter(function (t) {
      return t.name === e;
    })[0];
    if (n.outgoing.length > 0) {
      return n.lp;
    } else {
      return i.default.routines.maxOfArray(t.map(function (e) {
        return e.lp;
      }));
    }
  },
  _getInWeightForNode: function (e, t) {
    var n = 0;
    t.forEach(function (t) {
      if (t[1] === e) {
        n += t[2];
      }
    });
    return n;
  },
  _getOutWeightForNode: function (e, t) {
    var n = 0;
    t.forEach(function (t) {
      if (t[0] === e) {
        n += t[2];
      }
    });
    return n;
  },
  _computeCascades: function (e) {
    var t = this;
    var n = i.default.struct.computeLongestPaths(e);
    for (var o = i.default.routines.maxOfArray(n.map(function (e) {
        return e.lp;
      })), a = [], r = 0; r < o + 1; r++) {
      a.push({});
    }
    e.forEach(function (e) {
      var i = a[t._getCascadeIdx(e[0], n)];
      i[e[0]] ||= {
        nodeTitle: e[0]
      };
      if (!(i = a[t._getCascadeIdx(e[1], n)])[e[1]]) {
        i[e[1]] = {
          nodeTitle: e[1]
        };
      }
    });
    a.forEach(function (n) {
      Object.keys(n).forEach(function (i) {
        var o = n[i];
        o.inWeight = t._getInWeightForNode(o.nodeTitle, e);
        o.outWeight = t._getOutWeightForNode(o.nodeTitle, e);
        o.maxWeight = Math.max(o.inWeight, o.outWeight);
      });
    });
    return a;
  },
  _getWeightForCascade: function (e, t) {
    var n = 0;
    var i = e[t];
    Object.keys(i).forEach(function (e) {
      n += Math.max(i[e].inWeight, i[e].outWeight);
    });
    return n;
  },
  _getMaxWeightThroughCascades: function (e) {
    var t = [];
    e.forEach(function (e) {
      var n = 0;
      Object.keys(e).forEach(function (t) {
        var i = e[t];
        n += Math.max(i.inWeight, i.outWeight);
      });
      t.push(n);
    });
    return i.default.routines.maxOfArray(t);
  },
  _computeNodes: function (e, t) {
    var n = this;
    var o = [];
    var a = this._getMaxWeightThroughCascades(e);
    var r = i.default.routines.maxOfArray(e.map(function (e) {
      return Object.keys(e).length;
    }));
    var s = t.nodePadding;
    var l = t.height - s * (r - 1);
    if (l < 0) {
      s = 0;
      l = t.height - s * (r - 1);
    }
    this._weightPerPixel = a / l;
    var u = 0;
    e.forEach(function (i) {
      var r;
      var d = [];
      var c = 0;
      var h = Object.keys(i).length;
      var f = n._getWeightForCascade(e, u) / n._weightPerPixel + s * (h - 1);
      if ((r = Array.isArray(t.nodeAlign) ? u < t.nodeAlign.length ? t.nodeAlign[u] : "center" : t.nodeAlign) === "bottom") {
        c = t.height - f;
      } else if (r === "center") {
        c = (t.height - f) * 0.5;
      }
      c = Math.round(c);
      Object.keys(i).forEach(function (e) {
        i[e].sort = n._sort && Object.prototype.hasOwnProperty.call(n._sort, e) ? n._sort[e] : 1;
      });
      Object.keys(i).sort(function (e, t) {
        return i[e].sort - i[t].sort;
      }).forEach(function (n) {
        var o = i[n];
        var r = Math.floor(l * o.maxWeight / a);
        var h = Math.round(u * t.width / (e.length - 1)) - (u === 0 ? 0 : t.nodeWidth);
        var f = {
          _name: n,
          width: t.nodeWidth,
          height: r,
          x: h + t.x,
          y: c + t.y
        };
        c += r + s;
        d.push(f);
      });
      u++;
      o.push(d);
    });
    return o;
  },
  _findRectByName: function (e, t) {
    for (var n = 0; n < e.length; n++) {
      for (var i = 0; i < e[n].length; i++) {
        if (t === e[n][i]._name) {
          return e[n][i];
        }
      }
    }
    return null;
  },
  _findIndexByName: function (e, t) {
    var n = 0;
    for (var i = 0; i < e.length; i++) {
      for (var o = 0; o < e[i].length; o++) {
        if (t === e[i][o]._name) {
          return n;
        }
        n++;
      }
    }
    return null;
  },
  _computeLinks: function (e, t, n) {
    var i = this;
    var o = {};
    var a = [];
    var r = [];
    n.forEach(function (e) {
      Object.keys(e).forEach(function (e) {
        o[e] = {
          in: 0,
          out: 0
        };
      });
    });
    t.forEach(function (n) {
      n.forEach(function (n) {
        var r = n._name;
        var s = i._findRectByName(t, r);
        var l = e.filter(function (e) {
          return e[0] === r;
        });
        l.forEach(function (e) {
          e.sort = i._findIndexByName(t, e[1]);
        });
        l.sort(function (e, t) {
          return e.sort - t.sort;
        }).forEach(function (e) {
          var n = i._findRectByName(t, e[1]);
          var r = Math.round(e[2] / i._weightPerPixel);
          var l = o[e[0]].out;
          var u = o[e[1]].in;
          var d = o[e[0]].out + r > s.height ? s.height - o[e[0]].out : r;
          var c = o[e[1]].in + r > n.height ? n.height - o[e[1]].in : r;
          a.push({
            from: {
              x: s.x,
              y: s.y + l,
              width: s.width,
              height: d,
              node: s,
              weight: e[2]
            },
            to: {
              x: n.x,
              y: n.y + u,
              width: n.width,
              height: c,
              node: n
            }
          });
          o[e[0]].out += r;
          o[e[1]].in += r;
        });
      });
    });
    a.forEach(function (e) {
      var t = {
        d: i._spline(e.from, e.to),
        _boundingRect: {
          x: e.from.x + e.from.width,
          y: Math.min(e.from.y, e.to.y),
          width: e.to.x - (e.from.x + e.from.width),
          height: Math.max(e.from.x + e.from.height, e.to.y + e.to.height) - Math.min(e.from.y, e.to.y)
        },
        _weight: e.from.weight,
        _from: e.from.node,
        _to: e.to.node
      };
      r.push(t);
    });
    this._fitAllNodesHeight(t, a);
    return r;
  },
  _fitNodeHeight: function (e, t, n) {
    var i = this._findRectByName(t, e);
    var o = 0;
    var a = 0;
    n.forEach(function (t) {
      if (t.from.node._name === e) {
        a += t.from.height;
      }
      if (t.to.node._name === e) {
        o += t.to.height;
      }
    });
    i.height = Math.max(o, a);
  },
  _fitAllNodesHeight: function (e, t) {
    for (var n = 0; n < e.length; n++) {
      for (var i = 0; i < e[n].length; i++) {
        this._fitNodeHeight(e[n][i]._name, e, t);
      }
    }
  },
  _spline: function (e, t) {
    var n = {
      x: e.x + e.width,
      y: e.y
    };
    var i = {
      x: e.x + e.width,
      y: e.y + e.height
    };
    var o = {
      x: t.x,
      y: t.y
    };
    var a = {
      x: t.x,
      y: t.y + t.height
    };
    var r = (o.x - n.x) * 0.3;
    return `M ${n.x} ${n.y} C ${n.x + r} ${n.y} ${o.x - r} ${o.y} ${o.x} ${o.y} L ${a.x} ${a.y} C ${a.x - r} ${a.y} ${i.x + r} ${i.y} ${i.x} ${i.y} Z`;
  },
  computeLayout: function (e, t, n, i) {
    this._sort = t;
    var a = {};
    var r = o.default.validate(e, i);
    if (r) {
      a.error = r;
    } else {
      a.cascades = this._computeCascades(e);
      a.nodes = this._computeNodes(a.cascades, {
        width: n.availableRect.width,
        height: n.availableRect.height,
        x: n.availableRect.x,
        y: n.availableRect.y,
        nodePadding: n.nodePadding,
        nodeWidth: n.nodeWidth,
        nodeAlign: n.nodeAlign
      });
      a.links = this._computeLinks(e, a.nodes, a.cascades);
    }
    return a;
  },
  overlap: function (e, t) {
    return !(t.x > e.x + e.width) && !(t.x + t.width < e.x) && !(t.y >= e.y + e.height) && !(t.y + t.height <= e.y);
  }
};
exports.layout = r;