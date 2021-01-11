"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentTemplate_1 = require("XtiShared/ComponentTemplate");
var ComponentTemplateAsync_1 = require("XtiShared/ComponentTemplateAsync");
var CommandOutlineButtonTemplate_1 = require("XtiShared/Templates/CommandOutlineButtonTemplate");
var template = require("./LoginComponent.html");
var OffscreenSubmitViewModel_1 = require("XtiShared/OffscreenSubmitViewModel");
var ko = require("knockout");
var Alert_1 = require("XtiShared/Alert");
var VerifyLoginFormViewModel_1 = require("../Api/VerifyLoginFormViewModel");
var LoginComponentViewModel = /** @class */ (function () {
    function LoginComponentViewModel(authApi) {
        this.componentName = ko.observable('login-component');
        this.alert = new Alert_1.AlertViewModel();
        this.verifyLoginForm = new VerifyLoginFormViewModel_1.VerifyLoginFormViewModel();
        this.loginCommand = CommandOutlineButtonTemplate_1.createCommandOutlineButtonViewModel();
        this.offscreenSubmit = new OffscreenSubmitViewModel_1.OffscreenSubmitViewModel();
        new ComponentTemplate_1.ComponentTemplate(this.componentName(), template).register();
        new ComponentTemplateAsync_1.ComponentTemplateAsync(this.verifyLoginForm.componentName(), authApi.Auth.VerifyLoginForm.getUrl({}).getUrl()).register();
    }
    return LoginComponentViewModel;
}());
exports.LoginComponentViewModel = LoginComponentViewModel;
//# sourceMappingURL=LoginComponentViewModel.js.map