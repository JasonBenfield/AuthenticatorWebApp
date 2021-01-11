"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstraintResult_1 = require("./ConstraintResult");
var NotWhitespaceConstraint = /** @class */ (function () {
    function NotWhitespaceConstraint(failureMessage) {
        this.failureMessage = failureMessage;
    }
    NotWhitespaceConstraint.prototype.test = function (value) {
        if (/^\s*$/.test(value)) {
            return ConstraintResult_1.ConstraintResult.failed(this.failureMessage);
        }
        return ConstraintResult_1.ConstraintResult.passed();
    };
    return NotWhitespaceConstraint;
}());
exports.NotWhitespaceConstraint = NotWhitespaceConstraint;
//# sourceMappingURL=NotWhitespaceConstraint.js.map