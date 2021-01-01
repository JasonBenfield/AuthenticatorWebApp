"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NamedValue = /** @class */ (function () {
    function NamedValue(name, value) {
        this.name = name;
        this.value = value;
    }
    NamedValue.prototype.toString = function () {
        var str = this.name;
        if (this.value) {
            str += '=' + this.value;
        }
        return str;
    };
    return NamedValue;
}());
exports.NamedValue = NamedValue;
//# sourceMappingURL=NamedValue.js.map