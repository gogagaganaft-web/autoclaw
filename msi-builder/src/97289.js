exports.default = undefined;
var i = d(require("./99393.js"));
var o = d(require("./55994.js"));
var a = require("./20576.js");
var r = require("./13306.js");
var s = require("./95479.js");
var l = d(require("./90964.js"));
var u = d(require("./11050.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = u.default.inherit({
  _getDefaultOptions: function () {
    return (0, r.extend)(this.callBase(), {
      focusStateEnabled: false,
      noDataText: null
    });
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, r.extend)(this._optionsByReference, {
      validationGroup: true
    });
  },
  _init: function () {
    this.callBase();
    this._initGroupRegistration();
  },
  _initGroupRegistration: function () {
    var e = this.$element();
    var t = this.option("validationGroup") || l.default.findGroup(e, this._modelByElement(e));
    var n = l.default.addGroup(t);
    this._unsubscribeGroup();
    this._groupWasInit = true;
    this._validationGroup = t;
    this.groupSubscription = this._groupValidationHandler.bind(this);
    n.on("validated", this.groupSubscription);
  },
  _unsubscribeGroup: function () {
    var e = l.default.getGroupConfig(this._validationGroup);
    if (e) {
      e.off("validated", this.groupSubscription);
    }
  },
  _getOrderedItems: function (e, t) {
    var n = [];
    (0, s.each)(e, function (e, i) {
      var o = (0, a.grep)(t, function (e) {
        if (e.validator === i) {
          return true;
        }
      });
      if (o.length) {
        n = n.concat(o);
      }
    });
    return n;
  },
  _groupValidationHandler: function (e) {
    var t = this;
    var n = this._getOrderedItems(e.validators, (0, s.map)(e.brokenRules, function (e) {
      return {
        text: e.message,
        validator: e.validator,
        index: e.index
      };
    }));
    this.validators = e.validators;
    (0, s.each)(this.validators, function (e, n) {
      if (n._validationSummary !== t) {
        var i = t._itemValidationHandler.bind(t);
        n.on("validated", i);
        n.on("disposing", function () {
          n.off("validated", i);
          n._validationSummary = null;
          i = null;
        });
        n._validationSummary = t;
      }
    });
    this.option("items", n);
  },
  _itemValidationHandler: function (e) {
    var t = e.isValid;
    var n = e.validator;
    var i = e.brokenRules;
    for (var o = this.option("items"), r = false, l = 0, u = function () {
        var e = o[l];
        if (e.validator === n) {
          var s = (0, a.grep)(i || [], function (t) {
            return t.index === e.index;
          })[0];
          if (t || !s) {
            o.splice(l, 1);
            r = true;
            return "continue";
          }
          if (s.message !== e.text) {
            e.text = s.message;
            r = true;
          }
        }
        l++;
      }; l < o.length;) {
      u();
    }
    (0, s.each)(i, function (e, t) {
      if (!(0, a.grep)(o, function (e) {
        return e.validator === n && e.index === t.index;
      })[0]) {
        o.push({
          text: t.message,
          validator: n,
          index: t.index
        });
        r = true;
      }
    });
    if (r) {
      o = this._getOrderedItems(this.validators, o);
      this.option("items", o);
    }
  },
  _initMarkup: function () {
    this.$element().addClass("dx-validationsummary");
    this.callBase();
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "validationGroup":
        this._initGroupRegistration();
        break;
      default:
        this.callBase(e);
    }
  },
  _itemClass: function () {
    return "dx-validationsummary-item";
  },
  _itemDataKey: function () {
    return "dx-validationsummary-item-data";
  },
  _postprocessRenderItem: function (e) {
    o.default.on(e.itemElement, "click", function () {
      if (e.itemData.validator && e.itemData.validator.focus) {
        e.itemData.validator.focus();
      }
    });
  },
  _dispose: function () {
    this.callBase();
    this._unsubscribeGroup();
  },
  refreshValidationGroup: function () {
    this._initGroupRegistration();
  }
});
(0, i.default)("dxValidationSummary", c);
var h = c;
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;