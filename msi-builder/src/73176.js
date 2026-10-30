var i;
exports.default = undefined;
var o = ((i = require("./38377.js")) && i.__esModule ? i : {
  default: i
}).default.inherit({
  ctor: function (e) {
    e &&= String(e);
    this._value = this._normalize(e || this._generate());
  },
  _normalize: function (e) {
    for (e = e.replace(/[^a-f0-9]/gi, "").toLowerCase(); e.length < 32;) {
      e += "0";
    }
    return [e.substr(0, 8), e.substr(8, 4), e.substr(12, 4), e.substr(16, 4), e.substr(20, 12)].join("-");
  },
  _generate: function () {
    var e = "";
    for (var t = 0; t < 32; t++) {
      e += Math.round(Math.random() * 15).toString(16);
    }
    return e;
  },
  toString: function () {
    return this._value;
  },
  valueOf: function () {
    return this._value;
  },
  toJSON: function () {
    return this._value;
  }
});
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;