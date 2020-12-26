"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericValue = void 0;
var NumericValue = /** @class */ (function () {
    function NumericValue(Value, DisplayText) {
        this.Value = Value;
        this.DisplayText = DisplayText;
    }
    NumericValue.prototype.equalsAny = function (other) {
        for (var _i = 0, other_1 = other; _i < other_1.length; _i++) {
            var item = other_1[_i];
            if (this.equals(item)) {
                return true;
            }
        }
        return false;
    };
    NumericValue.prototype.equals = function (other) {
        if (other === undefined || other === null) {
            return false;
        }
        if (typeof other === "number") {
            return this.Value === other;
        }
        else if (typeof other === "string") {
            return this.normalizeDisplayText(this.DisplayText) === this.normalizeDisplayText(other);
        }
        return this.Value === other.Value;
    };
    NumericValue.prototype.normalizeDisplayText = function (displayText) {
        return displayText.replace(/\s+/g, '').toLowerCase();
    };
    NumericValue.prototype.toString = function () {
        return this.constructor.name + " " + this.Value + " " + this.DisplayText;
    };
    return NumericValue;
}());
exports.NumericValue = NumericValue;
//# sourceMappingURL=NumericValue.js.map