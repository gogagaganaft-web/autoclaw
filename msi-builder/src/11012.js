exports.GanttTreeListNodesState = exports.GanttTreeListNodeState = undefined;
var n = function () {
  function e(e) {
    this.collapsed = false;
    this.key = e.key;
    this.children = e.children.map(function (e) {
      return e.key;
    });
    this.parentKey = e.parent?.key;
  }
  var t = e.prototype;
  t.hasChildren = function () {
    return this.children.length > 0;
  };
  t.removeChild = function (e) {
    var t = this.children.indexOf(e.key);
    if (t > -1) {
      this.children = this.children.splice(t, 1);
    }
  };
  t.equal = function (e) {
    return !!e && e.key === this.key && e.parentKey === this.parentKey && this.children.length === e.children.length && !this.children.some(function (t, n) {
      return t !== e.children[n];
    });
  };
  return e;
}();
exports.GanttTreeListNodeState = n;
var i = function () {
  function e() {
    this._resetHash();
  }
  var t = e.prototype;
  t.clear = function () {
    this._resetHash();
  };
  t.applyNodes = function (e, t) {
    var n = this;
    if (this._rootValue !== t) {
      this._resetHash();
      this._rootValue = t;
    }
    this._removeNonExistentNodes(e.map(function (e) {
      return e.key;
    }));
    e.forEach(function (e) {
      return n._applyNode(e);
    });
    this._validateHash();
  };
  t.saveExpandedState = function (e) {
    var t = this;
    this._hasCollapsed = false;
    this._forEachState(function (n) {
      if (n.hasChildren() && !e.includes(n.key)) {
        n.collapsed = true;
        t._hasCollapsed = true;
      }
    });
  };
  t.getExpandedKeys = function () {
    if (this._hasCollapsed) {
      var e = [];
      this._forEachState(function (t) {
        if (t.hasChildren() && !t.collapsed) {
          e.push(t.key);
        }
      });
      return e;
    }
    return null;
  };
  t._resetHash = function () {
    this._nodeHash = {};
    this._hasCollapsed = false;
  };
  t._getNodeState = function (e) {
    return this._nodeHash[e];
  };
  t._removeNonExistentNodes = function (e) {
    var t = this;
    if (e) {
      this._forEachState(function (n) {
        if (!e.includes(n.key)) {
          t._removeStateWithChildren(n);
        }
      });
    }
  };
  t._removeStateWithChildren = function (e) {
    var t = this;
    var n = this._getNodeState(e);
    if (n) {
      n.children.forEach(function (e) {
        return t._removeStateWithChildren(e);
      });
      var i = this._getNodeState(n.parentKey);
      if (i) {
        i.removeChild(n);
      }
      delete this._nodeHash[e];
    }
  };
  t._applyNode = function (e) {
    var t = new n(e);
    var i = this._getNodeState(e.key);
    if (i == null || !i.equal(t)) {
      this._nodeHash[e.key] = t;
      this._expandTreelineToNode(e.key);
    }
  };
  t._expandTreelineToNode = function (e) {
    var t = this._getNodeState(e);
    for (var n = this._getNodeState(t == null ? undefined : t.parentKey); n;) {
      n.collapsed = false;
      n = this._getNodeState(n.parentKey);
    }
  };
  t._validateHash = function () {
    var e = this;
    Object.keys(this._nodeHash).forEach(function (t) {
      var n = e._getNodeState(t);
      var i = n == null ? undefined : n.parentKey;
      if (i !== e._rootValue && !e._getNodeState(i)) {
        e._removeStateWithChildren(t);
      }
    });
  };
  t._forEachState = function (e) {
    var t = this;
    Object.keys(this._nodeHash).forEach(function (n) {
      var i = t._nodeHash[n];
      if (i) {
        e(i);
      }
    });
  };
  return e;
}();
exports.GanttTreeListNodesState = i;