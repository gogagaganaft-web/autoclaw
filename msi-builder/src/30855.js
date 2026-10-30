exports.getData = function (e, t) {
  return a.imageCreator.getImageData(e, (0, s.extend)({}, t, {
    format: "JPEG"
  })).then(function (e) {
    var n;
    var o;
    var s = function (e, t, n) {
      var o = (t.margin || 0) * 2;
      var r = (0, a.calcScaledInfo)(t.width, t.height);
      var s = r.width;
      var l = r.height;
      l += o;
      var d = ((s += o) * 0.75).toFixed(2);
      var c = (l * 0.75).toFixed(2);
      var h = Math.floor(s);
      var f = Math.floor(l);
      var p = "%PDF-1.3\r\n2 0 obj\r\n<</ProcSet[/PDF/ImageB/ImageC/ImageI]/XObject<</I0 5 0 R>>>>\r\nendobj\r\n4 0 obj\r\n<</Type/Pages/Kids[1 0 R]/Count 1>>\r\nendobj\r\n7 0 obj\r\n<</OpenAction[1 0 R /FitH null]/Type/Catalog/Pages 4 0 R/PageLayout/OneColumn>>\r\nendobj\r\n1 0 obj\r\n<</Type/Page/Resources 2 0 R/MediaBox[0 0 _width_ _height_]/Contents 3 0 R/Parent 4 0 R>>\r\nendobj\r\n".replace("_width_", d).replace("_height_", c);
      var g = "3 0 obj\r\n<</Length 52>>stream\r\n0.20 w\n0 G\nq _width_ 0 0 _height_ 0.00 0.00 cm /I0 Do Q\r\nendstream\r\nendobj\r\n".replace("_width_", d).replace("_height_", c);
      var m = "6 0 obj\r\n<</CreationDate _date_/Producer(_version_)>>\r\nendobj\r\n".replace("_date_", n).replace("_version_", i.version);
      var _ = "5 0 obj\r\n<</Type/XObject/Subtype/Image/Width _width_/Height _height_/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length _length_>>stream\r\n".replace("_width_", h).replace("_height_", f).replace("_length_", e.length) + e + "\r\nendstream\r\nendobj\r\n";
      x = p.length;
      w = g.length;
      C = m.length;
      var v = "xref\r\n0 8\r\n0000000000 65535 f\r\n0000000241 00000 n\r\n0000000010 00000 n\r\n_main_ 00000 n\r\n0000000089 00000 n\r\n_image_ 00000 n\r\n_info_ 00000 n\r\n0000000143 00000 n\r\n".replace("_main_", u(x + "", 10)).replace("_info_", u(x + w + "", 10)).replace("_image_", u(x + w + C + "", 10));
      var y = p + g + m + _;
      var b = "trailer\r\n<<\r\n/Size 8\r\n/Root 7 0 R\r\n/Info 6 0 R\r\n>>\r\nstartxref\r\n_length_\r\n%%EOF".replace("_length_", y.length);
      var x;
      var w;
      var C;
      return y + v + b;
    }(e, t, (n = new Date(), o = [n.getUTCFullYear(), d(n.getUTCMonth()), d(n.getUTCDate()), d(n.getUTCHours()), d(n.getUTCMinutes()), d(n.getUTCSeconds())], `(D:${o.join("")}Z00'00')`));
    if ((0, r.isFunction)(l.Blob)) {
      return function (e) {
        for (var t = 0, n = new Uint8Array(e.length); t < e.length; t++) {
          n[t] = e.charCodeAt(t);
        }
        return new l.Blob([n.buffer], {
          type: "application/pdf"
        });
      }(s);
    } else {
      return function (e) {
        return l.btoa(e);
      }(s);
    }
  });
};
var i = require("./36739.js");
var o = require("./58201.js");
var a = require("./12173.js");
var r = require("./35922.js");
var s = require("./13306.js");
var l = (0, o.getWindow)();
var u = function e(t, n) {
  if (t.length < n) {
    return e("0" + t, n);
  } else {
    return t;
  }
};
function d(e) {
  if (e.toString().length === 1) {
    return `0${e}`;
  } else {
    return e;
  }
}