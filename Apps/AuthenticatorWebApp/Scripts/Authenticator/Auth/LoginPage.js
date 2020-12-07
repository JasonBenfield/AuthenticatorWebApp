"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/// <reference path="../api/authenticatorentities.d.ts" />
require("reflect-metadata");
var LoginPageViewModel_1 = require("./LoginPageViewModel");
var LoginComponent_1 = require("./LoginComponent");
var xtistart_1 = require("xtistart");
var tsyringe_1 = require("tsyringe");
var LoginPage = /** @class */ (function () {
    function LoginPage(vm) {
        this.vm = vm;
        this.loginComponent = new LoginComponent_1.LoginComponent(this.vm.loginComponent);
        this.activateLoginComponent();
    }
    LoginPage.prototype.activateLoginComponent = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loginComponent.activate()];
                    case 1:
                        result = _a.sent();
                        if (result instanceof LoginComponent_1.LoginResult) {
                            alert("Login Component Result: " + result.token);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [LoginPageViewModel_1.LoginPageViewModel])
    ], LoginPage);
    return LoginPage;
}());
xtistart_1.startup(LoginPageViewModel_1.LoginPageViewModel, LoginPage);
//# sourceMappingURL=LoginPage.js.map