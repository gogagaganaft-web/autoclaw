exports.default = undefined;
var i = s(require("./68374.js"));
var o = s(require("./38377.js"));
var a = require("./95479.js");
var r = require("./9321.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = o.default.inherit({
  ctor: function (e, t, n) {
    this._$element = e;
    this._options = t;
    this._rawData = n;
    (0, r.attachInstanceToElement)(e, this, this._dispose);
    this._render();
  },
  _render: function () {
    var e = (0, i.default)("<div>").addClass("dx-item-content-placeholder");
    this._$element.append(e);
    this._watchers = [];
    this._renderWatchers();
  },
  _renderWatchers: function () {
    this._startWatcher("disabled", this._renderDisabled.bind(this));
    this._startWatcher("visible", this._renderVisible.bind(this));
  },
  _startWatcher: function (e, t) {
    var n = this._rawData;
    var i = this._options.fieldGetter(e);
    var o = function (e, t, n) {
      var i;
      function o(e) {
        if (i !== e) {
          n(e, i);
          i = e;
        }
      }
      return {
        dispose: e(t, o),
        force: function () {
          o(t());
        }
      };
    }(this._options.watchMethod(), function () {
      return i(n);
    }, function (e, n) {
      this._dirty = true;
      t(e, n);
    }.bind(this));
    this._watchers.push(o);
  },
  setDataField: function () {
    this._dirty = false;
    (0, a.each)(this._watchers, function (e, t) {
      t.force();
    });
    if (this._dirty) {
      return true;
    }
  },
  _renderDisabled: function (e, t) {
    this._$element.toggleClass("dx-state-disabled", !!e);
    this._$element.attr("aria-disabled", !!e);
    this._updateOwnerFocus(e);
  },
  _updateOwnerFocus: function (e) {
    var t = this._options.owner;
    if (t && e) {
      t._resetItemFocus(this._$element);
    }
  },
  _renderVisible: function (e, t) {
    this._$element.toggleClass("dx-state-invisible", e !== undefined && !e);
  },
  _dispose: function () {
    (0, a.each)(this._watchers, function (e, t) {
      t.dispose();
    });
  }
});
l.getInstance = function (e) {
  return (0, r.getInstanceByElement)(e, this);
};
var u = l;
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;