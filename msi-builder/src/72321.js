exports.default = undefined;
var i;
var o = require("./348.js");
var a = require("./48351.js");
var r = require("./35922.js");
var s = require("./58201.js");
var l = require("./13306.js");
var u = (i = require("./28109.js")) && i.__esModule ? i : {
  default: i
};
var d = {
  widget: "separator"
};
var c = "dx-diagram-sm-edit-item";
var h = "dx-diagram-md-edit-item";
var f = "dx-diagram-lg-edit-item";
var p = "dx-diagram-image-dropdown-item";
var g = "dx-diagram-color-edit-item";
var m = "dx-diagram-lg-icon-item";
var _ = {
  SHOW_TOOLBOX_COMMAND_NAME: "toolbox",
  SHOW_PROPERTIES_PANEL_COMMAND_NAME: "propertiesPanel",
  getAllCommands: function () {
    var e = this;
    var t = (0, o.getDiagram)().DiagramCommand;
    return this._allCommands ||= {
      separator: d,
      exportSvg: {
        command: t.ExportSvg,
        text: u.default.format("dxDiagram-commandExportToSvg"),
        getParameter: function (t) {
          return function (n) {
            return e._exportTo(t, n, "SVG", "image/svg+xml");
          };
        }
      },
      exportPng: {
        command: t.ExportPng,
        text: u.default.format("dxDiagram-commandExportToPng"),
        getParameter: function (t) {
          return function (n) {
            return e._exportTo(t, n, "PNG", "image/png");
          };
        }
      },
      exportJpg: {
        command: t.ExportJpg,
        text: u.default.format("dxDiagram-commandExportToJpg"),
        getParameter: function (t) {
          return function (n) {
            return e._exportTo(t, n, "JPEG", "image/jpeg");
          };
        }
      },
      undo: {
        command: t.Undo,
        hint: u.default.format("dxDiagram-commandUndo"),
        text: u.default.format("dxDiagram-commandUndo"),
        icon: "undo",
        menuIcon: "undo"
      },
      redo: {
        command: t.Redo,
        hint: u.default.format("dxDiagram-commandRedo"),
        text: u.default.format("dxDiagram-commandRedo"),
        icon: "redo",
        menuIcon: "redo"
      },
      cut: {
        command: t.Cut,
        hint: u.default.format("dxDiagram-commandCut"),
        text: u.default.format("dxDiagram-commandCut"),
        icon: "cut",
        menuIcon: "cut"
      },
      copy: {
        command: t.Copy,
        hint: u.default.format("dxDiagram-commandCopy"),
        text: u.default.format("dxDiagram-commandCopy"),
        icon: "copy",
        menuIcon: "copy"
      },
      paste: {
        command: t.PasteInPosition,
        hint: u.default.format("dxDiagram-commandPaste"),
        text: u.default.format("dxDiagram-commandPaste"),
        icon: "paste",
        menuIcon: "paste"
      },
      selectAll: {
        command: t.SelectAll,
        hint: u.default.format("dxDiagram-commandSelectAll"),
        text: u.default.format("dxDiagram-commandSelectAll"),
        icon: "dx-diagram-i-button-select-all dx-diagram-i",
        menuIcon: "dx-diagram-i-menu-select-all dx-diagram-i"
      },
      delete: {
        command: t.Delete,
        hint: u.default.format("dxDiagram-commandDelete"),
        text: u.default.format("dxDiagram-commandDelete"),
        icon: "remove",
        menuIcon: "remove"
      },
      fontName: {
        command: t.FontName,
        hint: u.default.format("dxDiagram-commandFontName"),
        text: u.default.format("dxDiagram-commandFontName"),
        widget: "dxSelectBox",
        items: ["Arial", "Arial Black", "Helvetica", "Times New Roman", "Courier New", "Courier", "Verdana", "Georgia", "Comic Sans MS", "Trebuchet MS"].map(function (e) {
          return {
            text: e,
            value: e
          };
        }),
        cssClass: h
      },
      fontSize: {
        command: t.FontSize,
        hint: u.default.format("dxDiagram-commandFontSize"),
        text: u.default.format("dxDiagram-commandFontSize"),
        widget: "dxSelectBox",
        items: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map(function (e) {
          return {
            text: e + "pt",
            value: e + "pt"
          };
        }),
        cssClass: c
      },
      bold: {
        command: t.Bold,
        hint: u.default.format("dxDiagram-commandBold"),
        text: u.default.format("dxDiagram-commandBold"),
        icon: "bold",
        menuIcon: "bold"
      },
      italic: {
        command: t.Italic,
        hint: u.default.format("dxDiagram-commandItalic"),
        text: u.default.format("dxDiagram-commandItalic"),
        icon: "italic",
        menuIcon: "italic"
      },
      underline: {
        command: t.Underline,
        hint: u.default.format("dxDiagram-commandUnderline"),
        text: u.default.format("dxDiagram-commandUnderline"),
        icon: "underline",
        menuIcon: "underline"
      },
      fontColor: {
        command: t.FontColor,
        text: u.default.format("dxDiagram-commandTextColor"),
        hint: u.default.format("dxDiagram-commandTextColor"),
        widget: "dxColorBox",
        icon: "dx-icon dx-icon-color",
        menuIcon: "dx-icon dx-icon-color",
        cssClass: g
      },
      lineColor: {
        command: t.StrokeColor,
        text: u.default.format("dxDiagram-commandLineColor"),
        hint: u.default.format("dxDiagram-commandLineColor"),
        widget: "dxColorBox",
        icon: "dx-icon dx-icon-background",
        menuIcon: "dx-icon dx-icon-background",
        cssClass: g
      },
      lineWidth: {
        command: t.StrokeWidth,
        text: u.default.format("dxDiagram-commandLineWidth"),
        hint: u.default.format("dxDiagram-commandLineWidth"),
        widget: "dxSelectBox",
        items: [1, 2, 3, 4, 5, 6, 7, 8].map(function (e) {
          return {
            text: e + "px",
            value: e.toString()
          };
        }),
        cssClass: c
      },
      lineStyle: {
        command: t.StrokeStyle,
        text: u.default.format("dxDiagram-commandLineStyle"),
        hint: u.default.format("dxDiagram-commandLineStyle"),
        widget: "dxSelectBox",
        items: [{
          value: "",
          menuIcon: "dx-diagram-i-line-solid dx-diagram-i",
          hint: u.default.format("dxDiagram-commandLineStyleSolid")
        }, {
          value: "2,2",
          menuIcon: "dx-diagram-i-line-dotted dx-diagram-i",
          hint: u.default.format("dxDiagram-commandLineStyleDotted")
        }, {
          value: "6,2",
          menuIcon: "dx-diagram-i-line-dashed dx-diagram-i",
          hint: u.default.format("dxDiagram-commandLineStyleDashed")
        }],
        cssClass: p
      },
      fillColor: {
        command: t.FillColor,
        text: u.default.format("dxDiagram-commandFillColor"),
        hint: u.default.format("dxDiagram-commandFillColor"),
        widget: "dxColorBox",
        icon: "dx-diagram-i dx-diagram-i-button-fill",
        menuIcon: "dx-diagram-i dx-diagram-i-menu-fill",
        cssClass: g
      },
      textAlignLeft: {
        command: t.TextLeftAlign,
        hint: u.default.format("dxDiagram-commandAlignLeft"),
        text: u.default.format("dxDiagram-commandAlignLeft"),
        icon: "alignleft",
        menuIcon: "alignleft"
      },
      textAlignCenter: {
        command: t.TextCenterAlign,
        hint: u.default.format("dxDiagram-commandAlignCenter"),
        text: u.default.format("dxDiagram-commandAlignCenter"),
        icon: "aligncenter",
        menuIcon: "aligncenter"
      },
      textAlignRight: {
        command: t.TextRightAlign,
        hint: u.default.format("dxDiagram-commandAlignRight"),
        text: u.default.format("dxDiagram-commandAlignRight"),
        icon: "alignright",
        menuIcon: "alignright"
      },
      lock: {
        command: t.Lock,
        hint: u.default.format("dxDiagram-commandLock"),
        text: u.default.format("dxDiagram-commandLock"),
        icon: "dx-diagram-i-button-lock dx-diagram-i",
        menuIcon: "dx-diagram-i-menu-lock dx-diagram-i"
      },
      unlock: {
        command: t.Unlock,
        hint: u.default.format("dxDiagram-commandUnlock"),
        text: u.default.format("dxDiagram-commandUnlock"),
        icon: "dx-diagram-i-button-unlock dx-diagram-i",
        menuIcon: "dx-diagram-i-menu-unlock dx-diagram-i"
      },
      bringToFront: {
        command: t.BringToFront,
        hint: u.default.format("dxDiagram-commandBringToFront"),
        text: u.default.format("dxDiagram-commandBringToFront"),
        icon: "dx-diagram-i-button-bring-to-front dx-diagram-i",
        menuIcon: "dx-diagram-i-menu-bring-to-front dx-diagram-i"
      },
      sendToBack: {
        command: t.SendToBack,
        hint: u.default.format("dxDiagram-commandSendToBack"),
        text: u.default.format("dxDiagram-commandSendToBack"),
        icon: "dx-diagram-i-button-send-to-back dx-diagram-i",
        menuIcon: "dx-diagram-i-menu-send-to-back dx-diagram-i"
      },
      insertShapeImage: {
        command: t.InsertShapeImage,
        text: u.default.format("dxDiagram-commandInsertShapeImage"),
        icon: "dx-diagram-i-button-image-insert dx-diagram-i",
        menuIcon: "dx-diagram-i-menu-image-insert dx-diagram-i"
      },
      editShapeImage: {
        command: t.EditShapeImage,
        text: u.default.format("dxDiagram-commandEditShapeImage"),
        icon: "dx-diagram-i-button-image-edit dx-diagram-i",
        menuIcon: "dx-diagram-i-menu-image-edit dx-diagram-i"
      },
      deleteShapeImage: {
        command: t.DeleteShapeImage,
        text: u.default.format("dxDiagram-commandDeleteShapeImage"),
        icon: "dx-diagram-i-button-image-delete dx-diagram-i",
        menuIcon: "dx-diagram-i-menu-image-delete dx-diagram-i"
      },
      connectorLineType: {
        command: t.ConnectorLineOption,
        widget: "dxSelectBox",
        hint: u.default.format("dxDiagram-commandConnectorLineType"),
        text: u.default.format("dxDiagram-commandConnectorLineType"),
        items: [{
          value: 0,
          menuIcon: "dx-diagram-i-connector-straight dx-diagram-i",
          hint: u.default.format("dxDiagram-commandConnectorLineStraight"),
          text: u.default.format("dxDiagram-commandConnectorLineStraight")
        }, {
          value: 1,
          menuIcon: "dx-diagram-i-connector-orthogonal dx-diagram-i",
          hint: u.default.format("dxDiagram-commandConnectorLineOrthogonal"),
          text: u.default.format("dxDiagram-commandConnectorLineOrthogonal")
        }],
        cssClass: p
      },
      connectorLineStart: {
        command: t.ConnectorStartLineEnding,
        widget: "dxSelectBox",
        items: [{
          value: 0,
          menuIcon: "dx-diagram-i-connector-begin-none dx-diagram-i",
          hint: u.default.format("dxDiagram-commandConnectorLineNone"),
          text: u.default.format("dxDiagram-commandConnectorLineNone")
        }, {
          value: 1,
          menuIcon: "dx-diagram-i-connector-begin-arrow dx-diagram-i",
          hint: u.default.format("dxDiagram-commandConnectorLineArrow"),
          text: u.default.format("dxDiagram-commandConnectorLineArrow")
        }, {
          value: 2,
          menuIcon: "dx-diagram-i-connector-begin-outlined-triangle dx-diagram-i",
          hint: u.default.format("dxDiagram-commandConnectorLineArrow"),
          text: u.default.format("dxDiagram-commandConnectorLineArrow")
        }, {
          value: 3,
          menuIcon: "dx-diagram-i-connector-begin-filled-triangle dx-diagram-i",
          hint: u.default.format("dxDiagram-commandConnectorLineArrow"),
          text: u.default.format("dxDiagram-commandConnectorLineArrow")
        }],
        hint: u.default.format("dxDiagram-commandConnectorLineStart"),
        text: u.default.format("dxDiagram-commandConnectorLineStart"),
        cssClass: p
      },
      connectorLineEnd: {
        command: t.ConnectorEndLineEnding,
        widget: "dxSelectBox",
        items: [{
          value: 0,
          menuIcon: "dx-diagram-i-connector-end-none dx-diagram-i",
          hint: u.default.format("dxDiagram-commandConnectorLineNone"),
          text: u.default.format("dxDiagram-commandConnectorLineNone")
        }, {
          value: 1,
          menuIcon: "dx-diagram-i-connector-end-arrow dx-diagram-i",
          hint: u.default.format("dxDiagram-commandConnectorLineArrow"),
          text: u.default.format("dxDiagram-commandConnectorLineArrow")
        }, {
          value: 2,
          menuIcon: "dx-diagram-i-connector-end-outlined-triangle dx-diagram-i",
          hint: u.default.format("dxDiagram-commandConnectorLineArrow"),
          text: u.default.format("dxDiagram-commandConnectorLineArrow")
        }, {
          value: 3,
          menuIcon: "dx-diagram-i-connector-end-filled-triangle dx-diagram-i",
          hint: u.default.format("dxDiagram-commandConnectorLineArrow"),
          text: u.default.format("dxDiagram-commandConnectorLineArrow")
        }],
        hint: u.default.format("dxDiagram-commandConnectorLineEnd"),
        text: u.default.format("dxDiagram-commandConnectorLineEnd"),
        cssClass: p
      },
      layoutTreeTopToBottom: {
        command: t.AutoLayoutTreeVertical,
        text: u.default.format("dxDiagram-commandLayoutTopToBottom"),
        hint: u.default.format("dxDiagram-commandLayoutTopToBottom"),
        icon: "dx-diagram-i-button-layout-tree-tb dx-diagram-i",
        cssClass: m
      },
      layoutTreeBottomToTop: {
        command: t.AutoLayoutTreeVerticalBottomToTop,
        text: u.default.format("dxDiagram-commandLayoutBottomToTop"),
        hint: u.default.format("dxDiagram-commandLayoutBottomToTop"),
        icon: "dx-diagram-i-button-layout-tree-bt dx-diagram-i",
        cssClass: m
      },
      layoutTreeLeftToRight: {
        command: t.AutoLayoutTreeHorizontal,
        text: u.default.format("dxDiagram-commandLayoutLeftToRight"),
        hint: u.default.format("dxDiagram-commandLayoutLeftToRight"),
        icon: "dx-diagram-i-button-layout-tree-lr dx-diagram-i",
        cssClass: m
      },
      layoutTreeRightToLeft: {
        command: t.AutoLayoutTreeHorizontalRightToLeft,
        text: u.default.format("dxDiagram-commandLayoutRightToLeft"),
        hint: u.default.format("dxDiagram-commandLayoutRightToLeft"),
        icon: "dx-diagram-i-button-layout-tree-rl dx-diagram-i",
        cssClass: m
      },
      layoutLayeredTopToBottom: {
        command: t.AutoLayoutLayeredVertical,
        text: u.default.format("dxDiagram-commandLayoutTopToBottom"),
        hint: u.default.format("dxDiagram-commandLayoutTopToBottom"),
        icon: "dx-diagram-i-button-layout-layered-tb dx-diagram-i",
        cssClass: m
      },
      layoutLayeredBottomToTop: {
        command: t.AutoLayoutLayeredVerticalBottomToTop,
        text: u.default.format("dxDiagram-commandLayoutBottomToTop"),
        hint: u.default.format("dxDiagram-commandLayoutBottomToTop"),
        icon: "dx-diagram-i-button-layout-layered-bt dx-diagram-i",
        cssClass: m
      },
      layoutLayeredLeftToRight: {
        command: t.AutoLayoutLayeredHorizontal,
        text: u.default.format("dxDiagram-commandLayoutLeftToRight"),
        hint: u.default.format("dxDiagram-commandLayoutLeftToRight"),
        icon: "dx-diagram-i-button-layout-layered-lr dx-diagram-i",
        cssClass: m
      },
      layoutLayeredRightToLeft: {
        command: t.AutoLayoutLayeredHorizontalRightToLeft,
        text: u.default.format("dxDiagram-commandLayoutRightToLeft"),
        hint: u.default.format("dxDiagram-commandLayoutRightToLeft"),
        icon: "dx-diagram-i-button-layout-layered-rl dx-diagram-i",
        cssClass: m
      },
      fullScreen: {
        command: t.Fullscreen,
        hint: u.default.format("dxDiagram-commandFullscreen"),
        text: u.default.format("dxDiagram-commandFullscreen"),
        icon: "dx-diagram-i dx-diagram-i-button-fullscreen",
        menuIcon: "dx-diagram-i dx-diagram-i-menu-fullscreen",
        cssClass: g
      },
      units: {
        command: t.ViewUnits,
        hint: u.default.format("dxDiagram-commandUnits"),
        text: u.default.format("dxDiagram-commandUnits"),
        widget: "dxSelectBox"
      },
      simpleView: {
        command: t.ToggleSimpleView,
        hint: u.default.format("dxDiagram-commandSimpleView"),
        text: u.default.format("dxDiagram-commandSimpleView"),
        widget: "dxCheckBox"
      },
      showGrid: {
        command: t.ShowGrid,
        hint: u.default.format("dxDiagram-commandShowGrid"),
        text: u.default.format("dxDiagram-commandShowGrid"),
        widget: "dxCheckBox"
      },
      snapToGrid: {
        command: t.SnapToGrid,
        hint: u.default.format("dxDiagram-commandSnapToGrid"),
        text: u.default.format("dxDiagram-commandSnapToGrid"),
        widget: "dxCheckBox"
      },
      gridSize: {
        command: t.GridSize,
        hint: u.default.format("dxDiagram-commandGridSize"),
        text: u.default.format("dxDiagram-commandGridSize"),
        widget: "dxSelectBox"
      },
      pageSize: {
        command: t.PageSize,
        hint: u.default.format("dxDiagram-commandPageSize"),
        text: u.default.format("dxDiagram-commandPageSize"),
        widget: "dxSelectBox",
        cssClass: f,
        getCommandValue: function (e) {
          return JSON.parse(e);
        },
        getEditorValue: function (e) {
          return JSON.stringify(e);
        }
      },
      pageOrientation: {
        command: t.PageLandscape,
        hint: u.default.format("dxDiagram-commandPageOrientation"),
        text: u.default.format("dxDiagram-commandPageOrientation"),
        widget: "dxSelectBox",
        items: [{
          value: true,
          text: u.default.format("dxDiagram-commandPageOrientationLandscape")
        }, {
          value: false,
          text: u.default.format("dxDiagram-commandPageOrientationPortrait")
        }],
        cssClass: h
      },
      pageColor: {
        command: t.PageColor,
        hint: u.default.format("dxDiagram-commandPageColor"),
        text: u.default.format("dxDiagram-commandPageColor"),
        widget: "dxColorBox",
        icon: "dx-diagram-i dx-diagram-i-button-fill",
        menuIcon: "dx-diagram-i dx-diagram-i-menu-fill",
        cssClass: g
      },
      zoomLevel: {
        command: t.ZoomLevel,
        hint: u.default.format("dxDiagram-commandZoomLevel"),
        text: u.default.format("dxDiagram-commandZoomLevel"),
        widget: "dxTextBox",
        items: [d, {
          command: t.FitToScreen,
          hint: u.default.format("dxDiagram-commandFitToContent"),
          text: u.default.format("dxDiagram-commandFitToContent")
        }, {
          command: t.FitToWidth,
          hint: u.default.format("dxDiagram-commandFitToWidth"),
          text: u.default.format("dxDiagram-commandFitToWidth")
        }, d, {
          command: t.AutoZoomToContent,
          hint: u.default.format("dxDiagram-commandAutoZoomByContent"),
          text: u.default.format("dxDiagram-commandAutoZoomByContent")
        }, {
          command: t.AutoZoomToWidth,
          hint: u.default.format("dxDiagram-commandAutoZoomByWidth"),
          text: u.default.format("dxDiagram-commandAutoZoomByWidth")
        }],
        getEditorDisplayValue: function (e) {
          return Math.round(e * 100) + "%";
        },
        cssClass: c
      },
      toolbox: {
        command: this.SHOW_TOOLBOX_COMMAND_NAME,
        iconChecked: "dx-diagram-i dx-diagram-i-button-toolbox-close",
        iconUnchecked: "dx-diagram-i dx-diagram-i-button-toolbox-open",
        hint: u.default.format("dxDiagram-uiShowToolbox"),
        text: u.default.format("dxDiagram-uiShowToolbox")
      },
      propertiesPanel: {
        command: this.SHOW_PROPERTIES_PANEL_COMMAND_NAME,
        iconChecked: "close",
        iconUnchecked: "dx-diagram-i dx-diagram-i-button-properties-panel-open",
        hint: u.default.format("dxDiagram-uiProperties"),
        text: u.default.format("dxDiagram-uiProperties")
      }
    };
  },
  getMainToolbarCommands: function (e, t) {
    var n = this.getAllCommands();
    var i = e ? this._getPreparedCommands(n, e) : this._getDefaultMainToolbarCommands(n);
    return this._prepareToolbarCommands(i, t);
  },
  _getDefaultMainToolbarCommands: function (e) {
    return this._defaultMainToolbarCommands ||= [e.undo, e.redo, e.separator, e.fontName, e.fontSize, e.bold, e.italic, e.underline, e.separator, e.lineWidth, e.lineStyle, e.separator, e.fontColor, e.lineColor, e.fillColor, e.separator, e.textAlignLeft, e.textAlignCenter, e.textAlignRight, e.separator, e.connectorLineType, e.connectorLineStart, e.connectorLineEnd, e.separator, {
      text: u.default.format("dxDiagram-uiLayout"),
      showText: "always",
      items: [{
        text: u.default.format("dxDiagram-uiLayoutTree"),
        items: [e.layoutTreeTopToBottom, e.layoutTreeBottomToTop, e.layoutTreeLeftToRight, e.layoutTreeRightToLeft]
      }, {
        text: u.default.format("dxDiagram-uiLayoutLayered"),
        items: [e.layoutLayeredTopToBottom, e.layoutLayeredBottomToTop, e.layoutLayeredLeftToRight, e.layoutLayeredRightToLeft]
      }]
    }];
  },
  getHistoryToolbarCommands: function (e, t) {
    var n = this.getAllCommands();
    var i = e ? this._getPreparedCommands(n, e) : this._getDefaultHistoryToolbarCommands(n);
    return this._prepareToolbarCommands(i, t);
  },
  _getDefaultHistoryToolbarCommands: function (e) {
    return this._defaultHistoryToolbarCommands ||= [e.undo, e.redo, e.separator, e.toolbox];
  },
  getViewToolbarCommands: function (e, t) {
    var n = this.getAllCommands();
    var i = e ? this._getPreparedCommands(n, e) : this._getDefaultViewToolbarCommands(n);
    return this._prepareToolbarCommands(i, t);
  },
  _getDefaultViewToolbarCommands: function (e) {
    return this._defaultViewToolbarCommands ||= [e.zoomLevel, e.separator, e.fullScreen, e.separator, {
      widget: "dxButton",
      icon: "export",
      text: u.default.format("dxDiagram-uiExport"),
      hint: u.default.format("dxDiagram-uiExport"),
      items: [e.exportSvg, e.exportPng, e.exportJpg]
    }, {
      icon: "preferences",
      hint: u.default.format("dxDiagram-uiSettings"),
      text: u.default.format("dxDiagram-uiSettings"),
      items: [e.units, e.separator, e.showGrid, e.snapToGrid, e.gridSize, e.separator, e.simpleView, e.toolbox]
    }];
  },
  getPropertiesToolbarCommands: function (e, t) {
    var n = this.getAllCommands();
    var i = e ? this._getPreparedCommands(n, e) : this._getDefaultPropertiesToolbarCommands(n);
    return this._prepareToolbarCommands(i, t);
  },
  _getDefaultPropertiesToolbarCommands: function (e) {
    return this._defaultPropertiesToolbarCommands ||= [e.propertiesPanel];
  },
  _getDefaultPropertyPanelCommandGroups: function () {
    return this._defaultPropertyPanelCommandGroups ||= [{
      title: u.default.format("dxDiagram-uiStyle"),
      groups: [{
        title: u.default.format("dxDiagram-uiText"),
        commands: ["fontName", "fontSize", "bold", "italic", "underline", "textAlignLeft", "textAlignCenter", "textAlignRight", "fontColor"]
      }, {
        title: u.default.format("dxDiagram-uiObject"),
        commands: ["lineStyle", "lineWidth", "lineColor", "fillColor"]
      }, {
        title: u.default.format("dxDiagram-uiConnector"),
        commands: ["connectorLineType", "connectorLineStart", "connectorLineEnd"]
      }]
    }, {
      title: u.default.format("dxDiagram-uiLayout"),
      groups: [{
        title: u.default.format("dxDiagram-uiLayoutLayered"),
        commands: ["layoutLayeredTopToBottom", "layoutLayeredBottomToTop", "layoutLayeredLeftToRight", "layoutLayeredRightToLeft"]
      }, {
        title: u.default.format("dxDiagram-uiLayoutTree"),
        commands: ["layoutTreeTopToBottom", "layoutTreeBottomToTop", "layoutTreeLeftToRight", "layoutTreeRightToLeft"]
      }]
    }, {
      title: u.default.format("dxDiagram-uiDiagram"),
      groups: [{
        title: u.default.format("dxDiagram-uiPage"),
        commands: ["pageSize", "pageOrientation", "pageColor"]
      }]
    }];
  },
  _preparePropertyPanelGroups: function (e) {
    var t = this;
    var n = this.getAllCommands();
    var i = [];
    e.forEach(function (e) {
      var o;
      var a = e.commands;
      if (a) {
        a = t._getPreparedCommands(n, a);
        a = t._prepareToolbarCommands(a);
      }
      if (e.groups) {
        o = [];
        e.groups.forEach(function (e) {
          var i = e.commands;
          if (i) {
            i = t._getPreparedCommands(n, i);
            i = t._prepareToolbarCommands(i);
          }
          o.push({
            title: e.title,
            commands: i
          });
        });
      }
      i.push({
        title: e.title,
        commands: a,
        groups: o
      });
    });
    return i;
  },
  getPropertyPanelCommandTabs: function (e) {
    e = e || this._getDefaultPropertyPanelCommandGroups();
    return this._preparePropertyPanelGroups(e);
  },
  getContextMenuCommands: function (e) {
    var t = this.getAllCommands();
    var n = e ? this._getPreparedCommands(t, e) : this._getDefaultContextMenuCommands(t);
    return this._prepareContextMenuCommands(n);
  },
  _getDefaultContextMenuCommands: function (e) {
    return this._defaultContextMenuCommands ||= [e.cut, e.copy, e.paste, e.delete, e.separator, e.selectAll, e.separator, e.bringToFront, e.sendToBack, e.separator, e.lock, e.unlock, e.separator, e.insertShapeImage, e.editShapeImage, e.deleteShapeImage];
  },
  _getPreparedCommands: function (e, t) {
    var n = this;
    return t.map(function (t) {
      if (t.widget && t.widget === "separator") {
        return {
          command: t,
          location: t.location
        };
      }
      if (e[t]) {
        return e[t];
      }
      if (t.text || t.icon || t.name) {
        var i = t.name && e[t.name];
        var o = {
          command: i && i.command,
          name: t.name,
          location: t.location,
          text: t.text || i && i.text,
          hint: t.text || i && i.hint,
          icon: t.icon || i && i.icon,
          menuIcon: t.icon || i && i.menuIcon,
          widget: i && i.widget,
          cssClass: i && i.cssClass,
          getParameter: i && i.getParameter,
          getCommandValue: i && i.getCommandValue,
          getEditorValue: i && i.getEditorValue,
          getEditorDisplayValue: i && i.getEditorDisplayValue,
          iconChecked: i && i.iconChecked,
          iconUnchecked: i && i.iconUnchecked
        };
        if (Array.isArray(t.items)) {
          o.items = n._getPreparedCommands(e, t.items);
        } else {
          o.items = i && i.items;
        }
        return o;
      }
    }).filter(function (e) {
      return e;
    });
  },
  _prepareContextMenuCommands: function (e, t, n) {
    var i = this;
    var o = false;
    return e.map(function (e) {
      if (i._isValidCommand(e, t)) {
        if (!e.widget || e.widget !== "separator") {
          var a = i._cloneCommand(e, t);
          a.icon = a.menuIcon;
          a.beginGroup = o;
          a.rootCommand = a.command ? undefined : n && n.command;
          o = false;
          return a;
        }
        o = true;
      }
    }).filter(function (e) {
      return e;
    });
  },
  _prepareToolbarCommands: function (e, t) {
    var n = this;
    return e.map(function (e) {
      if (n._isValidCommand(e, t)) {
        return n._cloneCommand(e, t);
      }
    }).filter(function (e) {
      return e;
    }).filter(function (e, t, n) {
      return (e.widget !== "separator" || t !== n.length - 1) && e;
    });
  },
  _cloneCommand: function (e, t) {
    var n = (0, l.extend)({}, e);
    if (Array.isArray(e.items)) {
      n.items = this._prepareContextMenuCommands(e.items, t, n);
    }
    return n;
  },
  _isValidCommand: function (e, t) {
    return (t = t || []).indexOf(e.command) === -1;
  },
  _exportTo: function (e, t, n, i) {
    var o = (0, s.getWindow)();
    if (o && o.atob && (0, r.isFunction)(o.Blob)) {
      var l = this._getBlobByDataURI(o, t, i);
      var u = e.option("export");
      a.fileSaver.saveAs(u.fileName || "foo", n, l);
    }
  },
  _getBlobByDataURI: function (e, t, n) {
    for (var i = e.atob(t.split(",")[1]), o = new Uint8Array(i.length), a = 0; a < i.length; a++) {
      o[a] = i.charCodeAt(a);
    }
    return new e.Blob([o.buffer], {
      type: n
    });
  }
};
exports.default = _;
module.exports = exports.default;
module.exports.default = exports.default;