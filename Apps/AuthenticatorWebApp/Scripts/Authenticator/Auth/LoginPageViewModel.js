"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPageViewModel = void 0;
var tslib_1 = require("tslib");
var template = require("./LoginPage.html");
var LoginComponentViewModel_1 = require("./LoginComponentViewModel");
var PageViewModel_1 = require("../../Shared/PageViewModel");
var tsyringe_1 = require("tsyringe");
var LoginPageViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(LoginPageViewModel, _super);
    function LoginPageViewModel() {
        var _this = _super.call(this, template) || this;
        _this.loginComponent = new LoginComponentViewModel_1.LoginComponentViewModel();
        return _this;
    }
    LoginPageViewModel = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [])
    ], LoginPageViewModel);
    return LoginPageViewModel;
}(PageViewModel_1.PageViewModel));
exports.LoginPageViewModel = LoginPageViewModel;
//# sourceMappingURL=LoginPageViewModel.js.map