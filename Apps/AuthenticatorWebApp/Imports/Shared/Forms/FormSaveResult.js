"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormSaveResult = /** @class */ (function () {
    function FormSaveResult(value, errors) {
        this.value = value;
        this.errors = errors;
    }
    FormSaveResult.prototype.succeeded = function () {
        return this.errors.length === 0;
    };
    return FormSaveResult;
}());
exports.FormSaveResult = FormSaveResult;
//# sourceMappingURL=FormSaveResult.js.map