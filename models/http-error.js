var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
// exports.__esModule = true;
var HttpError = /** @class */ (function (_super) {
  __extends(HttpError, _super);
  function HttpError(message, code) {
    var _this = _super.call(this, message) || this;
    _this.code = code; // add a "code" property
    return _this;
  }
  return HttpError;
})(Error);
// exports["default"] = HttpError;
export default HttpError;
