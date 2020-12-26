"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericValues = void 0;
var Enumerable_1 = require("./Enumerable");
var NumericValues = /** @class */ (function () {
    function NumericValues(all) {
        this.all = all;
    }
    NumericValues.prototype.value = function (testValue) {
        return new Enumerable_1.First(new Enumerable_1.FilteredArray(this.all, function (nv) { return nv.equals(testValue); })).value() || this.all[0];
    };
    return NumericValues;
}());
exports.NumericValues = NumericValues;
//# sourceMappingURL=NumericValues.js.map