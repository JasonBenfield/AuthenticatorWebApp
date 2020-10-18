"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattedNumber = void 0;
var numeral = require("numeral");
var FormattedNumber = /** @class */ (function () {
    function FormattedNumber(value, format) {
        this.formatted = numeral(value).format(format);
    }
    FormattedNumber.prototype.toString = function () {
        return this.formatted;
    };
    return FormattedNumber;
}());
exports.FormattedNumber = FormattedNumber;
//# sourceMappingURL=FormattedNumber.js.map