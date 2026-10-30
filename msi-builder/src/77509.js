exports.renderButtonItem = function (e) {
  var t = e.item;
  var n = e.$parent;
  var i = e.rootElementCssClassList;
  var s = e.validationGroup;
  var l = e.createComponentCallback;
  var u = (0, o.default)("<div>").appendTo(n).addClass(i.join(" ")).addClass("dx-field-button-item").css("textAlign", (d = t.horizontalAlignment, (0, a.isDefined)(d) ? d : "right"));
  var d;
  n.css("justifyContent", function (e) {
    switch (e) {
      case "center":
        return "center";
      case "bottom":
        return "flex-end";
      default:
        return "flex-start";
    }
  }(t.verticalAlignment));
  var c = (0, o.default)("<div>").appendTo(u);
  return {
    $rootElement: u,
    buttonInstance: l(c, "dxButton", (0, r.extend)({
      validationGroup: s
    }, t.buttonOptions))
  };
};
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
var r = require("./13306.js");