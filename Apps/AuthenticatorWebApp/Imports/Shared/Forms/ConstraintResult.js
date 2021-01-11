"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstraintResult = /** @class */ (function () {
    function ConstraintResult(isValid, errorMessage) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }
    ConstraintResult.passed = function () { return new ConstraintResult(true, ""); };
    ConstraintResult.failed = function (errorMessage) { return new ConstraintResult(false, errorMessage); };
    return ConstraintResult;
}());
exports.ConstraintResult = ConstraintResult;
//# sourceMappingURL=ConstraintResult.js.map