"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TypedFieldViewValue_1 = require("./TypedFieldViewValue");
var TextToNumberViewValue = /** @class */ (function (_super) {
    tslib_1.__extends(TextToNumberViewValue, _super);
    function TextToNumberViewValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextToNumberViewValue.prototype._fromView = function (value) {
        return value ? Number(value) : null;
    };
    TextToNumberViewValue.prototype._toView = function (value) {
        return value ? value.toString() : '';
    };
    return TextToNumberViewValue;
}(TypedFieldViewValue_1.TypedFieldViewValue));
exports.TextToNumberViewValue = TextToNumberViewValue;
//# sourceMappingURL=TextToNumberViewValue.js.map