"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var FormattedDate = /** @class */ (function () {
    function FormattedDate(value, format) {
        this.formatted = moment(value).format(format);
    }
    FormattedDate.prototype.toString = function () {
        return this.formatted;
    };
    return FormattedDate;
}());
exports.FormattedDate = FormattedDate;
//# sourceMappingURL=FormattedDate.js.map