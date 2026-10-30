exports.default = undefined;
var i = require("./62754.js");
var o = d(require("./73349.js"));
var a = d(require("./83448.js"));
var r = require("./58201.js");
var s = require("./13306.js");
var l = require("./35922.js");
var u = d(require("./20476.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = (0, r.getWindow)();
function h(e) {
  var t = o.default.createElement("script");
  for (var n in e) {
    t[n] = e[n];
  }
  return t;
}
function f(e) {
  e.parentNode.removeChild(e);
}
function p(e) {
  return o.default.getHead().appendChild(e);
}
function g(e) {
  var t = h({
    text: e
  });
  p(t);
  f(t);
}
function m(e, t) {
  var n = e.data;
  var i = typeof n == "string";
  var o = e.url || c.location.href;
  if (!i && !e.cache) {
    (n = n || {})._ = Date.now();
  }
  if (n && !e.upload) {
    if (!i) {
      n = function (e) {
        var t = [];
        for (var n in e) {
          var i = e[n];
          if (i !== undefined) {
            if (i === null) {
              i = "";
            }
            if (typeof i == "function") {
              i = i();
            }
            t.push(encodeURIComponent(n) + "=" + encodeURIComponent(i));
          }
        }
        return t.join("&");
      }(n);
    }
    if (_(e) === "GET") {
      if (n !== "") {
        o += (o.indexOf("?") > -1 ? "&" : "?") + n;
      }
      n = null;
    } else if (t["Content-Type"] && t["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1) {
      n = n.replace(/%20/g, "+");
    }
  }
  return {
    url: o,
    parameters: n
  };
}
function _(e) {
  return (e.method || "GET").toUpperCase();
}
function v(e) {
  var t = e.headers || {};
  t["Content-Type"] = t["Content-Type"] || function (e) {
    var t;
    if (e.data && !e.upload && _(e) !== "GET") {
      t = "application/x-www-form-urlencoded;charset=utf-8";
    }
    return e.contentType || t;
  }(e);
  t.Accept = t.Accept || function (e) {
    var t = e.dataType || "*";
    var n = "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript";
    var i = {
      "*": "*/*",
      text: "text/plain",
      html: "text/html",
      xml: "application/xml, text/xml",
      json: "application/json, text/javascript",
      jsonp: n,
      script: n
    };
    (0, s.extendFromObject)(i, e.accepts, true);
    if (i[t]) {
      return i[t] + (t !== "*" ? ", */*; q=0.01" : "");
    } else {
      return i["*"];
    }
  }(e);
  if (!e.crossDomain && !t["X-Requested-With"]) {
    t["X-Requested-With"] = "XMLHttpRequest";
  }
  return t;
}
var y = (0, u.default)({
  sendRequest: function (e) {
    var t;
    var n = a.default.getXhr();
    var s = new i.Deferred();
    var u = s.promise();
    var d = !(0, l.isDefined)(e.async) || e.async;
    var y = e.dataType;
    var b = e.timeout || 0;
    e.crossDomain = function (e) {
      if (!(0, r.hasWindow)()) {
        return true;
      }
      var t = false;
      var n = o.default.createElement("a");
      var i = o.default.createElement("a");
      n.href = c.location.href;
      try {
        i.href = e;
        i.href = i.href;
        t = n.protocol + "//" + n.host != i.protocol + "//" + i.host;
      } catch (e) {
        t = true;
      }
      return t;
    }(e.url);
    var x = y === "jsonp" || y === "script";
    if (e.cache === undefined) {
      e.cache = !x;
    }
    var w = function (e) {
      if (e.dataType === "jsonp") {
        var t = Math.random().toString().replace(/\D/g, "");
        var n = e.jsonpCallback || "dxCallback" + Date.now() + "_" + t;
        var i = e.jsonp || "callback";
        e.data = e.data || {};
        e.data[i] = n;
        return n;
      }
    }(e);
    var C = v(e);
    var S = m(e, C);
    var k = S.url;
    var D = S.parameters;
    if (w) {
      c[w] = function (e) {
        s.resolve(e, "success", n);
      };
    }
    if (e.crossDomain && x) {
      (function (e) {
        var t = h({
          src: e
        });
        return new Promise(function (e, n) {
          var i = {
            load: e,
            error: n
          };
          function a(e) {
            i[e.type]();
            f(t);
          }
          for (var r in i) {
            o.default.listen(t, r, a);
          }
          p(t);
        });
      })(k).then(function () {
        if (y !== "jsonp") {
          s.resolve(null, "success", n);
        }
      }, function () {
        s.reject(n, "error");
      });
      return u;
    }
    if (e.crossDomain && !("withCredentials" in n)) {
      s.reject(n, "error");
      return u;
    }
    n.open(_(e), k, d, e.username, e.password);
    if (d) {
      n.timeout = b;
      t = function (e, t) {
        return e && setTimeout(function () {
          t.customStatus = "timeout";
          t.abort();
        }, e);
      }(b, n);
    }
    n.onreadystatechange = function (e) {
      var i;
      if (n.readyState === 4) {
        clearTimeout(t);
        if ((i = n.status) >= 200 && i < 300) {
          if (function (e) {
            return e !== 204;
          }(n.status)) {
            (function (e, t, n) {
              var i = function (e) {
                if (e.responseType && e.responseType !== "text" || typeof e.responseText != "string") {
                  return e.response;
                } else {
                  return e.responseText;
                }
              }(t);
              switch (n) {
                case "jsonp":
                  g(i);
                  break;
                case "script":
                  g(i);
                  e.resolve(i, "success", t);
                  break;
                case "json":
                  try {
                    e.resolve(JSON.parse(i), "success", t);
                  } catch (n) {
                    e.reject(t, "parsererror", n);
                  }
                  break;
                default:
                  e.resolve(i, "success", t);
              }
            })(s, n, y);
          } else {
            s.resolve(null, "nocontent", n);
          }
        } else {
          s.reject(n, n.customStatus || "error");
        }
      }
    };
    if (e.upload) {
      n.upload.onprogress = e.upload.onprogress;
      n.upload.onloadstart = e.upload.onloadstart;
      n.upload.onabort = e.upload.onabort;
    }
    if (e.xhrFields) {
      for (var I in e.xhrFields) {
        n[I] = e.xhrFields[I];
      }
    }
    if (e.responseType === "arraybuffer") {
      n.responseType = e.responseType;
    }
    for (var T in C) {
      if (Object.prototype.hasOwnProperty.call(C, T) && (0, l.isDefined)(C[T])) {
        n.setRequestHeader(T, C[T]);
      }
    }
    if (e.beforeSend) {
      e.beforeSend(n);
    }
    n.send(D);
    u.abort = function () {
      n.abort();
    };
    return u;
  }
});
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;