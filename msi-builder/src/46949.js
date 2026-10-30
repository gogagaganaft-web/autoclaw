require("./74872.js");
var i = r(require("./71272.js"));
var o = r(require("./28109.js"));
var a = r(require("./91331.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
require("./71272.js");
if (i.default && i.default.formatMessage) {
  var s = i.default.loadMessages;
  i.default.loadMessages = function (e) {
    o.default.load(e);
  };
  var l = {
    engine: function () {
      return "globalize";
    },
    ctor: function () {
      this.load(this._dictionary);
    },
    load: function (e) {
      this.callBase(e);
      s(e);
    },
    getMessagesByLocales: function () {
      return i.default.cldr.get("globalize-messages");
    },
    getFormatter: function (e, t) {
      var n = t || a.default.locale();
      var i = this._getFormatterBase(e, t);
      i ||= this._formatterByGlobalize(e, t);
      if (!i && n !== "en") {
        i = this.getFormatter(e, "en");
      }
      return i;
    },
    _formatterByGlobalize: function (e, t) {
      var n;
      var o = t && t !== a.default.locale() ? new i.default(t) : i.default;
      if (this._messageLoaded(e, t)) {
        n = o.messageFormatter(e);
      }
      return n;
    },
    _messageLoaded: function (e, t) {
      return !!(t ? new i.default(t).cldr : i.default.locale()).get(["globalize-messages/{bundle}", e]);
    },
    _loadSingle: function (e, t, n) {
      var i = {
        [n]: {}
      };
      i[n][e] = t;
      this.load(i);
    }
  };
  o.default.inject(l);
}