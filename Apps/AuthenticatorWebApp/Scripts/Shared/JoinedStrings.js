"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinedStrings = void 0;
var Enumerable_1 = require("./Enumerable");
var JoinedStrings = /** @class */ (function () {
    function JoinedStrings(separator, arr, format) {
        this.separator = separator;
        this.arr = new Enumerable_1.EnumerableArray(arr);
        this.format = format || function (value) {
            return value ? value.toString() : '';
        };
    }
    JoinedStrings.prototype.value = function () {
        if (this.joined === undefined) {
            var result = '';
            for (var _i = 0, _a = this.arr.value(); _i < _a.length; _i++) {
                var value = _a[_i];
                if (result !== '') {
                    result += this.separator;
                }
                result += this.format(value);
            }
            this.joined = result;
        }
        return this.joined;
    };
    JoinedStrings.prototype.toString = function () {
        return this.value();
    };
    return JoinedStrings;
}());
exports.JoinedStrings = JoinedStrings;
//# sourceMappingURL=JoinedStrings.js.map