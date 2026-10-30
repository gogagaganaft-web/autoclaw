exports.default = undefined;
var i = h(require("./38377.js"));
var o = require("./13306.js");
var a = require("./35922.js");
var r = require("./95479.js");
var s = require("./18438.js");
var l = h(require("./341.js"));
var u = h(require("./63081.js"));
var d = require("./77869.js");
var c = require("./62754.js");
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
require("./54263.js");
var f = i.default.inherit({
  ctor: function (e) {
    var t = this;
    this._requestDispatcher = new u.default(e);
    this._errorHandler = e.errorHandler;
    (0, r.each)(e.entities || [], function (n, i) {
      t[n] = new l.default((0, o.extend)({}, e, {
        url: `${t._requestDispatcher.url}/${encodeURIComponent(i.name || n)}`
      }, i));
    });
  },
  get: function (e, t) {
    return this.invoke(e, t, "GET");
  },
  invoke: function (e, t = {}, n = "POST") {
    n = n.toLowerCase();
    var i;
    var o = new c.Deferred();
    var r = `${this._requestDispatcher.url}/${encodeURIComponent(e)}`;
    if (this.version() === 4) {
      if (n === "get") {
        r = (0, d.formatFunctionInvocationUrl)(r, (0, d.escapeServiceOperationParams)(t, this.version()));
        t = null;
      } else if (n === "post") {
        i = t;
        t = null;
      }
    }
    (0, c.when)(this._requestDispatcher.sendRequest(r, n, (0, d.escapeServiceOperationParams)(t, this.version()), i)).done(function (t) {
      if ((0, a.isPlainObject)(t) && e in t) {
        t = t[e];
      }
      o.resolve(t);
    }).fail(this._errorHandler).fail(s.handleError).fail(o.reject);
    return o.promise();
  },
  objectLink: function (e, t) {
    var n = this[e];
    if (!n) {
      throw s.errors.Error("E4015", e);
    }
    if ((0, a.isDefined)(t)) {
      return {
        __metadata: {
          uri: n._byKeyUrl(t)
        }
      };
    } else {
      return null;
    }
  },
  version: function () {
    return this._requestDispatcher.version;
  }
});
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;