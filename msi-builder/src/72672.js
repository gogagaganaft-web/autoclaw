exports.hideWave = h;
exports.render = exports.initConfig = undefined;
exports.showWave = l;
var i;
var o = require("./58664.js");
var a = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
function r(e = {}) {
  var t = e.useHoldAnimation;
  var n = e.waveSizeCoefficient;
  var i = e.isCentered;
  var o = e.wavesNumber;
  return {
    waveSizeCoefficient: n || 2,
    isCentered: i || false,
    wavesNumber: o || 1,
    durations: d(t == null || t)
  };
}
exports.initConfig = r;
exports.render = function (e) {
  var t = r(e);
  return {
    showWave: l.bind(this, t),
    hideWave: h.bind(this, t)
  };
};
function s(e, t) {
  var n = function (e) {
    var t = e.children(".dx-inkripple");
    if (t.length === 0) {
      t = (0, a.default)("<div>").addClass("dx-inkripple").appendTo(e);
    }
    return t;
  }((0, a.default)(e));
  var i = n.children(".dx-inkripple-wave").toArray();
  for (var o = i.length; o < t; o++) {
    var r = (0, a.default)("<div>").appendTo(n).addClass("dx-inkripple-wave");
    i.push(r[0]);
  }
  return (0, a.default)(i);
}
function l(e, t) {
  var n = s(t.element, e.wavesNumber).eq(t.wave || 0);
  if (e.hidingTimeout) {
    clearTimeout(e.hidingTimeout);
  }
  c(n);
  n.css(function (e, t) {
    var n;
    var i;
    var r = (0, a.default)(t.element);
    var s = (0, o.getOuterWidth)(r);
    var l = (0, o.getOuterHeight)(r);
    var u = parseInt(Math.sqrt(s * s + l * l));
    var d = Math.min(4000, parseInt(u * e.waveSizeCoefficient));
    if (e.isCentered) {
      n = (s - d) / 2;
      i = (l - d) / 2;
    } else {
      var c = t.event;
      var h = r.offset();
      n = c.pageX - h.left - d / 2;
      i = c.pageY - h.top - d / 2;
    }
    return {
      left: n,
      top: i,
      height: d,
      width: d
    };
  }(e, t));
  e.showingTimeout = setTimeout(u.bind(this, e, n), 0);
}
function u(e, t) {
  var n = e.durations.showingScale + "ms";
  t.addClass("dx-inkripple-showing").css("transitionDuration", n);
}
function d(e) {
  return {
    showingScale: e ? 1000 : 300,
    hidingScale: 300,
    hidingOpacity: 300
  };
}
function c(e) {
  e.removeClass("dx-inkripple-hiding").css("transitionDuration", "");
}
function h(e, t) {
  if (e.showingTimeout) {
    clearTimeout(e.showingTimeout);
  }
  var n = s(t.element, t.wavesNumber).eq(t.wave || 0);
  var i = e.durations;
  var o = i.hidingScale + "ms, " + i.hidingOpacity + "ms";
  n.addClass("dx-inkripple-hiding").removeClass("dx-inkripple-showing").css("transitionDuration", o);
  var a = Math.max(i.hidingScale, i.hidingOpacity);
  e.hidingTimeout = setTimeout(c.bind(this, n), a);
}