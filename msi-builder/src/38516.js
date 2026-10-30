exports.setTooltipCustomOptions = function (e) {
  e.prototype._setTooltipOptions = function () {
    var e;
    var t;
    var n = this._tooltip;
    var o = n && this._getOption("tooltip");
    if (o.linkTooltipTemplate) {
      e = this._getTemplate(o.linkTooltipTemplate);
    }
    if (o.nodeTooltipTemplate) {
      t = this._getTemplate(o.nodeTooltipTemplate);
    }
    if (n) {
      n.update((0, i.extend)({}, o, {
        customizeTooltip: function (i) {
          if ((!e || i.type !== "link") && (!t || i.type !== "node")) {
            i.skipTemplate = true;
          }
          function r(e) {
            return n.formatValue(e);
          }
          if (i.type === "node") {
            return a(o.customizeNodeTooltip, function (e) {
              return function (t) {
                return {
                  html: `<strong>${t.label}</strong><br/>Incoming weight: ${e(t.weightIn)}<br/>Outgoing weight: ${e(t.weightOut)}`
                };
              };
            }(r))(i.info);
          } else if (i.type === "link") {
            return a(o.customizeLinkTooltip, function (e) {
              return function (t) {
                return {
                  html: `<strong>${t.source} > ${t.target}</strong><br/>Weight: ${e(t.weight)}`
                };
              };
            }(r))(i.info);
          } else {
            return {};
          }
        },
        contentTemplate: function (n, i) {
          var o = {
            model: n.info,
            container: i
          };
          if (e && n.type === "link") {
            return e.render(o);
          } else if (t && n.type === "node") {
            return t.render(o);
          } else {
            return undefined;
          }
        },
        enabled: o.enabled
      }));
    }
  };
  e.prototype.hideTooltip = function () {
    if (this._tooltip) {
      this._tooltip.hide();
    }
  };
};
var i = require("./13306.js");
var o = require("./35922.js");
function a(e, t) {
  return function (n) {
    var a = (0, o.isFunction)(e) ? e.call(n, n) : {};
    var r = Object.prototype.hasOwnProperty.bind(a);
    if (!r("html") && !r("text")) {
      a = (0, i.extend)(a, t.call(n, n));
    }
    return a;
  };
}