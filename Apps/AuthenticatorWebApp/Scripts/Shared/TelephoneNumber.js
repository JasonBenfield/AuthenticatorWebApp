"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelephoneNumber = void 0;
var FormattedNumber_1 = require("./FormattedNumber");
var TelephoneNumber = /** @class */ (function () {
    function TelephoneNumber(areaCode, prefix, lineNumber) {
        this.areaCode = areaCode;
        this.prefix = prefix;
        this.lineNumber = lineNumber;
    }
    TelephoneNumber.prototype.toString = function () {
        var formattedAreaCode = new FormattedNumber_1.FormattedNumber(this.areaCode, '000');
        var formattedPrefix = new FormattedNumber_1.FormattedNumber(this.prefix, '000');
        var formattedLineNumber = new FormattedNumber_1.FormattedNumber(this.lineNumber, '0000');
        return "(" + formattedAreaCode + ") " + formattedPrefix + "-" + formattedLineNumber;
    };
    return TelephoneNumber;
}());
exports.TelephoneNumber = TelephoneNumber;
//# sourceMappingURL=TelephoneNumber.js.map