exports.default = undefined;
var i;
var o = (i = require("./28109.js")) && i.__esModule ? i : {
  default: i
};
var a = {
  getDefaultGroups: function () {
    return this._groups ||= {
      general: {
        category: "general",
        title: o.default.format("dxDiagram-categoryGeneral")
      },
      flowchart: {
        category: "flowchart",
        title: o.default.format("dxDiagram-categoryFlowchart")
      },
      orgChart: {
        category: "orgChart",
        title: o.default.format("dxDiagram-categoryOrgChart")
      },
      containers: {
        category: "containers",
        title: o.default.format("dxDiagram-categoryContainers")
      },
      custom: {
        category: "custom",
        title: o.default.format("dxDiagram-categoryCustom")
      }
    };
  },
  getGroups: function (e) {
    var t = this.getDefaultGroups();
    if (e) {
      return e.map(function (e) {
        if (typeof e == "string") {
          return {
            category: e,
            title: t[e] && t[e].title || e
          };
        } else {
          return e;
        }
      }).filter(function (e) {
        return e;
      });
    } else {
      return [t.general, t.flowchart, t.orgChart, t.containers];
    }
  }
};
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;