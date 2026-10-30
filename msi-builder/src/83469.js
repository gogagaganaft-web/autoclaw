var i = s(require("./49983.js"));
var o = s(require("./21168.js"));
var a = require("./20576.js");
var r = require("./13306.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = i.default.prototype;
var u = o.default.prototype;
var d = l._handlers;
var c = d.calculateState;
var h = u._buildState;
d.calculateState = function (e) {
  var t = {
    0: c(e)
  };
  d.calculateAdditionalStates(t, e);
  return t;
};
d.calculateAdditionalStates = a.noop;
u.code = 0;
u.statesMap = {
  0: 0
};
u.additionalStates = [];
u._buildState = function (e, t) {
  var n = {
    0: h(e[0], t)
  };
  if (this.additionalStates.length) {
    (function (e, t, n, i) {
      var o;
      var a = i.length;
      for (o = 0; o < a; ++o) {
        e[i[o]] = (0, r.extend)({}, t, n[i[o]]);
      }
    })(n, n[0], e, this.additionalStates);
  }
  return n;
};
u._getState = function () {
  return this.state[this.statesMap[this.code]];
};
u.setState = function (e, t) {
  if (t) {
    this.code |= e;
  } else {
    this.code &= ~e;
  }
  this.ctx.change(["TILES"]);
};