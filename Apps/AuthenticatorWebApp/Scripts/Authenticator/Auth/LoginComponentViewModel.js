"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponentViewModel = void 0;
var tslib_1 = require("tslib");
var AwaitableComponent_1 = require("../../Shared/AwaitableComponent");
var TextInput_1 = require("../../Shared/TextInput");
var ComponentTemplate_1 = require("../../Shared/ComponentTemplate");
var CommandPillTemplate_1 = require("../../Shared/Templates/CommandPillTemplate");
var template = require("./LoginComponent.html");
var OffscreenSubmitViewModel_1 = require("../../Shared/OffscreenSubmitViewModel");
var LoginComponentViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(LoginComponentViewModel, _super);
    function LoginComponentViewModel() {
        var _this = _super.call(this) || this;
        _this.userName = new TextInput_1.TextInputViewModel('User Name');
        _this.password = new TextInput_1.TextInputViewModel('Password');
        _this.loginCommand = CommandPillTemplate_1.createCommandPillViewModel();
        _this.offscreenSubmit = new OffscreenSubmitViewModel_1.OffscreenSubmitViewModel();
        _this.template('login-component');
        new ComponentTemplate_1.ComponentTemplate(_this.template(), template).register();
        return _this;
    }
    return LoginComponentViewModel;
}(AwaitableComponent_1.BaseComponentViewModel));
exports.LoginComponentViewModel = LoginComponentViewModel;
//# sourceMappingURL=LoginComponentViewModel.js.map