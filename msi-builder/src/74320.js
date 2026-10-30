exports.GanttCustomFieldsManager = undefined;
var i = require("./47617.js");
var o = require("./81278.js");
var a = require("./30631.js");
var r = function () {
  function e(e) {
    this._gantt = e;
    this._mappingHelper = e._mappingHelper;
    this.cache = new o.GanttDataCache();
  }
  var t = e.prototype;
  t._getTaskCustomFields = function () {
    var e = this._gantt.option("columns");
    var t = e && e.map(function (e) {
      return e.dataField;
    });
    var n = this._mappingHelper.getTaskMappedFieldNames();
    if (t) {
      return t.filter(function (e) {
        return n.indexOf(e) < 0;
      });
    } else {
      return [];
    }
  };
  t._getCustomFieldsData = function (e) {
    return this._getTaskCustomFields().reduce(function (t, n) {
      if (e && e[n] !== undefined) {
        t[n] = e[n];
      }
      return t;
    }, {});
  };
  t.addCustomFieldsData = function (e, t) {
    if (t) {
      var n = this._gantt._tasksOption && this._gantt._tasksOption._getItems();
      var o = (0, i.compileGetter)(this._gantt.option(`tasks.keyExpr`));
      var a = n && n.filter(function (t) {
        return o(t) === e;
      })[0];
      var r = this._getTaskCustomFields();
      if (a) {
        for (var s = 0; s < r.length; s++) {
          var l = r[s];
          if (Object.prototype.hasOwnProperty.call(a, l)) {
            t[l] = a[l];
          }
        }
      }
    }
  };
  t.appendCustomFields = function (e) {
    var t = this._gantt._tasksOption && this._gantt._tasksOption._getItems();
    var n = this._gantt._getTaskKeyGetter();
    var i = a.GanttHelper.getInvertedData(t, n);
    return e.reduce(function (e, t) {
      var o = n(t);
      var a = i[o];
      if (a) {
        var r = {};
        for (var s in a) {
          r[s] = Object.prototype.hasOwnProperty.call(t, s) ? t[s] : a[s];
        }
        e.push(r);
      } else {
        e.push(t);
      }
      return e;
    }, []);
  };
  t.addCustomFieldsDataFromCache = function (e, t) {
    this.cache.pullDataFromCache(e, t);
  };
  t.saveCustomFieldsDataToCache = function (e, t) {
    var n = this;
    var i = arguments.length > 2 && arguments[2] !== undefined && arguments[2];
    var o = arguments.length > 3 && arguments[3] !== undefined && arguments[3];
    var a = this._getCustomFieldsData(t);
    if (Object.keys(a).length > 0) {
      function r(e, t) {
        var i = n._gantt[`_tasksOption`];
        if (i && t) {
          i.update(e, t, function (e, t) {
            var a = {};
            n.addCustomFieldsData(t, a);
            i._reloadDataSource().done(function (e) {
              n._gantt._ganttTreeList.updateDataSource(e ?? i._dataSource, false, o);
            });
            var r = n._gantt.option("selectedRowKey");
            n._gantt._ganttView._selectTask(r);
            n._gantt._actionsManager.raiseUpdatedAction("tasks", a, t);
          });
        }
      }
      this.cache.saveData(e, a, i ? r : null);
    }
  };
  t.resetCustomFieldsDataCache = function (e) {
    this.cache.resetCache(e);
  };
  return e;
}();
exports.GanttCustomFieldsManager = r;