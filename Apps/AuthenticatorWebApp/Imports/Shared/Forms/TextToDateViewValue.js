"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FormattedDate_1 = require("../FormattedDate");
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
        return value ? new FormattedDate_1.FormattedDate(value, 'yyyy-MM-dd') : '';
    };
    return TextToDateViewValue;
}(TypedFieldViewValue_1.TypedFieldViewValue));
exports.TextToDateViewValue = TextToDateViewValue;
//# sourceMappingURL=TextToDateViewValue.js.map