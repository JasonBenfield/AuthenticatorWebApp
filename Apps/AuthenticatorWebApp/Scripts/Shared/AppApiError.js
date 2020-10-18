"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppApiError = void 0;
var ErrorModel_1 = require("./ErrorModel");
var JoinedStrings_1 = require("./JoinedStrings");
var Enumerable_1 = require("./Enumerable");
var AppApiError = /** @class */ (function () {
    function AppApiError(errors, _status, _location, _caption) {
        this._status = _status;
        this._location = _location;
        this._caption = _caption;
        this._errors = new Enumerable_1.MappedArray(errors, function (e) { return new ErrorModel_1.ErrorModel(e.Message, e.Source); }).value();
    }
    AppApiError.prototype.getErrors = function () {
        return this._errors;
    };
    AppApiError.prototype.isValidationError = function () {
        return this._status === 400;
    };
    AppApiError.prototype.isAuthenticationError = function () {
        return this._status === 401;
    };
    AppApiError.prototype.isCanceled = function () {
        return this._status === 999;
    };
    AppApiError.prototype.getCaption = function () {
        return this._caption || "Unable to " + this._location;
    };
    AppApiError.prototype.toString = function () {
        var caption = this.getCaption();
        var joined = new JoinedStrings_1.JoinedStrings('\n', this.getErrors()).toString();
        return caption + "\nstatus: " + this._status + "\n" + joined;
    };
    return AppApiError;
}());
exports.AppApiError = AppApiError;
//# sourceMappingURL=AppApiError.js.map