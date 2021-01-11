"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ErrorModel_1 = require("../../Shared/ErrorModel");
var ConstraintResult_1 = require("./ConstraintResult");
var NotWhitespaceConstraint_1 = require("./NotWhitespaceConstraint");
var ConstraintCollection = /** @class */ (function () {
    function ConstraintCollection() {
        this.constraints = [];
        this.isNullAllowed = true;
        this.skipped = false;
    }
    ConstraintCollection.prototype.mustNotBeNull = function () {
        this.isNullAllowed = false;
    };
    ConstraintCollection.prototype.skipValidation = function () { this.skipped = true; };
    ConstraintCollection.prototype.unskipValidation = function () { this.skipped = false; };
    ConstraintCollection.prototype.add = function (constraint) {
        this.constraints.push(constraint);
    };
    ConstraintCollection.prototype.validate = function (errors, field) {
        if (!this.skipped) {
            var value = field.getValue();
            if (value === undefined || value === null) {
                if (!this.isNullAllowed) {
                    errors.add(new ErrorModel_1.ErrorModel('Must not be null', field.getCaption(), field.getName()));
                }
            }
            else {
                for (var _i = 0, _a = this.constraints; _i < _a.length; _i++) {
                    var c = _a[_i];
                    var result = c.test(value);
                    if (!result.isValid) {
                        errors.add(new ErrorModel_1.ErrorModel(result.errorMessage, field.getCaption(), field.getName()));
                        return;
                    }
                }
            }
        }
    };
    return ConstraintCollection;
}());
exports.ConstraintCollection = ConstraintCollection;
var TextConstraintCollection = /** @class */ (function (_super) {
    tslib_1.__extends(TextConstraintCollection, _super);
    function TextConstraintCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextConstraintCollection.prototype.mustNotBeWhitespace = function (failureMessage) {
        this.add(new NotWhitespaceConstraint_1.NotWhitespaceConstraint(failureMessage));
    };
    return TextConstraintCollection;
}(ConstraintCollection));
exports.TextConstraintCollection = TextConstraintCollection;
var DateConstraintCollection = /** @class */ (function (_super) {
    tslib_1.__extends(DateConstraintCollection, _super);
    function DateConstraintCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateConstraintCollection.prototype.mustBeOnOrAbove = function (lowerValue, failureMessage) {
        this.add(new LowerRangeConstraint(lowerValue, true, failureMessage));
    };
    DateConstraintCollection.prototype.mustBeAbove = function (lowerValue, failureMessage) {
        this.add(new LowerRangeConstraint(lowerValue, false, failureMessage));
    };
    DateConstraintCollection.prototype.mustBeOnOrBelow = function (upperValue, failureMessage) {
        this.add(new UpperRangeConstraint(upperValue, true, failureMessage));
    };
    DateConstraintCollection.prototype.mustBeBelow = function (upperValue, failureMessage) {
        this.add(new UpperRangeConstraint(upperValue, false, failureMessage));
    };
    return DateConstraintCollection;
}(ConstraintCollection));
exports.DateConstraintCollection = DateConstraintCollection;
var NumberConstraintCollection = /** @class */ (function (_super) {
    tslib_1.__extends(NumberConstraintCollection, _super);
    function NumberConstraintCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberConstraintCollection.prototype.mustBeOnOrAbove = function (lowerValue, failureMessage) {
        this.add(new LowerRangeConstraint(lowerValue, true, failureMessage));
    };
    NumberConstraintCollection.prototype.mustBeAbove = function (lowerValue, failureMessage) {
        this.add(new LowerRangeConstraint(lowerValue, false, failureMessage));
    };
    NumberConstraintCollection.prototype.mustBeOnOrBelow = function (upperValue, failureMessage) {
        this.add(new UpperRangeConstraint(upperValue, true, failureMessage));
    };
    NumberConstraintCollection.prototype.mustBeBelow = function (upperValue, failureMessage) {
        this.add(new UpperRangeConstraint(upperValue, false, failureMessage));
    };
    return NumberConstraintCollection;
}(ConstraintCollection));
exports.NumberConstraintCollection = NumberConstraintCollection;
var LowerRangeConstraint = /** @class */ (function () {
    function LowerRangeConstraint(boundValue, isIncluded, failureMessage) {
        this.boundValue = boundValue;
        this.isIncluded = isIncluded;
        this.failureMessage = failureMessage;
    }
    LowerRangeConstraint.prototype.test = function (value) {
        return this.isInRange(value)
            ? ConstraintResult_1.ConstraintResult.passed()
            : ConstraintResult_1.ConstraintResult.failed(this.failureMessage);
    };
    LowerRangeConstraint.prototype.isInRange = function (value) {
        if (this.boundValue === undefined || this.boundValue === null) {
            return true;
        }
        if (value > this.boundValue) {
            return true;
        }
        if (this.boundValue === value) {
            return this.isIncluded;
        }
        return false;
    };
    return LowerRangeConstraint;
}());
exports.LowerRangeConstraint = LowerRangeConstraint;
var UpperRangeConstraint = /** @class */ (function () {
    function UpperRangeConstraint(boundValue, isIncluded, failureMessage) {
        this.boundValue = boundValue;
        this.isIncluded = isIncluded;
        this.failureMessage = failureMessage;
    }
    UpperRangeConstraint.prototype.test = function (value) {
        return this.isInRange(value)
            ? ConstraintResult_1.ConstraintResult.passed()
            : ConstraintResult_1.ConstraintResult.failed(this.failureMessage);
    };
    UpperRangeConstraint.prototype.isInRange = function (value) {
        if (this.boundValue === undefined || this.boundValue === null) {
            return true;
        }
        if (value < this.boundValue) {
            return true;
        }
        if (this.boundValue === value) {
            return this.isIncluded;
        }
        return false;
    };
    return UpperRangeConstraint;
}());
exports.UpperRangeConstraint = UpperRangeConstraint;
//# sourceMappingURL=ConstraintCollection.js.map