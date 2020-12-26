"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponentViewModel = void 0;
var TextInput_1 = require("../../Shared/TextInput");
var ComponentTemplate_1 = require("../../Shared/ComponentTemplate");
var CommandPillTemplate_1 = require("../../Shared/Templates/CommandPillTemplate");
var template = require("./LoginComponent.html");
var OffscreenSubmitViewModel_1 = require("../../Shared/OffscreenSubmitViewModel");
var ko = require("knockout");
var Alert_1 = require("../../Shared/Alert");
var LoginComponentViewModel = /** @class */ (function () {
    function LoginComponentViewModel() {
        this.componentName = ko.observable('login-component');
        this.alert = new Alert_1.AlertViewModel();
        this.userName = new TextInput_1.TextInputViewModel('User Name');
        this.password = new TextInput_1.TextInputViewModel('Password');
        this.loginCommand = CommandPillTemplate_1.createCommandPillViewModel();
        this.offscreenSubmit = new OffscreenSubmitViewModel_1.OffscreenSubmitViewModel();
        new ComponentTemplate_1.ComponentTemplate(this.componentName(), template).register();
    }
    return LoginComponentViewModel;
}());
exports.LoginComponentViewModel = LoginComponentViewModel;
//# sourceMappingURL=LoginComponentViewModel.js.map