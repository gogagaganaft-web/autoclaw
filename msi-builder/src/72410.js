exports.default = undefined;
var i = r(require("./9549.js"));
var o = r(require("./68374.js"));
var a = r(require("./68953.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function s(e, t) {
  return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var l = {};
if (i.default) {
  (l = function (e) {
    var t;
    var n;
    function i() {
      return e.apply(this, arguments) || this;
    }
    n = e;
    (t = i).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    s(t, n);
    i.create = function (t) {
      var n = e.create.call(this);
      n.setAttribute("spellcheck", false);
      n.dataset.marker = t.marker;
      n.dataset.mentionValue = t.value;
      n.dataset.id = t.id;
      this.renderContent(n, t);
      return n;
    };
    i.value = function (e) {
      return {
        marker: e.dataset.marker,
        id: e.dataset.id,
        value: e.dataset.mentionValue
      };
    };
    i.renderContent = function (e, t) {
      var n = this._templatesStorage.get({
        editorKey: t.keyInTemplateStorage,
        marker: t.marker
      });
      if (n) {
        n.render({
          model: t,
          container: e
        });
      } else {
        this.baseContentRender(e, t);
      }
    };
    i.baseContentRender = function (e, t) {
      var n = (0, o.default)("<span>").text(t.marker);
      (0, o.default)(e).append(n).append(t.value);
    };
    i.addTemplate = function (e, t) {
      this._templatesStorage.set(e, t);
    };
    i.removeTemplate = function (e) {
      this._templatesStorage.delete(e);
    };
    return i;
  }(i.default.import("blots/embed"))).blotName = "mention";
  l.tagName = "span";
  l.className = "dx-mention";
  l._templatesStorage = new a.default();
}
var u = l;
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;