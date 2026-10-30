Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Sortable = undefined;
var i = p(require("./99393.js"));
var o = p(require("./73349.js"));
var a = p(require("./13046.js"));
var r = p(require("./68374.js"));
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./58664.js");
var d = require("./35922.js");
var c = p(require("./55994.js"));
var h = require("./23174.js");
var f = require("./39611.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g = p(require("./92591.js")).default.getSwatchContainer;
function m(e, t) {
  var n;
  (0, l.each)(t, function () {
    if (function (e, t, n) {
      var i = (0, r.default)(e);
      var o = i.offset();
      if (t >= o.left && t <= o.left + (0, u.getOuterWidth)(i, true) && n >= o.top && n <= o.top + (0, u.getOuterHeight)(i, true)) {
        return true;
      }
    }(this, e.pageX, e.pageY)) {
      n = (0, r.default)(this);
    }
  });
  return n;
}
var _ = a.default.inherit({
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      onChanged: null,
      onDragging: null,
      itemRender: null,
      groupSelector: null,
      itemSelector: ".dx-sort-item",
      itemContainerSelector: ".dx-sortable-old",
      sourceClass: "dx-drag-source",
      dragClass: "dx-drag",
      targetClass: "dx-drag-target",
      direction: "vertical",
      allowDragging: true,
      groupFilter: null,
      useIndicator: false
    });
  },
  _renderItem: function (e, t) {
    var n;
    var i = this.option("itemRender");
    if (i) {
      n = i(e, t);
    } else {
      (n = e.clone()).css({
        width: (0, u.getWidth)(e),
        height: (0, u.getHeight)(e)
      });
    }
    return n;
  },
  _renderIndicator: function (e, t, n, i) {
    var o = (0, u.getOuterHeight)(e, true);
    var a = (0, u.getOuterWidth)(e, true);
    var r = e.offset().top - n.offset().top;
    var s = e.offset().left - n.offset().left;
    this._indicator.css({
      position: "absolute",
      top: i && t ? r + o : r,
      left: i && !t ? s + a : s
    }).toggleClass("dx-position-indicator-horizontal", !t).toggleClass("dx-position-indicator-vertical", !!t).toggleClass("dx-position-indicator-last", !!i).appendTo(n);
    (0, u.setHeight)(this._indicator, "");
    (0, u.setWidth)(this._indicator, "");
    if (t) {
      (0, u.setWidth)(this._indicator, a);
    } else {
      (0, u.setHeight)(this._indicator, o);
    }
  },
  _renderDraggable: function (e) {
    if (this._$draggable) {
      this._$draggable.remove();
    }
    this._$draggable = this._renderItem(e, "drag").addClass(this.option("dragClass")).appendTo(g(e)).css({
      zIndex: 1000000,
      position: "absolute"
    });
  },
  _detachEventHandlers: function () {
    var e = [h.move, h.start, h.end, h.enter, h.leave, h.drop].join(" ");
    c.default.off(this._getEventListener(), (0, f.addNamespace)(e, "dxSortable"), undefined);
  },
  _getItemOffset: function (e, t, n) {
    for (var i = 0; i < t.length; i += 1) {
      var o = undefined;
      var a = n.pageY < t[i].posVertical;
      if (e) {
        o = a;
      } else if (a) {
        r = n.pageX;
        s = t[i];
        l = this.option("rtlEnabled");
        if (!(o = !(0, d.isDefined)(s.posHorizontal) || (l ? r > s.posHorizontal : r < s.posHorizontal)) && t[i + 1] && t[i + 1].posVertical > t[i].posVertical) {
          o = true;
        }
      }
      if (o) {
        return t[i];
      }
    }
    var r;
    var s;
    var l;
  },
  _getEventListener: function () {
    var e = this.option("groupSelector");
    var t = this.$element();
    if (e) {
      return t.find(e);
    } else {
      return t;
    }
  },
  _attachEventHandlers: function () {
    var e;
    var t;
    var n;
    var i;
    var a;
    var s;
    var d;
    var p = this;
    var g = p.option("itemSelector");
    var _ = p.option("itemContainerSelector");
    var v = p.option("groupSelector");
    var y = p.option("sourceClass");
    var b = p.option("targetClass");
    var x = p.option("onDragging");
    var w = p.option("groupFilter");
    var C = p.$element();
    var S = null;
    var k = -1;
    function D() {
      if (S != null) {
        S.dispose();
      }
      S = null;
    }
    p._detachEventHandlers();
    if (p.option("allowDragging")) {
      var I = p._getEventListener();
      c.default.on(I, (0, f.addNamespace)(h.start, "dxSortable"), g, function (i) {
        var u;
        var c;
        var h;
        var f;
        var m = (e = (0, r.default)(i.currentTarget)).closest(v);
        s = m.attr("group");
        u = (v ? m : C).find(g);
        c = -1;
        h = e.get(0);
        (0, l.each)(u, function (e, t) {
          var n = (0, r.default)(t);
          if (!n.attr("item-group") || n.attr("item-group") !== u.eq(e - 1).attr("item-group")) {
            c += 1;
          }
          if (t === h) {
            return false;
          }
        });
        t = c === u.length ? -1 : c;
        if (e.attr("item-group")) {
          e = m.find(`[item-group='${e.attr("item-group")}']`);
        }
        p._renderDraggable(e);
        n = p._renderItem(e, "target").addClass(b);
        e.addClass(y);
        a = [];
        (0, l.each)(e, function (e, t) {
          a.push((0, r.default)(t).offset());
        });
        f = o.default.getRootNode(p.$element().get(0));
        d = v ? w ? (0, r.default)(f).find(v).filter(w) : C.find(v) : C;
        p._indicator = (0, r.default)("<div>").addClass("dx-position-indicator");
      });
      c.default.on(I, (0, f.addNamespace)(h.move, "dxSortable"), function (o) {
        var c;
        var h;
        var f;
        var v;
        if (e) {
          k = -1;
          p._indicator.detach();
          (0, l.each)(p._$draggable, function (e, t) {
            (0, r.default)(t).css({
              top: a[e].top + o.offset.y,
              left: a[e].left + o.offset.x
            });
          });
          if (i) {
            i.removeClass(b);
          }
          if (i = m(o, d)) {
            v = {
              sourceGroup: s,
              sourceIndex: t,
              sourceElement: e,
              targetGroup: i.attr("group"),
              targetIndex: i.find(g).index(n)
            };
            if (x) {
              x(v);
            }
            if (v.cancel) {
              i = undefined;
            }
          }
          if (i && S && i.get(0) !== S.element().get(0)) {
            D();
          }
          if (S) {
            S.moveIfNeed(o);
          }
          if (i) {
            if (!S && i.attr("allow-scrolling")) {
              S = function (e) {
                var t;
                var n = e.scrollTop();
                var i = e.$element();
                var o = i.offset().top;
                var a = (0, u.getHeight)(i);
                var r = 0;
                function s(e) {
                  n = e.scrollOffset.top;
                }
                function l() {
                  d();
                  e.scrollTo(n += r);
                  t = setTimeout(l, 10);
                }
                function d() {
                  clearTimeout(t);
                }
                e.on("scroll", s);
                return {
                  moveIfNeed: function (e) {
                    if (e.pageY <= o + 20) {
                      r = -2;
                    } else {
                      if (!(e.pageY >= o + a - 20)) {
                        r = 0;
                        d();
                        return;
                      }
                      r = 2;
                    }
                    l();
                  },
                  element: function () {
                    return i;
                  },
                  dispose: function () {
                    d();
                    e.off("scroll", s);
                  }
                };
              }(i.dxScrollable("instance"));
            }
            i.addClass(b);
            var w = i.find(_);
            var C = w.find(g);
            var I = i.closest(`.dx-sortable-old`).data("dxSortableOld");
            var T = I.option("useIndicator");
            var E = (I || p).option("direction") === "vertical";
            var O = function (e, t, n) {
              var i = [];
              for (var o = [], a = 0; a < e.length; a += o.length) {
                if ((o = e.eq(a)).attr("item-group")) {
                  o = n.find(`[item-group='${o.attr("item-group")}']`);
                }
                if (o.is(":visible")) {
                  var r = {
                    item: o,
                    index: i.length,
                    posVertical: t ? (o.last().offset().top + o.offset().top + (0, u.getOuterHeight)(o.last(), true)) / 2 : (0, u.getOuterHeight)(o.last(), true) + o.last().offset().top,
                    posHorizontal: t ? undefined : ((0, u.getOuterWidth)(o.last(), true) + o.last().offset().left + o.offset().left) / 2
                  };
                  i.push(r);
                }
              }
              return i;
            }(C, E, w);
            var A = p._getItemOffset(E, O, o);
            if (A) {
              c = A.item;
              f = O[A.index - 1] && O[A.index - 1].item;
              if (c.hasClass(y) || f && f.hasClass(y) && f.is(":visible")) {
                n.detach();
                return;
              }
              k = A.index;
              if (!T) {
                n.insertBefore(c);
                return;
              }
              var P = i.attr("group") !== s;
              var M = k === t;
              var R = k === t + 1;
              if (P) {
                p._renderIndicator(c, E, i, p.option("rtlEnabled") && !E);
                return;
              }
              if (!M && !R) {
                p._renderIndicator(c, E, i, p.option("rtlEnabled") && !E);
              }
            } else {
              if ((h = C.last()).is(":visible") && h.hasClass(y)) {
                return;
              }
              if (w.length) {
                k = O.length ? O[O.length - 1].index + 1 : 0;
              }
              if (T) {
                if (C.length) {
                  p._renderIndicator(h, E, i, !p.option("rtlEnabled") || E);
                }
              } else {
                n.appendTo(w);
              }
            }
          } else {
            n.detach();
          }
        }
      });
      c.default.on(I, (0, f.addNamespace)(h.end, "dxSortable"), function () {
        D();
        if (e) {
          var o = p.option("onChanged");
          var a = {
            sourceIndex: t,
            sourceElement: e,
            sourceGroup: s,
            targetIndex: k,
            removeSourceElement: true,
            removeTargetElement: false,
            removeSourceClass: true
          };
          if (i) {
            i.removeClass(b);
            a.targetGroup = i.attr("group");
            if (s !== a.targetGroup || k > -1) {
              if (o) {
                o(a);
              }
              if (a.removeSourceElement) {
                e.remove();
              }
            }
          }
          p._indicator.detach();
          if (a.removeSourceClass) {
            e.removeClass(y);
          }
          e = null;
          p._$draggable.remove();
          p._$draggable = null;
          if (a.removeTargetElement) {
            n.remove();
          }
          n.removeClass(b);
          n = null;
        }
      });
    }
  },
  _init: function () {
    this.callBase();
    this._attachEventHandlers();
  },
  _render: function () {
    this.callBase();
    this.$element().addClass("dx-sortable-old");
  },
  _dispose: function () {
    var e = this;
    e.callBase.apply(e, arguments);
    if (e._$draggable) {
      e._$draggable.detach();
    }
    if (e._indicator) {
      e._indicator.detach();
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "onDragging":
      case "onChanged":
      case "itemRender":
      case "groupSelector":
      case "itemSelector":
      case "itemContainerSelector":
      case "sourceClass":
      case "targetClass":
      case "dragClass":
      case "allowDragging":
      case "groupFilter":
      case "useIndicator":
        this._attachEventHandlers();
        break;
      case "direction":
        break;
      default:
        this.callBase(e);
    }
  },
  _useTemplates: function () {
    return false;
  }
});
exports.Sortable = _;
(0, i.default)("dxSortableOld", _);
var v = {
  Sortable: _
};
exports.default = v;