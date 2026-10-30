var i;
var o = require("./97906.js");
var a = (i = require("./76130.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./58020.js");
var s = require("./45994.js");
if (a.default) {
  var l = a.default.utils.domNodeDisposal.cleanExternalData;
  (0, o.afterCleanData)(function (e) {
    var t;
    for (t = 0; t < e.length; t++) {
      e[t].cleanedByJquery = true;
    }
    for (t = 0; t < e.length; t++) {
      if (!e[t].cleanedByKo) {
        a.default.cleanNode(e[t]);
      }
      delete e[t].cleanedByKo;
    }
    for (t = 0; t < e.length; t++) {
      delete e[t].cleanedByJquery;
    }
  });
  a.default.utils.domNodeDisposal.cleanExternalData = function (e) {
    e.cleanedByKo = true;
    if ((0, s.getClosestNodeWithKoCreation)(e)) {
      if (!e.cleanedByJquery) {
        (0, o.cleanData)([e]);
      }
    }
  };
  o.strategyChanging.add(function (e) {
    if (!!e.fn && (0, r.compare)(e.fn.jquery, [2, 0]) < 0) {
      (0, o.afterCleanData)(function () {});
      a.default.utils.domNodeDisposal.cleanExternalData = l;
    }
  });
}