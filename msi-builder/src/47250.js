exports.plugin = undefined;
var i = require("./28318.js");
var o = require("./19157.js");
var a = require("./13306.js");
var r = require("./20576.js");
function s(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || u(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function l(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return d(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || u(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function u(e, t) {
  if (e) {
    if (typeof e == "string") {
      return d(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return d(e, t);
    } else {
      return undefined;
    }
  }
}
function d(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function c(e) {
  return (e = (0, o.normalizeEnum)(e)) === "outside" || e !== "inside";
}
function h(e, t, n) {
  if (n) {
    return e - t.height;
  } else {
    return e;
  }
}
function f(e, t, n, i) {
  return {
    x: e[2] + n.horizontalOffset + 5,
    y: h(e[3] + n.verticalOffset, t, i)
  };
}
function p(e, t, n, i) {
  return {
    x: e[0] - t.width - n.horizontalOffset - 5,
    y: h(e[1] + n.verticalOffset, t, i)
  };
}
function g(e, t, n) {
  var i = e[2] - e[0];
  var o = e[7] - e[1];
  return {
    x: e[0] + i / 2 + n.horizontalOffset - t.width / 2,
    y: e[1] + n.verticalOffset + o / 2 - t.height / 2
  };
}
var m = {
  name: "lables",
  init: r.noop,
  dispose: r.noop,
  extenders: {
    _initCore: function () {
      this._labelsGroup = this._renderer.g().attr({
        class: this._rootClassPrefix + "-labels"
      }).append(this._renderer.root);
      this._labels = [];
    },
    _applySize: function () {
      var e;
      var t = this._getOption("label");
      var n = this._getOption("adaptiveLayout");
      var i = this._rect;
      var a = 0;
      var r = i[2] - i[0];
      this._labelRect = i.slice();
      if (this._labels.length && c(t.position)) {
        a = this._labels.map(function (e) {
          e.resetEllipsis();
          return e.getBoundingRect().width;
        }).reduce(function (e, t) {
          return Math.max(e, t);
        }, 0) + t.horizontalOffset + (e = t.position, (e = (0, o.normalizeEnum)(e)) === "outside" ? 5 : e === "inside" ? 0 : 20);
        if (!n.keepLabels && r - a < n.width) {
          this._labels.forEach(function (e) {
            e.draw(false);
          });
        } else {
          if (r - a < n.width) {
            a = (a = r - n.width) > 0 ? a : 0;
          }
          this._labels.forEach(function (e) {
            e.draw(true);
          });
          if (t.horizontalAlignment === "left") {
            i[0] += a;
          } else {
            i[2] -= a;
          }
        }
      } else if ((0, o.normalizeEnum)(this._getOption("resolveLabelOverlapping", true) !== "none")) {
        this._labels.forEach(function (e) {
          return !e.isVisible() && e.draw(true);
        });
      }
    },
    _buildNodes: function () {
      this._createLabels();
    },
    _change_TILING: function () {
      var e;
      var t = this;
      var n = t._getOption("label");
      var i = g;
      var a = t._getOption("inverted", true);
      if (c(n.position)) {
        if ((0, o.normalizeEnum)(n.position) === "outside") {
          i = n.horizontalAlignment === "left" ? p : f;
        } else {
          e = this._defaultLabelTextAlignment();
          i = n.horizontalAlignment === "left" ? function (e, t, n) {
            return function (i, o, a, r) {
              return {
                x: n === "left" ? e[0] : t[0] - o.width - a.horizontalOffset - 20,
                y: h(i[3] + a.verticalOffset, o, r)
              };
            };
          }(this._labelRect, this._rect, e) : function (e, t, n) {
            return function (i, o, a, r) {
              return {
                x: n === "left" ? t[2] + a.horizontalOffset + 20 : e[2] - o.width,
                y: h(i[3] + a.verticalOffset, o, r)
              };
            };
          }(this._labelRect, this._rect, e);
        }
      }
      t._labels.forEach(function (e, o) {
        var r = t._items[o];
        var s = r.getNormalStyle()["stroke-width"];
        var l = a ? s / 2 : -s / 2;
        var u = l ? r.coords.map(function (e, t) {
          if (t === 1 || t === 3) {
            return e - l;
          } else if (t === 2) {
            return e - s;
          } else if (t === 0) {
            return e + s;
          } else {
            return e;
          }
        }) : r.coords;
        if (n.showForZeroValues || r.value !== 0) {
          if (c(n.position)) {
            t._correctLabelWidth(e, r.coords, n);
          }
          var d = e.getBoundingRect();
          var h = function (e, t, n) {
            if (e.x < n[0]) {
              e.x = n[0];
            }
            if (e.x + t.width > n[2]) {
              e.x = n[2] - t.width;
            }
            if (e.y < n[1]) {
              e.y = n[1];
            }
            if (e.y + t.height > n[3]) {
              e.y = n[3] - t.height;
            }
            return e;
          }(i(u, d, n, a), d, t._labelRect);
          e.setFigureToDrawConnector(u);
          e.shift(h.x, h.y);
        } else {
          e.draw(false);
        }
      });
      t._resolveLabelOverlapping();
    }
  },
  members: {
    _resolveLabelOverlapping: function () {
      var e = this;
      var t = (0, o.normalizeEnum)(e._getOption("resolveLabelOverlapping", true));
      var n = this._getOption("inverted", true) ? e._labels.slice().reverse() : e._labels;
      if (t === "hide") {
        n.reduce(function (e, t) {
          if (t.getBoundingRect().y < e) {
            t.hide();
          } else {
            e = t.getBoundingRect().y + t.getBoundingRect().height;
          }
          return e;
        }, 0);
      } else if (t === "shift") {
        var i = this._labelRect[3];
        n.filter(function (e) {
          return e.isVisible();
        }).reduce(function (t, n, o, a) {
          var r = s(t, 2);
          var l = r[0];
          var u = r[1];
          var d = n.getBoundingRect();
          var c = d.y;
          if (d.y < l) {
            n.shift(d.x, l);
            c = l;
          }
          if (c - l > 0) {
            u += c - l;
          }
          if (c + d.height > i) {
            if (u && u > c + d.height - i) {
              (function (e, t, n) {
                e.reduce(function (e, t, i, o) {
                  var a = o[i + 1];
                  if (e > 0) {
                    var r = t.getBoundingRect();
                    var s = a ? a.getBoundingRect().y + a.getBoundingRect().height : n;
                    var l = r.y - s;
                    var u = Math.min(l, e);
                    o.slice(0, i + 1).forEach(function (e) {
                      var t = e.getBoundingRect();
                      e.shift(t.x, t.y - u);
                    });
                    e -= u;
                  }
                  return e;
                }, t);
              })(a.slice(0, o).reverse(), c + d.height - i, e._labelRect[1]);
              u -= c + d.height - i;
              n.shift(d.x, c - (c + d.height - i));
              l = c - (c + d.height - i) + d.height;
            } else {
              n.hide();
            }
          } else {
            l = c + d.height;
          }
          return [l, u];
        }, [this._labelRect[1], 0]);
      }
    },
    _defaultLabelTextAlignment: function () {
      if (this._getOption("rtlEnabled", true)) {
        return "right";
      } else {
        return "left";
      }
    },
    _correctLabelWidth: function (e, t, n) {
      var i = n.horizontalAlignment === "left";
      var o = i ? this._labelRect[0] : t[2];
      var a = (i ? t[0] : this._labelRect[2]) - o;
      if (e.getBoundingRect().width > a) {
        e.fit(a);
      }
    },
    _createLabels: function () {
      var e = this;
      var t = e._getOption("label");
      var n = function (e, t) {
        var n = e.horizontalAlignment === "left";
        var i = n ? 4 : -4;
        var o = t ? -1 : 0;
        function a(e) {
          if (n) {
            return [e[0] + 1, e[1] + o];
          } else {
            return [e[2] - 1, e[3] + o];
          }
        }
        return {
          isLabelInside: function () {
            return !c(e.position);
          },
          getFigureCenter: a,
          prepareLabelPoints: function (e) {
            var t = e.x + i;
            var n = e.y;
            var o = t + e.width;
            return l(Array(e.height + 1)).map(function (e, i) {
              return [t, n + i];
            }).concat(l(Array(e.height + 1)).map(function (e, t) {
              return [o, n + t];
            }));
          },
          isHorizontal: function () {
            return true;
          },
          findFigurePoint: function (e) {
            return a(e);
          },
          adjustPoints: function (e) {
            return e.map(Math.round);
          }
        };
      }(t, e._getOption("inverted", true));
      this._labelsGroup.clear();
      if (t.visible) {
        this._labels = e._items.map(function (r) {
          var s = new i.Label({
            renderer: e._renderer,
            labelsGroup: e._labelsGroup,
            strategy: n
          });
          s.setOptions(function (e, t, n) {
            var i = e || {};
            var r = (0, a.extend)({}, i.font) || {};
            var s = i.border || {};
            var l = i.connector || {};
            var u = {
              fill: i.backgroundColor || t,
              "stroke-width": s.visible && s.width || 0,
              stroke: s.visible && s.width ? s.color : "none",
              dashStyle: s.dashStyle
            };
            var d = {
              stroke: l.visible && l.width ? l.color || t : "none",
              "stroke-width": l.visible && l.width || 0,
              opacity: l.opacity
            };
            r.color = i.backgroundColor === "none" && (0, o.normalizeEnum)(r.color) === "#ffffff" && i.position !== "inside" ? t : r.color;
            return {
              format: i.format,
              textAlignment: i.textAlignment || (c(i.position) ? n : "center"),
              customizeText: i.customizeText,
              attributes: {
                font: r
              },
              visible: r.size !== 0 && i.visible,
              showForZeroValues: i.showForZeroValues,
              horizontalOffset: i.horizontalOffset,
              verticalOffset: i.verticalOffset,
              background: u,
              connector: d,
              wordWrap: e.wordWrap,
              textOverflow: e.textOverflow
            };
          }(t, r.color, e._defaultLabelTextAlignment()));
          s.setData({
            item: r,
            value: r.value,
            percent: r.percent
          });
          s.draw(true);
          return s;
        });
        if (this._labels.length && c(t.position)) {
          this._requestChange(["LAYOUT"]);
        }
      }
    }
  },
  customize: function (e) {
    e.prototype._proxyData.push(function (e, t) {
      var n;
      var i = this;
      i._labels.forEach(function (o, a) {
        var r = o.getBoundingRect();
        if (e >= r.x && e <= r.x + r.width && t >= r.y && t <= r.y + r.height) {
          var s = c(i._getOption("label").position) ? "outside" : "inside";
          n = {
            id: a,
            type: s + "-label"
          };
          return true;
        }
      });
      return n;
    });
    ["label", "resolveLabelOverlapping"].forEach(function (t) {
      e.addChange({
        code: t.toUpperCase(),
        handler: function () {
          this._createLabels();
          this._requestChange(["LAYOUT"]);
        },
        isThemeDependent: true,
        isOptionChange: true,
        option: t
      });
    });
  },
  fontFields: ["label.font"]
};
exports.plugin = m;