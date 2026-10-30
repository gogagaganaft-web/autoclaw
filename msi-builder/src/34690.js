exports.default = undefined;
var i = l(require("./68374.js"));
var o = require("./348.js");
var a = l(require("./28109.js"));
var r = l(require("./53749.js"));
var s = require("./58201.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = {
  getConfigurations: function () {
    var e = (0, o.getDiagram)().DiagramCommand;
    return this.dialogList ||= [{
      command: e.InsertShapeImage,
      title: a.default.format("dxDiagram-dialogInsertShapeImageTitle"),
      onGetContent: this.getChangeImageDialogContent
    }, {
      command: e.EditShapeImage,
      title: a.default.format("dxDiagram-dialogEditShapeImageTitle"),
      onGetContent: this.getChangeImageDialogContent
    }];
  },
  getChangeImageDialogContent: function (e) {
    var t = (0, i.default)("<div>");
    e.component._createComponent(t, r.default, {
      selectButtonText: a.default.format("dxDiagram-dialogEditShapeImageSelectButton"),
      accept: "image/*",
      uploadMode: "useForm",
      onValueChanged: function (t) {
        var n = new ((0, s.getWindow)().FileReader)();
        n.onload = function (t) {
          e.component._commandParameter = t.target.result;
        };
        n.readAsDataURL(t.value[0]);
      }
    });
    return t;
  },
  getDialogParameters: function (e) {
    var t = this.getConfigurations().map(function (e) {
      return e.command;
    }).indexOf(e);
    if (t >= 0) {
      return this.getConfigurations()[t];
    } else {
      return null;
    }
  }
};
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;