function n(e, t) {
  if (e !== undefined) {
    return e;
  } else {
    return t;
  }
}
function i(e) {
  this._params = e;
  this._clipRect = e.renderer.clipRect();
  e.root.attr({
    "clip-path": this._clipRect.id
  });
}
exports.RangeView = i;
i.prototype = {
  constructor: i,
  update: function (e, t, i, o, a, r) {
    var s = this._params.renderer;
    var l = this._params.root;
    var u = i.width - i.left;
    e = e || {};
    l.clear();
    this._clipRect.attr({
      x: i.left,
      y: i.top,
      width: u,
      height: i.height
    });
    if (!o) {
      if (n(e.visible, t.visible)) {
        if (e.color) {
          s.rect(i.left, i.top, u + 1, i.height).attr({
            fill: n(e.color, t.color),
            class: "dx-range-selector-background"
          }).append(l);
        }
        if (e.image && e.image.url) {
          s.image(i.left, i.top, u + 1, i.height, e.image.url, n(e.image.location, t.image.location)).append(l);
        }
      }
      if (r && r.isShowChart()) {
        (function (e, t, n, i) {
          var o = t.getSeries();
          if (o.length) {
            var a = o[0].getValueAxis();
            a.updateCanvas({
              top: n.top,
              bottom: 0,
              height: n.height + n.top
            });
            t.adjustSeriesDimensions();
            var r = t.getBoundRange().val;
            r.sortCategories(a.getCategoriesSorter());
            a.setBusinessRange(r);
            o.forEach(function (t) {
              t._extGroups.seriesGroup = t._extGroups.labelsGroup = e;
              t.draw(i);
            });
          }
        })(s.g().attr({
          class: "dxrs-series-group"
        }).append(l), r, i, a);
      }
    }
  }
};