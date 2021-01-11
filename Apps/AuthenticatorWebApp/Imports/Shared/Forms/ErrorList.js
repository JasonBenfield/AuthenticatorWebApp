"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorList = /** @class */ (function () {
    function ErrorList() {
        this.errors = [];
    }
    ErrorList.prototype.add = function (error) {
        this.errors.push(error);
    };
    ErrorList.prototype.merge = function (errors) {
        var _a;
        (_a = this.errors).push.apply(_a, errors.values());
    };
    ErrorList.prototype.hasErrors = function () { return this.errors.length > 0; };
    ErrorList.prototype.values = function () { return this.errors; };
    return ErrorList;
}());
exports.ErrorList = ErrorList;
//# sourceMappingURL=ErrorList.js.map