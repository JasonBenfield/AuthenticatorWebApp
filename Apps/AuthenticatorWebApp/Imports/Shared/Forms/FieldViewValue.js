"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldViewValue = /** @class */ (function () {
    function FieldViewValue() {
    }
    FieldViewValue.prototype.getValue = function () {
        return this.value;
    };
    FieldViewValue.prototype.setValue = function (value) {
        this.value = value;
    };
    FieldViewValue.prototype.setValueFromView = function (value) {
        this.value = this._fromView(value);
    };
    FieldViewValue.prototype._fromView = function (value) {
        return value;
    };
    FieldViewValue.prototype.toView = function () {
        return this._toView(this.value);
    };
    FieldViewValue.prototype._toView = function (value) { return value; };
    return FieldViewValue;
}());
exports.FieldViewValue = FieldViewValue;
//# sourceMappingURL=FieldViewValue.js.map