exports.default = undefined;
var i;
var o = (i = require("./11050.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./62754.js");
var r = require("./20576.js");
var s = o.default.inherit({
  _initMarkup: function () {
    this._deferredItems = [];
    this.callBase();
  },
  _renderItemContent: function (e) {
    var t = new a.Deferred();
    var n = new a.Deferred();
    this._deferredItems[e.index] = n;
    var i = this.callBase.call(this, e);
    n.done(function () {
      t.resolve(i);
    });
    return t.promise();
  },
  _onItemTemplateRendered: function (e, t) {
    var n = this;
    return function () {
      n._deferredItems[t.index].resolve();
    };
  },
  _postProcessRenderItems: r.noop,
  _renderItemsAsync: function () {
    var e = this;
    var t = new a.Deferred();
    a.when.apply(this, this._deferredItems).done(function () {
      e._postProcessRenderItems();
      t.resolve();
    });
    return t.promise();
  },
  _clean: function () {
    this.callBase();
    this._deferredItems = [];
  }
});
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;