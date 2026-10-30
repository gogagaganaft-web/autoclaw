exports.plugins = undefined;
var i = require("./19157.js");
var o = require("./20576.js");
var a = {
  name: "center_template_pie_chart",
  init: o.noop,
  dispose: function () {
    this._centerTemplateGroup.linkOff().dispose();
  },
  extenders: {
    _createHtmlStructure: function () {
      var e = (0, i.patchFontOptions)(this._themeManager._font);
      this._centerTemplateGroup = this._renderer.g().attr({
        class: "dxc-hole-template"
      }).linkOn(this._renderer.root, "center-template").css(e).linkAppend();
    },
    _renderExtraElements: function () {
      this._requestChange(["CENTER_TEMPLATE"]);
    }
  },
  members: {
    _renderCenterTemplate: function () {
      var e = this.option("centerTemplate");
      var t = this._centerTemplateGroup.clear();
      if (e) {
        t.attr({
          visibility: "hidden"
        });
        var n = this._getCenter();
        this._getTemplate(e).render({
          model: this,
          container: t.element,
          onRendered: function () {
            var e = t;
            var i = e.getBBox();
            var o = i.x + i.width / 2;
            var a = i.y + i.height / 2;
            e.move(n.x - o, n.y - a);
            e.attr({
              visibility: "visible"
            });
          }
        });
      }
    }
  },
  customize: function (e) {
    e.addChange({
      code: "CENTER_TEMPLATE",
      handler: function () {
        this._renderCenterTemplate();
      },
      option: "centerTemplate"
    });
  }
};
var r = {
  pieChart: a,
  gauge: {
    name: "center_template_gauge",
    init: o.noop,
    dispose: a.dispose,
    extenders: {
      _initCore: function () {
        this._createCenterTemplateGroup();
      },
      _renderContent: function () {
        var e = (0, i.patchFontOptions)(this._themeManager._font);
        this._centerTemplateGroup.css(e);
        this._requestChange(["CENTER_TEMPLATE"]);
      },
      _updateExtraElements: function () {
        this._requestChange(["CENTER_TEMPLATE"]);
      }
    },
    members: {
      _renderCenterTemplate: a.members._renderCenterTemplate,
      _createCenterTemplateGroup: function () {
        this._centerTemplateGroup = this._renderer.g().attr({
          class: "dxg-hole-template"
        }).linkOn(this._renderer.root, "center-template").linkAppend();
      }
    },
    customize: a.customize
  }
};
exports.plugins = r;