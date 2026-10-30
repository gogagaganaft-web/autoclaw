exports.default = undefined;
var i = require("./55285.js");
var o = require("./44105.js");
var a = require("./87456.js");
var r = u(require("./73349.js"));
var s = require("./97906.js");
var l = u(require("./20476.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e) {
  var t = e.parentNode;
  if (t) {
    var n = e.nextSibling;
    (0, s.cleanDataRecursive)(e);
    t.$V = e.$V;
    (0, i.render)(null, t);
    t.insertBefore(e, n);
    e.innerHTML = "";
    delete t.$V;
  }
  delete e.$V;
}
var c = (0, l.default)({
  createElement: function (e, t) {
    return (0, a.createElement)(e, t);
  },
  remove: d,
  onAfterRender: function () {
    o.InfernoEffectHost.callEffects();
  },
  onPreRender: function () {
    o.InfernoEffectHost.lock();
  },
  render: function (e, t, n, s) {
    if (s) {
      (0, i.render)((0, a.createElement)(e, t), n);
    } else {
      var l = n.parentNode;
      var u = n == null ? undefined : n.nextSibling;
      var c = r.default.createElement("div");
      c.appendChild(n);
      var h = r.default.createDocumentFragment().appendChild(c);
      if (n.$V) {
        d(n);
      }
      (0, o.hydrate)((0, a.createElement)(e, t), h);
      n.$V = h.$V;
      if (l) {
        l.insertBefore(n, u);
      }
    }
  }
});
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;