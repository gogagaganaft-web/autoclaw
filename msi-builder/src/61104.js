var i;
var o = (i = require("./49983.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./3603.js");
require("./4815.js");
var r = o.default.prototype;
r._eventsMap.onDrill = {
  name: "drill"
};
(0, a.expand)(r, "_extendProxyType", function (e) {
  var t = this;
  e.drillDown = function () {
    t._drillToNode(this._id);
  };
});
(0, a.expand)(r, "_onNodesCreated", function () {
  this._drilldownIndex = -1;
});
r._drillToNode = function (e) {
  var t;
  if (this._drilldownIndex !== e && (t = this._nodes[e] || this._root).nodes) {
    this._drilldownIndex = e;
    this._topNode = t;
    this._context.suspend();
    this._context.change(["MAX_DEPTH", "NODES_RESET"]);
    this._context.resume();
    this._eventTrigger("drill", {
      node: t.proxy
    });
  }
};
r.resetDrillDown = function () {
  this._drillToNode(-1);
  return this;
};
r.drillUp = function () {
  this._drillToNode(this._topNode.parent._id || -1);
  return this;
};
r.getCurrentNode = function () {
  return this._topNode.proxy;
};