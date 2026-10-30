exports.default = undefined;
var i;
var o = require("./97906.js");
var a = (i = require("./73349.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./58201.js");
var s = require("./35922.js");
var l = require("./80968.js");
var u = require("./58664.js");
var d = require("./61371.js");
var c;
var h = (0, r.getWindow)();
function f(e, t) {
  if (e) {
    if (typeof e == "string") {
      if (e === "body") {
        this[0] = t ? t.body : a.default.getBody();
        this.length = 1;
        return this;
      } else {
        t = t || a.default.getDocument();
        if (e[0] === "<") {
          this[0] = a.default.createElement(e.slice(1, -1), t);
          this.length = 1;
          return this;
        } else {
          [].push.apply(this, a.default.querySelectorAll(t, e));
          return this;
        }
      }
    } else if (a.default.isNode(e) || (0, s.isWindow)(e)) {
      this[0] = e;
      this.length = 1;
      return this;
    } else if (Array.isArray(e)) {
      [].push.apply(this, e);
      return this;
    } else {
      return c(e.toArray ? e.toArray() : [e]);
    }
  } else {
    this.length = 0;
    return this;
  }
}
(c = function (e, t) {
  return new f(e, t);
}).fn = {
  dxRenderer: true
};
f.prototype = c.fn;
function p(e, t) {
  for (var n = 0; n < this.length; n++) {
    var i = c(this[n]);
    i[e].apply(i, t);
  }
  return this;
}
function g(e, t, n) {
  if (n != null && n !== false) {
    a.default.setAttribute(e, t, n);
  } else {
    a.default.removeAttribute(e, t);
  }
}
f.prototype.show = function () {
  return this.toggle(true);
};
f.prototype.hide = function () {
  return this.toggle(false);
};
f.prototype.toggle = function (e) {
  if (this[0]) {
    this.toggleClass("dx-state-invisible", !e);
  }
  return this;
};
f.prototype.attr = function (e, t) {
  if (this.length > 1 && arguments.length > 1) {
    return p.call(this, "attr", arguments);
  }
  if (!this[0]) {
    if ((0, s.isObject)(e) || t !== undefined) {
      return this;
    } else {
      return undefined;
    }
  }
  if (!this[0].getAttribute) {
    return this.prop(e, t);
  }
  if (typeof e == "string" && arguments.length === 1) {
    var n = this[0].getAttribute(e);
    if (n == null) {
      return undefined;
    } else {
      return n;
    }
  }
  if ((0, s.isPlainObject)(e)) {
    for (var i in e) {
      this.attr(i, e[i]);
    }
  } else {
    g(this[0], e, t);
  }
  return this;
};
f.prototype.removeAttr = function (e) {
  if (this[0]) {
    a.default.removeAttribute(this[0], e);
  }
  return this;
};
f.prototype.prop = function (e, t) {
  if (!this[0]) {
    return this;
  }
  if (typeof e == "string" && arguments.length === 1) {
    return this[0][e];
  }
  if ((0, s.isPlainObject)(e)) {
    for (var n in e) {
      this.prop(n, e[n]);
    }
  } else {
    a.default.setProperty(this[0], e, t);
  }
  return this;
};
f.prototype.addClass = function (e) {
  return this.toggleClass(e, true);
};
f.prototype.removeClass = function (e) {
  return this.toggleClass(e, false);
};
f.prototype.hasClass = function (e) {
  if (!this[0] || this[0].className === undefined) {
    return false;
  }
  for (var t = e.split(" "), n = 0; n < t.length; n++) {
    if (this[0].classList) {
      if (this[0].classList.contains(t[n])) {
        return true;
      }
    } else if ((((0, s.isString)(this[0].className) ? this[0].className : a.default.getAttribute(this[0], "class")) || "").split(" ").indexOf(t[n]) >= 0) {
      return true;
    }
  }
  return false;
};
f.prototype.toggleClass = function (e, t) {
  if (this.length > 1) {
    return p.call(this, "toggleClass", arguments);
  }
  if (!this[0] || !e) {
    return this;
  }
  t = t === undefined ? !this.hasClass(e) : t;
  for (var n = e.split(" "), i = 0; i < n.length; i++) {
    a.default.setClass(this[0], n[i], t);
  }
  return this;
};
f.prototype.html = function (e) {
  if (arguments.length) {
    this.empty();
    if (typeof e == "string" && !(0, d.isTablePart)(e) || typeof e == "number") {
      this[0].innerHTML = e;
      return this;
    } else {
      return this.append((0, d.parseHTML)(e));
    }
  } else {
    return this[0].innerHTML;
  }
};
function m(e, t) {
  if (this[0] && e) {
    if (typeof e == "string") {
      e = (0, d.parseHTML)(e);
    } else if (e.nodeType) {
      e = [e];
    } else if ((0, s.isNumeric)(e)) {
      e = [a.default.createTextNode(e)];
    }
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      var o = this[0];
      if (o.tagName === "TABLE" && i.tagName === "TR" && o.tBodies && o.tBodies.length) {
        o = o.tBodies[0];
      }
      a.default.insertElement(o, i.nodeType ? i : i[0], t);
    }
  }
}
function _(e, t) {
  if (this[0] && this[0].style && t !== null && (typeof t != "number" || !isNaN(t))) {
    e = (0, l.styleProp)(e);
    for (var n = 0; n < this.length; n++) {
      this[n].style[e] = (0, l.normalizeStyleProp)(e, t);
    }
  }
}
f.prototype.css = function (e, t) {
  if ((0, s.isString)(e)) {
    if (arguments.length !== 2) {
      if (!this[0]) {
        return;
      }
      e = (0, l.styleProp)(e);
      var n = h.getComputedStyle(this[0])[e] || this[0].style[e];
      if ((0, s.isNumeric)(n)) {
        return n.toString();
      } else {
        return n;
      }
    }
    _.call(this, e, t);
  } else if ((0, s.isPlainObject)(e)) {
    for (var i in e) {
      _.call(this, i, e[i]);
    }
  }
  return this;
};
f.prototype.prepend = function (e) {
  if (arguments.length > 1) {
    for (var t = 0; t < arguments.length; t++) {
      this.prepend(arguments[t]);
    }
    return this;
  }
  m.apply(this, [e, this[0].firstChild]);
  return this;
};
f.prototype.append = function (e) {
  if (arguments.length > 1) {
    for (var t = 0; t < arguments.length; t++) {
      this.append(arguments[t]);
    }
    return this;
  }
  m.apply(this, [e]);
  return this;
};
f.prototype.prependTo = function (e) {
  if (this.length > 1) {
    for (var t = this.length - 1; t >= 0; t--) {
      c(this[t]).prependTo(e);
    }
    return this;
  }
  if ((e = c(e))[0]) {
    a.default.insertElement(e[0], this[0], e[0].firstChild);
  }
  return this;
};
f.prototype.appendTo = function (e) {
  if (this.length > 1) {
    return p.call(this, "appendTo", arguments);
  } else {
    a.default.insertElement(c(e)[0], this[0]);
    return this;
  }
};
f.prototype.insertBefore = function (e) {
  if (e && e[0]) {
    a.default.insertElement(e[0].parentNode, this[0], e[0]);
  }
  return this;
};
f.prototype.insertAfter = function (e) {
  if (e && e[0]) {
    a.default.insertElement(e[0].parentNode, this[0], e[0].nextSibling);
  }
  return this;
};
f.prototype.before = function (e) {
  if (this[0]) {
    a.default.insertElement(this[0].parentNode, e[0], this[0]);
  }
  return this;
};
f.prototype.after = function (e) {
  if (this[0]) {
    a.default.insertElement(this[0].parentNode, e[0], this[0].nextSibling);
  }
  return this;
};
f.prototype.wrap = function (e) {
  if (this[0]) {
    var t = c(e);
    t.insertBefore(this);
    t.append(this);
  }
  return this;
};
f.prototype.wrapInner = function (e) {
  var t = this.contents();
  if (t.length) {
    t.wrap(e);
  } else {
    this.append(e);
  }
  return this;
};
f.prototype.replaceWith = function (e) {
  if (e && e[0]) {
    if (e.is(this)) {
      return this;
    } else {
      e.insertBefore(this);
      this.remove();
      return e;
    }
  }
};
f.prototype.remove = function () {
  if (this.length > 1) {
    return p.call(this, "remove", arguments);
  } else {
    (0, o.cleanDataRecursive)(this[0], true);
    a.default.removeElement(this[0]);
    return this;
  }
};
f.prototype.detach = function () {
  if (this.length > 1) {
    return p.call(this, "detach", arguments);
  } else {
    a.default.removeElement(this[0]);
    return this;
  }
};
f.prototype.empty = function () {
  if (this.length > 1) {
    return p.call(this, "empty", arguments);
  } else {
    (0, o.cleanDataRecursive)(this[0]);
    a.default.setText(this[0], "");
    return this;
  }
};
f.prototype.clone = function () {
  var e = [];
  for (var t = 0; t < this.length; t++) {
    e.push(this[t].cloneNode(true));
  }
  return c(e);
};
f.prototype.text = function (e) {
  if (!arguments.length) {
    var t = "";
    for (var n = 0; n < this.length; n++) {
      t += this[n] && this[n].textContent || "";
    }
    return t;
  }
  var i = (0, s.isFunction)(e) ? e() : e;
  (0, o.cleanDataRecursive)(this[0], false);
  a.default.setText(this[0], (0, s.isDefined)(i) ? i : "");
  return this;
};
f.prototype.val = function (e) {
  if (arguments.length === 1) {
    return this.prop("value", (0, s.isDefined)(e) ? e : "");
  } else {
    return this.prop("value");
  }
};
f.prototype.contents = function () {
  if (!this[0]) {
    return c();
  }
  var e = [];
  e.push.apply(e, this[0].childNodes);
  return c(e);
};
f.prototype.find = function (e) {
  var t = c();
  if (!e) {
    return t;
  }
  var n;
  var i = [];
  if (typeof e == "string") {
    e = e.trim();
    n = 0;
    for (; n < this.length; n++) {
      var o = this[n];
      if (a.default.isElementNode(o)) {
        var r = o.getAttribute("id");
        var s = r || "dx-query-children";
        if (!r) {
          g(o, "id", s);
        }
        var l = (s = "[id='" + s + "'] ") + e.replace(/([^\\])(,)/g, "$1, " + s);
        i.push.apply(i, a.default.querySelectorAll(o, l));
        g(o, "id", r);
      } else if (a.default.isDocument(o) || a.default.isDocumentFragment(o)) {
        i.push.apply(i, a.default.querySelectorAll(o, e));
      }
    }
  } else {
    for (n = 0; n < this.length; n++) {
      e = a.default.isNode(e) ? e : e[0];
      if (this[n] !== e && this[n].contains(e)) {
        i.push(e);
      }
    }
  }
  return t.add(i);
};
function v(e, t) {
  return !(t = t.host ?? t).nodeType || !!t.offsetWidth || !!t.offsetHeight || !!t.getClientRects().length;
}
f.prototype.filter = function (e) {
  if (!e) {
    return c();
  }
  if (e === ":visible") {
    return this.filter(v);
  }
  if (e === ":hidden") {
    return this.filter(function (e, t) {
      return !v(0, t);
    });
  }
  var t = [];
  for (var n = 0; n < this.length; n++) {
    var i = this[n];
    if (a.default.isElementNode(i) && (0, s.type)(e) === "string") {
      if (a.default.elementMatches(i, e)) {
        t.push(i);
      }
    } else if (a.default.isNode(e) || (0, s.isWindow)(e)) {
      if (e === i) {
        t.push(i);
      }
    } else if ((0, s.isFunction)(e)) {
      if (e.call(i, n, i)) {
        t.push(i);
      }
    } else {
      for (var o = 0; o < e.length; o++) {
        if (e[o] === i) {
          t.push(i);
        }
      }
    }
  }
  return c(t);
};
f.prototype.not = function (e) {
  var t = [];
  var n = this.filter(e).toArray();
  for (var i = 0; i < this.length; i++) {
    if (n.indexOf(this[i]) === -1) {
      t.push(this[i]);
    }
  }
  return c(t);
};
f.prototype.is = function (e) {
  return !!this.filter(e).length;
};
f.prototype.children = function (e) {
  var t = [];
  for (var n = 0; n < this.length; n++) {
    for (var i = this[n] ? this[n].childNodes : [], o = 0; o < i.length; o++) {
      if (a.default.isElementNode(i[o])) {
        t.push(i[o]);
      }
    }
  }
  t = c(t);
  if (e) {
    return t.filter(e);
  } else {
    return t;
  }
};
f.prototype.siblings = function () {
  var e = this[0];
  if (!e || !e.parentNode) {
    return c();
  }
  var t = [];
  for (var n = e.parentNode.childNodes || [], i = 0; i < n.length; i++) {
    var o = n[i];
    if (a.default.isElementNode(o) && o !== e) {
      t.push(o);
    }
  }
  return c(t);
};
f.prototype.each = function (e) {
  for (var t = 0; t < this.length && e.call(this[t], t, this[t]) !== false; t++);
};
f.prototype.index = function (e) {
  if (e) {
    e = c(e);
    return this.toArray().indexOf(e[0]);
  } else {
    return this.parent().children().index(this);
  }
};
f.prototype.get = function (e) {
  return this[e < 0 ? this.length + e : e];
};
f.prototype.eq = function (e) {
  e = e < 0 ? this.length + e : e;
  return c(this[e]);
};
f.prototype.first = function () {
  return this.eq(0);
};
f.prototype.last = function () {
  return this.eq(-1);
};
f.prototype.select = function () {
  for (var e = 0; e < this.length; e += 1) {
    if (this[e].select) {
      this[e].select();
    }
  }
  return this;
};
f.prototype.parent = function (e) {
  if (!this[0]) {
    return c();
  }
  var t = c(this[0].parentNode);
  if (!e || t.is(e)) {
    return t;
  } else {
    return c();
  }
};
f.prototype.parents = function (e) {
  var t = [];
  for (var n = this.parent(); n && n[0] && !a.default.isDocument(n[0]);) {
    if (a.default.isElementNode(n[0])) {
      if (!e || !!n.is(e)) {
        t.push(n.get(0));
      }
    }
    n = n.parent();
  }
  return c(t);
};
f.prototype.closest = function (e) {
  if (this.is(e)) {
    return this;
  }
  for (var t = this.parent(); t && t.length;) {
    if (t.is(e)) {
      return t;
    }
    t = t.parent();
  }
  return c();
};
f.prototype.next = function (e) {
  if (!this[0]) {
    return c();
  }
  var t = c(this[0].nextSibling);
  if (!arguments.length) {
    return t;
  }
  while (t && t.length) {
    if (t.is(e)) {
      return t;
    }
    t = t.next();
  }
  return c();
};
f.prototype.prev = function () {
  if (this[0]) {
    return c(this[0].previousSibling);
  } else {
    return c();
  }
};
f.prototype.add = function (e) {
  for (var t = c(e), n = this.toArray(), i = 0; i < t.length; i++) {
    var o = t[i];
    if (n.indexOf(o) === -1) {
      n.push(o);
    }
  }
  return c(n);
};
var y = [];
f.prototype.splice = function () {
  return c(y.splice.apply(this, arguments));
};
f.prototype.slice = function () {
  return c(y.slice.apply(this, arguments));
};
f.prototype.toArray = function () {
  return y.slice.call(this);
};
f.prototype.offset = function () {
  if (this[0]) {
    return (0, u.getOffset)(this[0]);
  }
};
f.prototype.offsetParent = function () {
  if (!this[0]) {
    return c();
  }
  for (var e = c(this[0].offsetParent); e[0] && e.css("position") === "static";) {
    e = c(e[0].offsetParent);
  }
  return e = e[0] ? e : c(a.default.getDocumentElement());
};
f.prototype.position = function () {
  if (this[0]) {
    var e;
    var t = parseFloat(this.css("marginTop"));
    var n = parseFloat(this.css("marginLeft"));
    if (this.css("position") === "fixed") {
      return {
        top: (e = this[0].getBoundingClientRect()).top - t,
        left: e.left - n
      };
    }
    e = this.offset();
    var i = this.offsetParent();
    var o = {
      top: 0,
      left: 0
    };
    if (i[0].nodeName !== "HTML") {
      o = i.offset();
    }
    o = {
      top: o.top + parseFloat(i.css("borderTopWidth")),
      left: o.left + parseFloat(i.css("borderLeftWidth"))
    };
    return {
      top: e.top - o.top - t,
      left: e.left - o.left - n
    };
  }
};
[{
  name: "scrollLeft",
  offsetProp: "pageXOffset",
  scrollWindow: function (e, t) {
    e.scrollTo(t, e.pageYOffset);
  }
}, {
  name: "scrollTop",
  offsetProp: "pageYOffset",
  scrollWindow: function (e, t) {
    e.scrollTo(e.pageXOffset, t);
  }
}].forEach(function (e) {
  var t = e.name;
  f.prototype[t] = function (n) {
    if (this[0]) {
      var i = (0, u.getWindowByElement)(this[0]);
      if (n === undefined) {
        if (i) {
          return i[e.offsetProp];
        } else {
          return this[0][t];
        }
      } else {
        if (i) {
          e.scrollWindow(i, n);
        } else {
          this[0][t] = n;
        }
        return this;
      }
    }
  };
});
f.prototype.data = function (e, t) {
  if (this[0]) {
    if (arguments.length < 2) {
      return o.data.call(c, this[0], e);
    } else {
      o.data.call(c, this[0], e, t);
      return this;
    }
  }
};
f.prototype.removeData = function (e) {
  if (this[0]) {
    (0, o.removeData)(this[0], e);
  }
  return this;
};
function b() {
  return c.apply(this, arguments);
}
Object.defineProperty(b, "fn", {
  enumerable: true,
  configurable: true,
  get: function () {
    return c.fn;
  },
  set: function (e) {
    c.fn = e;
  }
});
var x = {
  set: function (e) {
    c = e;
  },
  get: function () {
    return b;
  }
};
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;