"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TypedFieldViewValue_1 = require("./TypedFieldViewValue");
var TextToDateViewValue = /** @class */ (function (_super) {
    tslib_1.__extends(TextToDateViewValue, _super);
    function TextToDateViewValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextToDateViewValue.prototype._fromView = function (value) {
        return value ? new Date(value) : null;
    };
    TextToDateViewValue.prototype._toView = function (value) {
        return value ? value.toISOString().substring(0, 10) : '';
    };
    return TextToDateViewValue;
}(TypedFieldViewValue_1.TypedFieldViewValue));
exports.TextToDateViewValue = TextToDateViewValue;
//# sourceMappingURL=TextToDateViewValue.js.map