"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated code
var ko = require("knockout");
var InputFieldViewModel_1 = require("XtiShared/Forms/InputFieldViewModel");
var VerifyLoginFormViewModel = /** @class */ (function () {
    function VerifyLoginFormViewModel() {
        this.componentName = ko.observable('VerifyLoginForm');
        this.UserName = new InputFieldViewModel_1.InputFieldViewModel();
        this.Password = new InputFieldViewModel_1.InputFieldViewModel();
    }
    return VerifyLoginFormViewModel;
}());
exports.VerifyLoginFormViewModel = VerifyLoginFormViewModel;
//# sourceMappingURL=VerifyLoginFormViewModel.js.map