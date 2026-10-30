var i = s(require("./71272.js"));
var o = s(require("./91331.js"));
var a = require("./35608.js");
var r = require("./57421.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if (i.default && i.default.load) {
  if (!i.default.locale()) {
    i.default.load(a.enCldr, r.supplementalCldr);
    i.default.locale("en");
  }
  o.default.inject({
    locale: function (e) {
      if (!e) {
        return i.default.locale().locale;
      }
      i.default.locale(e);
    }
  });
}