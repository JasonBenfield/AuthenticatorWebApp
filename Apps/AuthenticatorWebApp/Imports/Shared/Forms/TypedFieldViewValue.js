"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FieldViewValue_1 = require("./FieldViewValue");
var TypedFieldViewValue = /** @class */ (function (_super) {
    tslib_1.__extends(TypedFieldViewValue, _super);
    function TypedFieldViewValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypedFieldViewValue.prototype.getValue = function () {
        return _super.prototype.getValue.call(this);
    };
    TypedFieldViewValue.prototype.setValue = function (value) {
        _super.prototype.setValue.call(this, value);
    };
    TypedFieldViewValue.prototype.setValueFromView = function (value) {
        _super.prototype.setValueFromView.call(this, value);
    };
    return TypedFieldViewValue;
}(FieldViewValue_1.FieldViewValue));
exports.TypedFieldViewValue = TypedFieldViewValue;
//# sourceMappingURL=TypedFieldViewValue.js.map