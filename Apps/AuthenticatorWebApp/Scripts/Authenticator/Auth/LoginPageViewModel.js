"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var template = require("./LoginPage.html");
var LoginComponentViewModel_1 = require("./LoginComponentViewModel");
var PageViewModel_1 = require("XtiShared/PageViewModel");
var tsyringe_1 = require("tsyringe");
var AuthenticatorAppApi_1 = require("../Api/AuthenticatorAppApi");
var LoginPageViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(LoginPageViewModel, _super);
    function LoginPageViewModel(authenticatorApi) {
        var _this = _super.call(this, template) || this;
        _this.authenticatorApi = authenticatorApi;
        _this.loginComponent = new LoginComponentViewModel_1.LoginComponentViewModel(_this.authenticatorApi);
        return _this;
    }
    LoginPageViewModel = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [AuthenticatorAppApi_1.AuthenticatorAppApi])
    ], LoginPageViewModel);
    return LoginPageViewModel;
}(PageViewModel_1.PageViewModel));
exports.LoginPageViewModel = LoginPageViewModel;
//# sourceMappingURL=LoginPageViewModel.js.map